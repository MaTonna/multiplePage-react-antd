/*
 * @Description: 登录页
 * @Author: xiaoya
 * @Date: 2019-08-02 16:58:15
 * @Last Modified by: xiaoya
 * @Last Modified time: 2019-10-17 10:59:24
 */
import React, { Fragment, FormEvent, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { Input, Button, Icon, Form, Checkbox, message, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import api from '@api/index';
import '@styles/login.less';
const FormItem = Form.Item;

interface FormProps extends FormComponentProps { }
const initialState = {
  loginType: 'qrCode',
  qrcodeIsExpire: false,
  qrCodeImg: api.getResourseOrigin('img/login-bg.png'),
  isRemenberAcc: !!localStorage.getItem('cell'),
  numCodeSrc: '',
  validitySeconds: 60 * 1000,
  identifyCode: '',
  userInfos: {
    userId: '',
    userName: '',
    userLogoUrl: ''
  },
  isLogin: false,
  isScanning: false,//正在扫码
  appLoginExpire: false,//移动端登录超时
};
type State = Readonly<typeof initialState>;

class LoginPage extends React.Component<FormProps, State> {
  readonly state: State = initialState;
  deltaTime = 0;

  componentDidMount = () => {
    if (this.state.loginType === 'qrCode') {
      this.getQrcodeImg();
    } else {
      this.getNumCodeImg();
    }
  };

  getNumCodeImg(): void {
    this.setState({
      numCodeSrc: api.getOrigin(
        'loginCheckCode.resource?_' + new Date().getTime()
      )
    });
  }

  getQrcodeImg(): void {
    // 从账号登录点击切换的时候如果在倒计时就不用刷新二维码了
    if (this.timer) {
      return;
    }
    // 置空一些状态
    this.setState({
      isLogin: false,
      qrcodeIsExpire: false,
      isScanning: false,
      appLoginExpire: false
    })
    api
      .post('loginQrcode')
      .then((data: any) => {
        const { qrCode, identifyCode } = data;
        if (qrCode) {
          const { validitySeconds, qrCodeContent, extension } = qrCode;
          this.setState(
            {
              qrcodeIsExpire: false,
              qrCodeImg: `data:image/${extension};base64,${qrCodeContent}`,
              validitySeconds,
              identifyCode
            },
            () => {
              // 两秒轮询，接口配置可能是单数，要凑一下双数
              this.deltaTime =
                (validitySeconds % 2 === 0
                  ? validitySeconds
                  : (validitySeconds + 1)) + 4;
              this.countDownExpire();
            }
          );
        }
      })
      .catch((err: {}) => {
        this.showErrorMsg(err);
      });
  }

  countDownExpire(): void {
    setTimeout(this.loopCountDown.bind(this), 0);
  }

  timer = null;
  loopCountDown(): void {
    this.timer = setTimeout(this.loopCountDown.bind(this), 2000);
    this.countDown();
  }

  countDown(): void {
    this.deltaTime -= 2;
    if (this.deltaTime === 0) {
      this.clear(true);
    }
    if (this.timer && this.deltaTime !== 0) {
      const { identifyCode } = this.state;
      api
        .post('loopLoginStatus', {
          identifyCode
        })
        .then((data: any) => {
          const { status } = data;
          if (status.name) {
            switch (status.name) {
              // 点击返回扫码登陆，轮询会回到初始状态
              case 'INIT':
                this.setState({
                  isScanning: false,
                  qrcodeIsExpire: false,
                  appLoginExpire: false
                })
                break;
              case 'SCANED':
                // 已扫码，APP处于扫码等待授权状态
                const {
                  user: { userId, userName, userLogoUrl }
                } = data;
                this.setState({
                  isScanning: true,
                  userInfos: {
                    userId,
                    userName,
                    userLogoUrl
                  }
                });
                break;
              case 'AUTHORIZED':
                const userData = data.user;
                // 已授权状态，直接登录，停止轮询
                this.qrLoginSubmit(userData.userId);
                this.clear();
                break;
              case 'EXPIRED':
                // 二维码已失效
                this.setState({
                  qrcodeIsExpire: true
                })
                break;
              default:
                break;
            }
          }
        })
        .catch((err: {}) => {
          // 移动端登陆超时，二维码过期，通过接口错误获取到
          const errorCode = T.getErrorCode(err);
          if (errorCode === 'USER_AUTH_LOGIN_TIME_OUT') {
            this.setState({
              appLoginExpire: true
            })
            this.clear();
          } else if (errorCode === 'USER_AUTH_LOGIN_BY_QR_CODE_EXPIRED') {
            this.clear(true);
          } else {
            this.clear();
          }

        });
    }
  }

  clear(refresh?: boolean): void {
    clearTimeout(this.timer);
    this.timer = null;
    if (refresh) {
      this.setState({
        appLoginExpire: false,
        isScanning: false,
        qrcodeIsExpire: true
      });
    }
  }

  refreshQrCode(): void {
    this.getQrcodeImg();
  }

  qrLoginSubmit(userId: string): void {
    const { identifyCode } = this.state;
    api
      .post('userQrLogin', { identifyCode, userId })
      .then(() => {
        this.succGotoUrl();
      })
      .catch((err: {}) => {
        this.showErrorMsg(err);
      });
  }

  remenberUsername(e?: CheckboxChangeEvent): void {
    this.setState({
      isRemenberAcc: e.target.checked
    });
  }

  changeLoginType(): void {
    const isQrCode = this.state.loginType === 'qrCode';
    this.setState({
      loginType: isQrCode ? 'account' : 'qrCode'
    });
    if (!isQrCode) {
      this.refreshQrCode();
    } else {
      this.getNumCodeImg();
    }
  }

  accLoginSubmit = (event?: FormEvent<HTMLFormElement>): void => {
    event && event.preventDefault();
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({
        isLogin: true
      });
      api
        .post('userLogin', values)
        .then(() => {
          if (this.state.isRemenberAcc) {
            localStorage.setItem('cell', values.cell);
          } else {
            localStorage.removeItem('cell');
          }
          this.setState({
            isLogin: false
          });
          this.succGotoUrl();
        })
        .catch((err: {}) => {
          this.showErrorMsg(err);
          this.getNumCodeImg();
          this.setState({
            isLogin: false
          });
        });
    });
  };

  succGotoUrl(): void {
    setTimeout(() => {
      window.location.href = api.getOrigin('index/workNumHome');
    }, 100);
  }

  showErrorMsg(err: {}): void {
    message.error(T.getError(err));
  }

  render(): ReactNode {
    const { getFieldDecorator } = this.props.form;
    const {
      loginType,
      isLogin,
      qrcodeIsExpire,
      qrCodeImg,
      numCodeSrc,
      isRemenberAcc,
      isScanning,
      appLoginExpire,
      userInfos: { userName, userLogoUrl }
    } = this.state;
    const isQrCode = loginType === 'qrCode';
    return (
      <Fragment>
        <div className="logo-wrap">
          <i className="logo" />
          明聊工作平台
        </div>
        <div className="login-wrap">
          <div className="login-bg-wrap">
            <h2 className="login-title">明聊工作平台</h2>
            <img
              className="login-bg"
              src={api.getResourseOrigin('img/login-bg.png')}
            />
          </div>
          <div className="login-content">
            <i
              className={
                isQrCode
                  ? 'login-icon change-acc-icon'
                  : 'login-icon change-qr-icon'
              }
              onClick={() => this.changeLoginType()}
            />
            {isQrCode ? (
              <div className="login-form qr-form">
                {(isScanning || appLoginExpire) ? (
                  <div className="login-user-info">
                    <img
                      className="user-logo"
                      src={userLogoUrl}
                      alt={userName}
                    />
                    <p className="user-name">{userName}</p>
                    <p className="login-memo">{appLoginExpire ? "登录超时" : '请在手机上确认登录'}</p>
                    <p className="login-status">{appLoginExpire ? <a onClick={this.getQrcodeImg.bind(this)}>请重新登录</a> : '正在登陆...'}</p>
                    <div
                      className="goback-qrcode"
                      onClick={() => {
                        this.clear();
                        this.getQrcodeImg();
                      }}
                    >
                      返回扫码登录 <i className="goback-qrcode-icon" />
                    </div>
                  </div>
                ) : (
                    <Fragment>
                      <p className="qrcode-title">扫码登陆</p>
                      <div className="qrcode-img">
                        {qrcodeIsExpire && (
                          <div className="qrcode-expire-wrap">
                            <p className="expire-memo">二维码已失效</p>
                            <Button
                              className="expire-fresh-btn"
                              type="primary"
                              onClick={() => this.refreshQrCode()}
                            >
                              点击刷新
                          </Button>
                          </div>
                        )}
                        <img src={qrCodeImg} alt="二维码" />
                      </div>
                      <p>安装并打开app端扫一扫</p>
                    </Fragment>
                  )}
              </div>
            ) : (
                <Fragment>
                  <div className="form-logo">
                    <i className="logo" />
                  </div>
                  <Form className="login-form" onSubmit={this.accLoginSubmit}>
                    <FormItem>
                      {getFieldDecorator('cell', {
                        initialValue: localStorage.getItem('cell'),
                        rules: [
                          {
                            required: true,
                            message: '请输入账号'
                          },
                          {
                            pattern: T.regex.cell,
                            message: '账号输入错误'
                          }
                        ]
                      })(
                        <Input
                          prefix={<Icon className="prefix-icon" type="user" />}
                          placeholder="手机号"
                          maxLength={11}
                        />
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('loginPassword', {
                        rules: [
                          {
                            required: true,
                            message: '请输入密码'
                          },
                          {
                            pattern: T.regex.notSymbol,
                            message: '密码输入错误'
                          }
                        ]
                      })(
                        <Input
                          prefix={<Icon className="prefix-icon" type="lock" />}
                          type="password"
                          placeholder="密码"
                        />
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('checkCode', {
                        rules: [
                          {
                            required: true,
                            message: '请输入数字验证码'
                          },
                          {
                            len: 4,
                            message: '验证码格式错误'
                          }
                        ]
                      })(
                        <div className="login-validate">
                          <Input
                            placeholder="验证码"
                            maxLength={4}
                            minLength={4}
                          />
                          <img
                            className="login-validate-img"
                            alt="验证码"
                            src={numCodeSrc}
                            onClick={() => this.getNumCodeImg()}
                          />
                          <a
                            className="login-validate-refresh"
                            onClick={() => this.getNumCodeImg()}
                          >
                            看不清？换一换
                        </a>
                        </div>
                      )}
                    </FormItem>
                    <FormItem>
                      <Button
                        block
                        disabled={isLogin}
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                      >
                        登录
                    </Button>
                    </FormItem>
                  </Form>
                  <div className="remenber-block">
                    <Checkbox
                      onChange={(e) => this.remenberUsername(e)}
                      checked={isRemenberAcc}
                    >
                      记住用户名
                  </Checkbox>
                  </div>
                </Fragment>
              )}
          </div>
        </div>
      </Fragment>
    );
  }
}

const LoginPageForm = Form.create()(LoginPage);

ReactDOM.render(<LoginPageForm />, document.getElementById('root'));

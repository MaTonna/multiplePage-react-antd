/*
 * @Description: 客户关联申请-审核弹窗
 * @Author: xiaoya
 * @Date: 2019-10-15 17:07:48
 * @Last Modified by: xiaoya
 * @Last Modified time: 2019-10-16 12:01:01
 */
import React, { ReactNode, Component } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import ImgsPreviewModal from '@components/ImgsPreviewModal';
const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;

const initialState = {
  confirmLoading: false,
  sliderPicSrcs: [],
  isShowSilderModal: false
};

type Props = {
  visible: boolean
  closeModal: Function
} & FormComponentProps;

type State = Readonly<typeof initialState>;
const testPicSrc = "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";
const testPicSrc2 = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";

class CustInvolvedAuditModalForm extends Component<Props, State> {

  readonly state: State = initialState;

  infoList = [];

  componentDidMount() {
    this.infoList = [
      {
        title: '客户信息',
        infos: [
          {
            label: '用户名',
            value: '吉米'
          }, {
            label: '归属销售',
            value: 'admin'
          }, {
            label: '客户类型',
            value: '客户池2'
          }
        ]
      },
      {
        title: '申请信息',
        infos: [
          {
            label: '申请销售',
            value: '希达'
          }, {
            label: '申请时间',
            value: '2019-10-15 17:53:20'
          }, {
            label: '审核状态',
            value: '未审核'
          }, {
            label: '关联原因',
            value: '不想关联'
          }, {
            label: '变更前销售',
            value: 'admin'
          }, {
            label: '变更后销售',
            value: '希达'
          }, {
            label: '审核备注',
            value: '他有钱'
          }, {
            label: '截图1',
            value: <img className="apply-pic" src={testPicSrc} onClick={() => this.showSilderPics('applyInfo')} />
          }, {
            label: '截图2',
            value: <img className="apply-pic" src={testPicSrc} onClick={() => this.showSilderPics('applyInfo')} />
          }
        ]
      }
    ]
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.props.form.resetFields();
    }
  }

  handleOk = (): void => {
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ confirmLoading: true });
      console.log('提交参数', values);
      setTimeout(() => {
        this.setState({
          confirmLoading: false,
        });
      }, 2000);
    });
  };

  handleCancel = (): void => {
    this.props.closeModal();
  };

  showSilderPics = (type) => {
    this.setState({
      isShowSilderModal: true,
      sliderPicSrcs: [testPicSrc, testPicSrc2]
    })
  }

  render(): ReactNode {
    const { infoList } = this;
    const { confirmLoading, sliderPicSrcs, isShowSilderModal } = this.state;
    const { visible } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { formItemLayout } = CONFIG;
    return (
      <Modal
        title="审核"
        visible={visible}
        onOk={this.handleOk}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel}
        okText="提交"
        width={1000}
      >
        <div className="split-wrap" style={{ height: '400px' }}>
          {
            infoList.map(item => {
              return <div className="split-block info-block" key={item.title}>
                <h3>{item.title}</h3>
                {
                  item.infos.map(info => {
                    const { label, value } = info;
                    return <p key={info.label}>
                      <label>{label}：</label>
                      <span>{value}</span>
                    </p>
                  })
                }
              </div>
            })
          }
          <div className="split-block">
            <h3>审核信息</h3>
            <Form>
              <FormItem label="变更销售" {...formItemLayout}>
                {getFieldDecorator('title1')(<Input />)}
              </FormItem>
              <FormItem label="审核意见" {...formItemLayout}>
                {getFieldDecorator('title2')(<TextArea rows={4} />)}
              </FormItem>
              <FormItem label="审核" {...formItemLayout}>
                {getFieldDecorator('title3')(
                  <Select>
                    <Option value="true">审核拒绝</Option>
                    <Option value="false">审核通过</Option>
                  </Select>
                )}
              </FormItem>
            </Form>
          </div>
        </div>

        <ImgsPreviewModal
          visible={isShowSilderModal}
          closeModal={() => { this.setState({ isShowSilderModal: false }) }}
          sliderPicSrcs={sliderPicSrcs}
        />
      </Modal>
    );
  }
}
/**
 * 客户关联申请-审核弹窗
 */
const CustInvolvedAuditModal = Form.create<Props>()(CustInvolvedAuditModalForm);
export default CustInvolvedAuditModal;

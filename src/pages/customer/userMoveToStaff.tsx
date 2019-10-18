/*
 * @Description:会员转移至销售
 * @Author: xiaoya
 * @Date: 2019-02-26 14:44:18
 * @Last Modified by: xiaoya
 * @Last Modified time: 2019-10-16 18:18:35
 */
import React, { Fragment, Component } from 'react';
import ReactDOM from 'react-dom';
import BatchTransferToStaffForm from '@components/customer/BatchTransferToStaffForm';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Tabs, Row, Col, Select, Input, Button, message } from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;

const initialState = {

};

interface FormProps extends FormComponentProps { }
type State = Readonly<typeof initialState>;

class UserMoveToStaffForm extends Component<FormProps, State>{
  readonly state: State = initialState;

  handleSubmit = (e) => {
    e && e.preventDefault();
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log(values)
      let param = values;
      param[values.type] = values['searchContent'];
      delete param['type'];
      delete param['searchContent'];
      T.post(T.getFrontPath('/customer/userMoveToStaff.json'), param)
        .then(() => {
          message.success('转移成功！');
        })
        .catch((err) => {
          T.showErrorMessage(err);
        });
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { formItemLayout } = CONFIG;
    return (
      <div className="content-wrap">
        <div className="content-header">
          <Tabs defaultActiveKey="single">
            <TabPane tab="单个转移" key="single">
              <Form onSubmit={this.handleSubmit}>
                <Row>
                  <Col span={6}>
                    <FormItem
                      {...formItemLayout}
                      label={
                        <Fragment>
                          {getFieldDecorator('type', {
                            initialValue: 'userLoginName'
                          })(
                            <Select style={{ marginRight: 3, width: 90 }}>
                              <Option value="userLoginName">会员名</Option>
                              <Option value="cell">手机号</Option>
                            </Select>
                          )}
                        </Fragment>
                      }
                    >
                      {getFieldDecorator('searchContent', {
                        rules: [
                          {
                            required: true,
                            message: '请输入会员名或手机号'
                          }
                        ]
                      })(<Input />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <FormItem {...formItemLayout} label="销售登录名">
                      {getFieldDecorator('staffLoginName', {
                        rules: [
                          {
                            required: true,
                            message: '请输入销售登录名'
                          }
                        ]
                      })(<Input />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Col span={8} />
                    <Col>
                      <Button type="primary" htmlType="submit">
                        确定转移
                      </Button>
                    </Col>
                  </Col>
                </Row>
              </Form>
            </TabPane>
            <TabPane tab="批量转移" key="batch">
              <BatchTransferToStaffForm />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}
const UserMoveToStaff = Form.create<FormProps>()(UserMoveToStaffForm);
export default UserMoveToStaff;

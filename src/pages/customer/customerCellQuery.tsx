/*
 * @Description: 手机号查询页面
 * @Author: xiaoya
 * @Date: 2019-10-16 14:10:02
 * @Last Modified by: xiaoya
 * @Last Modified time: 2019-10-16 14:19:57
 */
import React, { Component, ReactNode, Fragment } from 'react';
import { Form, Button, Input, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
const FormItem = Form.Item;

const initialState = {

};

type State = Readonly<typeof initialState>;
interface FormProps extends FormComponentProps { }

class CustomerCellQueryForm extends Component<FormProps, State> {
  readonly state: State = initialState;

  handlerSubmit = (e) => {
    e && e.preventDefault();
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (err) {
        return;
      }
    });
  }

  render(): ReactNode {
    const { formItemLayout } = CONFIG;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="content-wrap">
        <div className="content-header">
          <p>今天共可查询<span style={{ color: '#f00' }}>3</span>次，
          今日已成功查询<span style={{ color: '#f00' }}>0</span>次</p>
          <Form onSubmit={this.handlerSubmit}>
            <Row>
              <Col span={5}>
                <FormItem {...formItemLayout} label="用户名">
                  {getFieldDecorator('title1', {
                    rules: [{
                      required: true,
                      message: '请输入查询ID'
                    }]
                  })(<Input placeholder="请输入查询ID" />)}
                </FormItem>
              </Col>
              <Col span={2} style={{ textAlign: 'center', marginTop: '3px' }}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    )
  }
}
const CustomerCellQuery = Form.create<FormProps>()(CustomerCellQueryForm);
export default CustomerCellQuery;

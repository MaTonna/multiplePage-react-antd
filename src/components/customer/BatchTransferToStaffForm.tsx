/*
 * @Description: 会员转移至销售-批量转移表单
 * @Author: xiaoya
 * @Date: 2019-10-16 15:31:30
 * @Last Modified by: xiaoya
 * @Last Modified time: 2019-10-18 14:37:57
 */
import React, { Component, ReactNode, FormEvent } from 'react';
import { Form, Row, Col, Select, Input, Button, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import TableTransfer from '@components/customer/TableTransfer';
const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;

const leftTableColumns = [
  {
    title: "用户名",
    dataIndex: "userName",
    width: 100
  },
  {
    title: "手机号",
    dataIndex: "cell",
    width: 150
  }, {
    title: "所属销售",
    dataIndex: "saleName",
    width: 100
  }
];

const initialState = {
  targetKeys: [],
  selectedKeys: [],
  dataSource: [],
  saleName: '',
  paginator: {
    page: 1,
    pages: 1,
    itemsPerPage: CONFIG['pagination']['currentPageSize'] || 10,
  }
};

interface FormProps extends FormComponentProps { }
type State = Readonly<typeof initialState>;

class BatchTransferToStaff extends Component<FormProps, State> {
  readonly state: State = initialState;

  handleBatchTransfer = () => {
    confirm({
      title: '提示',
      content: '你确定要批量转移吗',
      onOk: () => {
        console.log(this.state.targetKeys)
      }
    });
  };

  handleSelectChange = (sourceSelectedKeys: [], targetSelectedKeys: []) => {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
  };


  handlerSubmit = (
    event?: FormEvent<HTMLFormElement>,
    currentPage = this.state.paginator.page,
    pageSize = this.state.paginator.itemsPerPage
  ): void => {
    event && event.preventDefault();
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log(values);
      this.setState({
        dataSource: [{
          key: 1,
          userName: 'aaa',
          cell: '123456789',
          saleName: 'abc'
        }]
      })
    });
  };

  changeTableData = (nextTargetKeys: []) => {
    this.setState({ targetKeys: nextTargetKeys });
  };

  filterOption(inputValue: string, option: any): boolean {
    return option.groupName.indexOf(inputValue) > -1;
  }

  changeSaleInput = (e) => {
    e.persist();
    this.setState({
      saleName: e.target.value
    });
  };

  render(): ReactNode {
    const { formItemLayout } = CONFIG;
    const { targetKeys, selectedKeys, dataSource, paginator, saleName } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handlerSubmit}>
        <Row type="flex">
          <Col>
            <FormItem label="销售名" {...formItemLayout}>
              {getFieldDecorator('title1', {
                rules: [{
                  required: true,
                  message: '请输入销售名'
                }]
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col>
            <FormItem label="客户状态" {...formItemLayout}>
              {getFieldDecorator('title2', {
                initialValue: 'ALL'
              })(
                <Select style={{ width: 160 }}>
                  <Option value="ALL">所有</Option>
                  <Option value="WAIT_REGISTER">待开户</Option>
                  <Option value="REGISTER_ALREADY">已开户</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col>
            <FormItem label="客户类型" {...formItemLayout}>
              {getFieldDecorator('title3', {
                initialValue: 'ALL'
              })(
                <Select style={{ width: 160 }}>
                  <Option value="ALL">所有</Option>
                  <Option value="WAIT_REGISTER">待开户</Option>
                  <Option value="REGISTER_ALREADY">已开户</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col>
            <Button
              className="ml"
              htmlType="submit"
              type="primary"
              style={{ marginTop: '3px' }}
            >
              搜索
            </Button>
          </Col>
        </Row>
        <TableTransfer
          style={{ marginTop: "10px" }}
          dataSource={dataSource}
          targetKeys={targetKeys}
          onChange={this.changeTableData.bind(this)}
          filterOption={this.filterOption.bind(this)}
          leftColumns={leftTableColumns}
          rightColumns={leftTableColumns}
        />
        <div style={{ display: 'inline-block', margin: '20px 0 0 15px' }}>
          <Row>
            <Col span={10}>转移至销售：</Col>
            <Col span={14}>
              <Input onChange={this.changeSaleInput} />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col span={10} />
            <Col span={14}>
              <Button
                type="primary"
                onClick={this.handleBatchTransfer}
                disabled={targetKeys.length === 0 || saleName === ''}
              >
                强制转移
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    )
  }
}
/**
 * 会员转移至销售-批量转移表单
 */
const BatchTransferToStaffForm = Form.create<FormProps>()(BatchTransferToStaff);
export default BatchTransferToStaffForm

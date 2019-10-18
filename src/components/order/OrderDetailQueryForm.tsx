/*
 * @Description: 业绩查询 - 业绩明细查询
 * @Author: xiaoya
 * @Date: 2019-10-18 14:38:08
 * @Last Modified by: xiaoya
 * @Last Modified time: 2019-10-18 14:51:11
 */
import React, { Component, ReactNode, FormEvent, Fragment } from 'react';
import { Form, Row, Col, Select, Input, Button, DatePicker, Table } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

const initialState = {
  dataSource: [],
  loading: false,
  paginator: {
    page: 0,
    items: 1,
    itemsPerPage: CONFIG['pagination']['currentPageSize'] || 10,
  },
};

interface FormProps extends FormComponentProps { }
type State = Readonly<typeof initialState>;

class OrderDetailQuery extends Component<FormProps, State> {
  readonly state: State = initialState;

  columns = [{
    title: '订单编号',
    dataIndex: '1',
  },
  {
    title: '来源用户名',
    dataIndex: '2',
  },
  {
    title: '来源彩店',
    dataIndex: '3',
  },
  {
    title: '销量金额',
    dataIndex: '4',
  },
  {
    title: '订单类型',
    dataIndex: '5',
  },
  {
    title: '发生时间',
    dataIndex: '6',
  }]

  handlePagination = (currentpage: number, pageSize: number): void => {
    this.handlerSubmit(null, currentpage, pageSize);
  }

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
      this.getTableData(values, currentPage, pageSize);
    });
  };

  getTableData = (values: object, currentPage: number, pageSize: number): void => {
    console.log(values, currentPage, pageSize)
    const dataSource = [{
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    }, {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    }]
    const paginator = {
      page: 2,
      items: 10,
      itemsPerPage: 10,
    }
    this.setState({
      dataSource,
      paginator,
    });
  }

  render(): ReactNode {
    const { getFieldDecorator } = this.props.form;
    const { formItemLayout, timeRanges } = CONFIG;
    const { columns } = this;
    const { dataSource, loading, paginator: { items, page, itemsPerPage } } = this.state;

    return (
      <Fragment>
        <div className="content-header">
          <Form onSubmit={this.handlerSubmit}>
            <Row type="flex">
              <Col>
                <FormItem {...formItemLayout} label="时间">
                  {getFieldDecorator('title1')(<RangePicker ranges={timeRanges} className="calendar-picker" />)}
                </FormItem>
              </Col>
              <Col>
                <FormItem {...formItemLayout} label="用户名">
                  {getFieldDecorator('title2')(<Input />)}
                </FormItem>
              </Col>
              <Col>
                <FormItem {...formItemLayout} label="客户ID">
                  {getFieldDecorator('title3')(<Input />)}
                </FormItem>
              </Col>
              <Col>
                <FormItem {...formItemLayout} label="订单编号">
                  {getFieldDecorator('title4')(<Input />)}
                </FormItem>
              </Col>
              <Col>
                <FormItem {...formItemLayout} label="销售名">
                  {getFieldDecorator('title5')(<Input />)}
                </FormItem>
              </Col>
              <Col>
                <FormItem {...formItemLayout} label="来源彩店">
                  {getFieldDecorator('title6')(<Input />)}
                </FormItem>
              </Col>
              <Col>
                <FormItem {...formItemLayout} label="订单类型">
                  {getFieldDecorator('title7')(
                    <Select>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col className="button-group">
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="content-main">
          <Table
            rowKey={(row: { key: string }) => row.key}
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            locale={{ emptyText: '未找到对应内容' }}
            pagination={{
              total: items,
              current: page,
              pageSize: itemsPerPage,
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: CONFIG.pagination.pageSizeOptions,
              showTotal: (total: number) => `共计 ${total} 条记录`,
              onChange: (current: number, size: number) => {
                this.handlePagination(current, size);
              },
              onShowSizeChange: (current: number, size: number) => {
                localStorage.setItem('currentPageSize', size.toString())
                this.handlePagination(current, size);
              },
            }}
          />
        </div>
      </Fragment>
    )
  }
}
/**
 * 业绩查询 - 业绩明细查询
 */
const OrderDetailQueryFormForm = Form.create<FormProps>()(OrderDetailQuery);
export default OrderDetailQueryFormForm;

import React, { Component, FormEvent, ReactNode } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Table, Row, Col, Input, Button, Select, DatePicker, Tabs } from 'antd';
import OrderDetailQueryFormForm from '@components/order/orderDetailQueryForm';
const FormItem = Form.Item;
const Option = Select.Option;
const { MonthPicker } = DatePicker;
const { TabPane } = Tabs;

const initialState = {
  dataSource: [],
  loading: false,
  paginator: {
    page: 0,
    items: 1,
    itemsPerPage: CONFIG['pagination']['currentPageSize'] || 10,
  },
};
type State = Readonly<typeof initialState>;

interface FormProps extends FormComponentProps { }

class OrderQueryForm extends Component<FormProps, State> {
  readonly state: State = initialState;

  columns = [{
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
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
    const { dataSource, loading, paginator: { items, page, itemsPerPage } } = this.state;
    const { columns } = this;
    const { formItemLayout } = CONFIG;
    return (
      <div className="content-wrap">
        <Tabs defaultActiveKey="1">
          <TabPane tab="业绩明细" key="1">
            <OrderDetailQueryFormForm />
          </TabPane>
          <TabPane tab="业绩汇总" key="2">
            <div className="content-header">
              <Form onSubmit={this.handlerSubmit}>
                <Row type="flex">
                  <Col>
                    <FormItem {...formItemLayout} label="时间">
                      {getFieldDecorator('title1')(<MonthPicker format='YYYY/MM' />)}
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
          </TabPane>
        </Tabs>

      </div>
    )
  }
}

const OrderQuery = Form.create<FormProps>()(OrderQueryForm);
export default OrderQuery;

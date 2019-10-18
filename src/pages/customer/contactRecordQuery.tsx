/*
 * @Description: 联系小记查询
 * @Author: xiaoya
 * @Date: 2019-10-16 14:26:09
 * @Last Modified by: xiaoya
 * @Last Modified time: 2019-10-16 14:44:45
 */
import React, { Component, FormEvent, ReactNode, Fragment } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Table, Row, Col, Input, Button, Select, DatePicker, Divider } from 'antd';
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
  selectedRowKeys: []
};
type State = Readonly<typeof initialState>;

interface FormProps extends FormComponentProps { }

class CustomerCellQueryForm extends Component<FormProps, State> {
  readonly state: State = initialState;

  columns = [{
    title: '客户微信号',
    dataIndex: '1',
  }, {
    title: '手机号',
    dataIndex: '2',
  }, {
    title: '创建销售',
    dataIndex: '3',
  }, {
    title: '销售微信号',
    dataIndex: '4',
  }, {
    title: '客户归属销售',
    dataIndex: '5',
  }, {
    title: '客户类型',
    dataIndex: '6',
  }, {
    title: '小记类型',
    dataIndex: '7',
  }, {
    title: '创建时间',
    dataIndex: '8',
  }, {
    title: '同类型小记数',
    dataIndex: '9',
  }, {
    title: '抽查状态',
    dataIndex: '10',
  }, {
    title: '小记状态',
    dataIndex: '11',
  }, {
    title: '操作',
    dataIndex: 'opr',
    render: (_, record) => {
      return <Fragment>
        <a>详情</a>
        <Divider type="vertical" />
        <a>设为抽查</a>
      </Fragment>
    }
  }]

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

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
    }, {
      key: '2',
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
    const { dataSource,
      loading,
      paginator: { items, page, itemsPerPage },
      selectedRowKeys
    } = this.state;
    const { columns } = this;
    const { formItemLayout, timeRanges } = CONFIG;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div className="content-wrap">
        <div className="content-header">
          <Form onSubmit={this.handlerSubmit}>
            <Row type="flex">
              <Col>
                <FormItem {...formItemLayout} label="创建时间">
                  {getFieldDecorator('title1')(<RangePicker ranges={timeRanges} className="calendar-picker" />)}
                </FormItem>
              </Col>
              <Col>
                <FormItem {...formItemLayout} label="销售公司">
                  {getFieldDecorator('title2')(
                    <Select>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col>
                <FormItem {...formItemLayout} label="客户类型">
                  {getFieldDecorator('title3')(
                    <Select>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col>
                <FormItem {...formItemLayout} label="抽查状态">
                  {getFieldDecorator('title4')(
                    <Select>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col>
                <FormItem {...formItemLayout} label="手机号">
                  {getFieldDecorator('title5')(<Input />)}
                </FormItem>
              </Col>
              <Col>
                <FormItem {...formItemLayout} label="创建销售">
                  {getFieldDecorator('title6')(<Input />)}
                </FormItem>
              </Col>
              <Col>
                <FormItem {...formItemLayout} label="小记类型">
                  {getFieldDecorator('title7')(
                    <Select>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col>
                <FormItem {...formItemLayout} label="小记状态">
                  {getFieldDecorator('title8')(
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
            rowSelection={rowSelection}
            rowKey={(row: { key: string }) => row.key}
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            locale={{ emptyText: '未找到对应内容' }}
            footer={() => <Button>批量抽查</Button>}
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
      </div>
    )
  }
}

const CustomerCellQuery = Form.create<FormProps>()(CustomerCellQueryForm);
export default CustomerCellQuery;

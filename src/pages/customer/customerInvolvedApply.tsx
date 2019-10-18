/*
 * @Description: 客户关联申请页面
 * @Author: xiaoya
 * @Date: 2019-10-15 16:59:38
 * @Last Modified by: xiaoya
 * @Last Modified time: 2019-10-16 14:10:14
 */
import React, { Component, FormEvent, ReactNode, Fragment } from 'react';
import CustInvolvedAuditModal from '@components/customer/CustInvolvedAuditModal';
import CustInvolvedDetailModal from '@components/customer/CustInvolvedDetailModal';
import { FormComponentProps } from 'antd/lib/form';
import '@styles/customer/customerInvolvedApply.less';
import { Form, Table, Row, Col, Input, Button, Select, DatePicker } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

const initialState = {
  dataSource: [],
  loading: false,
  paginator: {
    page: 0,
    items: 1,
    itemsPerPage: CONFIG['pagination']['currentPageSize'] || 40,
  },
  isShowAuditModal: false,
  isShowDetailModal: false,
  selectedRowKeys: []
};
type State = Readonly<typeof initialState>;

interface FormProps extends FormComponentProps { }

class CustomerInvolvedApplyForm extends Component<FormProps, State> {
  readonly state: State = initialState;

  columns = [{
    title: '申请编号',
    dataIndex: '1',
    render: (_, record) => {
      return <a onClick={() => { this.showDetailModal() }}>编号</a>
    }
  }, {
    title: '用户名',
    dataIndex: '2',
  }, {
    title: '申请时间',
    dataIndex: '3',
  }, {
    title: '申请销售',
    dataIndex: '4',
  }, {
    title: '关联原因',
    dataIndex: '5',
  }, {
    title: '审核状态',
    dataIndex: '6',
  }, {
    title: '操作',
    dataIndex: 'opr',
    render: (_, record) => {
      return <a onClick={() => this.showAuditModal()}>审核</a>
    }
  }]

  showAuditModal = () => {
    this.setState({
      isShowAuditModal: true
    })
  }

  showDetailModal = () => {
    this.setState({
      isShowDetailModal: true
    })
  }

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
      isShowAuditModal,
      isShowDetailModal,
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
                <FormItem {...formItemLayout} label="用户名">
                  {getFieldDecorator('title1')(<Input />)}
                </FormItem>
              </Col>
              <Col>
                <FormItem {...formItemLayout} label="申请销售">
                  {getFieldDecorator('title2')(<Input />)}
                </FormItem>
              </Col>
              <Col>
                <FormItem {...formItemLayout} label="申请时间">
                  {getFieldDecorator('title3')(<RangePicker ranges={timeRanges} className="calendar-picker" />)}
                </FormItem>
              </Col>
              <Col>
                <FormItem {...formItemLayout} label="审核状态">
                  {getFieldDecorator('title4')(
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
            footer={() => <Button>批量审核拒绝</Button>}
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

        <CustInvolvedAuditModal
          visible={isShowAuditModal}
          closeModal={() => {
            this.setState({
              isShowAuditModal: false
            })
          }}
        />

        <CustInvolvedDetailModal
          visible={isShowDetailModal}
          closeModal={() => {
            this.setState({
              isShowDetailModal: false
            })
          }}
        />
      </div>
    )
  }
}

const CustomerInvolvedApply = Form.create<FormProps>()(CustomerInvolvedApplyForm);
export default CustomerInvolvedApply;

import React, { Component, FormEvent, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import AddModal from '@components/AddModal';
import BasicLayout from '@layouts/BasicLayout';
import { FormComponentProps } from 'antd/lib/form';
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
    itemsPerPage: parseInt(localStorage.getItem('pageSizeOption')) || 10,
  },
  isShowAddModal: false
};
type State = Readonly<typeof initialState>;

interface FormProps extends FormComponentProps { }

class DemoPageForm extends Component<FormProps, State> {
  readonly state: State = initialState;

  columns = [{
    title: '姓名',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    key: 'age',
    dataIndex: 'age',
  },
  {
    title: '住址',
    key: 'address',
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

  showAddModal() {
    this.setState({
      isShowAddModal: true
    })
  }

  render(): ReactNode {
    const { getFieldDecorator } = this.props.form;
    const { dataSource, loading, paginator: { items, page, itemsPerPage }, isShowAddModal } = this.state;
    const { columns } = this;
    const { formItemLayout } = CONFIG;
    return (
      <BasicLayout>
        <div className="content-header">
          <Form onSubmit={this.handlerSubmit}>
            <Row type="flex">
              <Col key="title1">
                <FormItem {...formItemLayout} label="输入框">
                  {getFieldDecorator('title1', {
                    rules: [
                      {
                        required: false
                      }
                    ],
                    initialValue: ''
                  })(<Input placeholder="" />)}
                </FormItem>
              </Col>
              <Col key="title2">
                <FormItem {...formItemLayout} label="选择器">
                  {getFieldDecorator('title2', {
                    rules: [
                      {
                        required: false
                      }
                    ],
                    initialValue: ''
                  })(
                    <Select onChange={null}>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col key="title3">
                <FormItem {...formItemLayout} label="日期选择框">
                  {getFieldDecorator('title3', {
                    rules: [
                      {
                        required: false
                      }
                    ],
                    initialValue: ''
                  })(<RangePicker onChange={null} />)}
                </FormItem>
              </Col>
              <Col key="title4">
                <FormItem {...formItemLayout} label="标题4">
                  {getFieldDecorator('title4', {
                    rules: [
                      {
                        required: false
                      }
                    ],
                    initialValue: ''
                  })(<Input placeholder="" />)}
                </FormItem>
              </Col>
              <Col key="title5">
                <FormItem {...formItemLayout} label="标题5">
                  {getFieldDecorator('title5', {
                    rules: [
                      {
                        required: false
                      }
                    ],
                    initialValue: ''
                  })(<Input placeholder="" />)}
                </FormItem>
              </Col>
              <Col key="title6">
                <FormItem {...formItemLayout} label="标题6">
                  {getFieldDecorator('title6', {
                    rules: [
                      {
                        required: false
                      }
                    ],
                    initialValue: ''
                  })(<Input placeholder="" />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col className="button-group">
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button className="ml" type="primary" onClick={() => this.setState({ isShowAddModal: true })}>
                  创建
                </Button>
              </Col>
            </Row>
          </Form>
          <div className="content-main">

            <Table
              className="my-table"
              rowKey={(row: { key: string }) => row.key}
              columns={columns}
              dataSource={dataSource}
              loading={loading}
              locale={{ emptyText: '未找到对应内容' }}
              pagination={{
                total: items,
                current: page,
                pageSize: itemsPerPage,
                showSizeChanger: true,
                pageSizeOptions: CONFIG.pagination.pageSizeOptions,
                showTotal: (total: number) => `共计 ${total} 条记录`,
                onChange: (current: number, size: number) => {
                  this.handlePagination(current, size);
                },
                onShowSizeChange: (current: number, size: number) => {
                  localStorage.setItem('pageSizeOption', size.toString())
                  this.handlePagination(current, size);
                },
              }}
            />
          </div>

          <AddModal
            visible={isShowAddModal}
            closeModal={() => {
              this.setState({
                isShowAddModal: false
              })
            }}
          />

        </div>
      </BasicLayout >
    )
  }
}

const DemoPage = Form.create<FormProps>()(DemoPageForm);
ReactDOM.render(<DemoPage />, document.getElementById('root'));

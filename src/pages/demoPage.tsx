import React, { Component, FormEvent, ReactNode } from 'react';
import AddModal from '@components/AddModal';
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
    itemsPerPage: CONFIG['pagination']['currentPageSize'] || 10,
  },
  isShowAddModal: false
};
type State = Readonly<typeof initialState>;

interface FormProps extends FormComponentProps { }

class DemoPageForm extends Component<FormProps, State> {
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

  showAddModal() {
    this.setState({
      isShowAddModal: true
    })
  }

  render(): ReactNode {
    const { columns } = this;
    const { getFieldDecorator } = this.props.form;
    const { dataSource, loading, paginator: { items, page, itemsPerPage }, isShowAddModal } = this.state;
    const { formItemLayout, timeRanges } = CONFIG;
    return (
      <div className="content-wrap">
        <div className="content-header">
          <Form onSubmit={this.handlerSubmit}>
            <Row type="flex">
              <Col>
                <FormItem {...formItemLayout} label="输入框">
                  {getFieldDecorator('title1')(<Input />)}
                </FormItem>
              </Col>
              <Col>
                <FormItem {...formItemLayout} label="选择器">
                  {getFieldDecorator('title2')(
                    <Select>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col>
                <FormItem {...formItemLayout} label="日期选择框">
                  {getFieldDecorator('title3')(<RangePicker ranges={timeRanges} className="calendar-picker" />)}
                </FormItem>
              </Col>
              <Col>
                <FormItem {...formItemLayout} label="标题4">
                  {getFieldDecorator('title4')(<Input />)}
                </FormItem>
              </Col>
              <Col>
                <FormItem {...formItemLayout} label="标题5">
                  {getFieldDecorator('title5')(<Input />)}
                </FormItem>
              </Col>
              <Col>
                <FormItem {...formItemLayout} label="标题6">
                  {getFieldDecorator('title6')(<Input />)}
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

        <AddModal
          visible={isShowAddModal}
          closeModal={() => {
            this.setState({
              isShowAddModal: false
            })
          }}
        />
      </div>
    )
  }
}

const DemoPage = Form.create<FormProps>()(DemoPageForm);
export default DemoPage;

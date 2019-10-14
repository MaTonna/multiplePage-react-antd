/*
 * @Description: 设置快速导航弹窗
 * @Author: xiaoya
 * @Date: 2019-10-12 11:01:14
 * @Last Modified by: xiaoya
 * @Last Modified time: 2019-10-14 10:46:30
 */
import React, { Component, ReactNode, FormEvent, BaseSyntheticEvent } from 'react';
import { Modal, Checkbox, Tag } from 'antd';
import Sortable from 'react-sortablejs';

interface Prop {
  visible: boolean
  checkedList: Array<any>
  closeModal: Function
  getCheckList: Function
}

const initialState = {
  navsList: [{
    label: '客户管理',
    param: 'customerManage',
    options: [{
      label: 'apple1',
      value: '1',
      parent: 'customerManage'
    }, {
      label: 'pear1',
      value: '2',
      parent: 'customerManage'
    }]
  }, {
    label: '客户管理2',
    param: 'customerManage2',
    options: [{
      label: 'apple2',
      value: '3',
      parent: 'customerManage2'
    }, {
      label: 'pear2',
      value: '4',
      parent: 'customerManage2'
    }]
  }],
  checkedList: [],
  checkedIds: []
};

type State = Readonly<typeof initialState>;

class SetNavsModal extends Component<Prop, State> {
  readonly state: State = initialState;

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      checkedList: nextProps.checkedList
    })
  }

  handleOk = () => {
    this.props.closeModal();
    this.props.getCheckList(this.state.checkedList);
  }

  handleCancel = () => {
    // 点击取消传回之前选择的内容，保证同步
    this.props.closeModal();
    this.props.getCheckList(this.props.checkedList);
  }

  chooseNav = (isChecked: boolean, value: string) => {
    let { checkedIds } = this.state;
    if (isChecked) {
      checkedIds.push(value)
    } else {
      const index = checkedIds.indexOf(value);
      checkedIds.splice(index, 1);
    }
    const { navsList } = this.state;
    let checkedList = [];
    checkedIds.forEach(id => {
      navsList.forEach(item => {
        item.options.forEach(opt => {
          if (opt.value === id) {
            checkedList.push(opt);
          }
        })
      })
    })
    this.setState({
      checkedList
    })
  }

  sortNavs = (orderList: []) => {
    const { checkedList } = this.state;
    const newCheckedList = [];
    // checkedList按照orderList的顺序进行排序
    orderList.forEach(id => {
      checkedList.forEach(item => {
        if (item.value === id) {
          newCheckedList.push(item)
        }
      })
    })
    this.setState({
      checkedList: newCheckedList
    })
  }

  render(): ReactNode {
    const { visible } = this.props;
    const { navsList, checkedList } = this.state;
    const checkedIds = checkedList.map((item: { value: string }) => {
      return item.value;
    })
    return (
      <Modal
        title="快速导航设置"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        {
          navsList.map(item => {
            const { param, label, options } = item;
            return <div className="nav-block" key={param}>
              <p className="nav-param">{label}</p>
              {
                options.map(opt => {
                  const { value, label } = opt;
                  return <Checkbox
                    key={value}
                    checked={checkedIds.indexOf(value) > -1}
                    onChange={(e) => this.chooseNav(e.target.checked, value)}
                  >
                    {label}
                  </Checkbox>
                }
                )
              }
            </div>
          })
        }
        <div>
          <p>已勾选（{checkedList.length}/10）:</p>
          <Sortable
            className="query-list"
            tag="ol"
            onChange={this.sortNavs}
            options={{
              animation: 150,
              handle: `.tag-drag`,
              draggable: `.tag-drag`,
              dataIdAttr: 'data-id',
              sort: true,
            }}
          >
            {
              checkedList.map(item => {
                const key = item.value;
                return <span
                  className="tag-drag"
                  data-id={key}
                  key={key}>
                  <Tag
                    closable
                    className="nav-tag"
                    onClose={() => this.chooseNav(false, key)}
                  >
                    {item.label}
                  </Tag>
                </span>
              })
            }
          </Sortable>
        </div>
      </Modal>
    )
  }
}
export default SetNavsModal;

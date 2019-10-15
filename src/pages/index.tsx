/*
 * @Description: 首页
 * @Author: xiaoya
 * @Date: 2019-10-12 11:01:18
 * @Last Modified by: xiaoya
 * @Last Modified time: 2019-10-14 11:14:24
 */
import React, { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import BasicLayout from '@layouts/BasicLayout';
import '@styles/index.less';
import { Button } from 'antd';
import SetNavsModal from '@components/Index/SetNavsModal';

const initialState = {
  isShowSetNavsModal: true,
  checkedList: []
};

type State = Readonly<typeof initialState>;

class Index extends Component<{}, State> {
  readonly state: State = initialState;

  showSetNavsModal = () => {
    this.setState({ isShowSetNavsModal: true })
  }

  closeSetNavsModal = () => {
    this.setState({
      isShowSetNavsModal: false,
    })
  }

  getCheckList = (checkedList: []) => {
    this.setState({
      checkedList
    })
  }

  render(): ReactNode {
    const { isShowSetNavsModal, checkedList } = this.state;
    return (
      <BasicLayout>
        <div>
          快速导航<Button onClick={this.showSetNavsModal}>设置</Button>
          <div>
            {
              checkedList.map(item => {
                return <a key={item.value}>{item.label}</a>
              })
            }
          </div>
        </div>

        <SetNavsModal
          visible={isShowSetNavsModal}
          checkedList={checkedList}
          closeModal={this.closeSetNavsModal}
          getCheckList={this.getCheckList}
        />

      </BasicLayout >
    )
  }
}
ReactDOM.render(<Index />, document.getElementById('root'));

import React, { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import BasicLayout from '@layouts/BasicLayout';
import VolumeCard from '@components/dashBoard/VolumeCard';
import VolumnAndLineCard from '@components/dashBoard/VolumnAndLineCard';
import '@styles/dashBoard.less';

const initialState = {
  boardList: [{
    id: 1,
    type: 'volume',
    title: '本月个人销售额',
    volume: 30000,
    lastMonthVolume: 150000,
  }, {
    id: 2,
    type: 'volumnAndLine',
    title: '本月个人开户数',
    value: 78,
    areaColor: '#f00',
    data: [{
      key: '2019-09-29',
      value: 5
    }, {
      key: '2019-09-30',
      value: 2
    }, {
      key: '2019-10-01',
      value: 4
    }, {
      key: '2019-10-02',
      value: 10
    }, {
      key: '2019-10-03',
      value: 3
    }]
  }]
};

type State = Readonly<typeof initialState>;

class Dashboard extends Component<{}, State> {
  readonly state: State = initialState;

  cardMap = {
    volume: VolumeCard,
    volumnAndLine: VolumnAndLineCard
  }

  render(): ReactNode {
    const { boardList } = this.state;
    const { cardMap } = this;
    return (
      <BasicLayout>
        <div className="clearfix board-list" id="boardList">
          {boardList.map(item => {
            const Component = cardMap[item.type];
            return <Component key={item.id} {...item} />
          })}
        </div>
      </BasicLayout >
    )
  }
}

ReactDOM.render(<Dashboard />, document.getElementById('root'));

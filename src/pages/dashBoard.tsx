import React, { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import BasicLayout from '@layouts/BasicLayout';
import VolumeCard from '@components/dashBoard/VolumeCard';
import VolumnAndLineCard from '@components/dashBoard/VolumnAndLineCard';
import TabsAndChartCard from '@components/dashBoard/TabsAndChartCard';
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
    areaColor: '#2f4554',
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
  }, {
    id: 3,
    type: 'volumnAndLine',
    title: '本月个人开户数3',
    value: 78,
    areaColor: '#61a0a8',
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
      key: '2019-09-30',
      value: 2
    }, {
      key: '2019-10-02',
      value: 4
    }, {
      key: '2019-10-04',
      value: 10
    }, {
      key: '2019-10-06',
      value: 3
    }]
  }, {
    id: 4,
    type: 'volumnAndLine',
    title: '本月个人开户数4',
    value: 10000585,
    areaColor: '#91c7ae',
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
      key: '2019-09-30',
      value: 2
    }, {
      key: '2019-10-02',
      value: 4
    }, {
      key: '2019-10-04',
      value: 10
    }, {
      key: '2019-10-06',
      value: 3
    }]
  }, {
    id: 5,
    grade: 'P',
    url: 'xxx.json',
    size: 'half',
    type: 'tabsAndChart',
    isStack: true,
    timeTabType: '1',
    chartType: 'bar',
    valuesParam: ['本组销售额', '个人销售额'],
    titleTabList: [{
      title: '本组及个人销售额',
      code: '1',
      urlParam: 'myVol'
    }],
    data: [{
      key: '2019-09-29',
      values: [8, 6]
    }, {
      key: '2019-10-01',
      values: [10, 6]
    }, {
      key: '2019-09-30',
      values: [7, 6]
    }, {
      key: '2019-10-02',
      values: [15, 5]
    }, {
      key: '2019-10-04',
      values: [25, 6]
    }]
  }, {
    id: 6,
    grade: 'P',
    url: 'xxx.json',
    size: 'half',
    type: 'tabsAndChart',
    timeTabType: '2',
    chartType: 'pie',
    pietitle: '销售额',
    titleTabList: [{
      title: '不同客户类型销售额占比',
      code: '1',
      urlParam: 'myVol'
    }],
    unit: '¥',
    data: [{
      name: '客户池1',
      value: 20000
    }, {
      name: '客户池2',
      value: 50000
    }, {
      name: '客户池3',
      value: 10000
    }, {
      name: '客户池4',
      value: 45000
    }, {
      name: '客户池5',
      value: 25000
    }]
  }, {
    id: 7,
    grade: 'P',
    url: 'xxx.json',
    size: 'threeQuarter',
    type: 'tabsAndChart',
    chartType: 'line',
    valuesParam: ['本组内排名', '本公司内排名', '总排名'],
    titleTabList: [{
      title: '本组销售额',
      code: '1',
      urlParam: 'myVol'
    }],
    data: [{
      key: '2019-09-29',
      values: [8, 6, 5]
    }, {
      key: '2019-10-01',
      values: [10, 6, 7]
    }, {
      key: '2019-09-30',
      values: [7, 6, 8]
    }, {
      key: '2019-10-02',
      values: [15, 5, 9]
    }, {
      key: '2019-10-04',
      values: [25, 6, 7]
    }]
  }, {
    id: 8,
    grade: 'P',
    url: 'xxx.json',
    size: 'quarter',
    type: 'tabsAndChart',
    timeTabType: '2',
    chartType: 'form',
    pietitle: '销售额',
    titleTabList: [{
      title: '业绩榜',
      code: '1',
    }],
    unit: '¥',
    data: [{
      name: '客户池1',
      value: 20000
    }, {
      name: '客户池2',
      value: 50000
    }, {
      name: '客户池3',
      value: 10000
    }, {
      name: '客户池4',
      value: 45000
    }, {
      name: '客户池5',
      value: 25000
    }]
  }, {
    id: 9,
    grade: 'P',
    url: 'xxx.json',
    size: 'quarter',
    type: 'tabsAndChart',
    timeTabType: '2',
    chartType: 'form',
    pietitle: '销售额',
    titleTabList: [{
      title: '开户榜',
      code: '1'
    }],
    unit: '¥',
    data: [{
      name: '客户池1',
      value: 20000
    }, {
      name: '客户池2',
      value: 50000
    }, {
      name: '客户池3',
      value: 10000
    }, {
      name: '客户池4',
      value: 45000
    }, {
      name: '客户池5',
      value: 25000
    }]
  }]
};

type State = Readonly<typeof initialState>;

class Dashboard extends Component<{}, State> {
  readonly state: State = initialState;

  cardMap = {
    volume: VolumeCard,
    volumnAndLine: VolumnAndLineCard,
    tabsAndChart: TabsAndChartCard
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

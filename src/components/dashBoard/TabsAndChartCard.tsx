import React, { Component, Fragment } from 'react';
import { Tabs, Button } from 'antd';
const echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
require('echarts/lib/chart/pie');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');

import { percentBarChartOption, barSeriesOpt, pieChartOption, lineChartOption, lineSeriesOpt } from '@components/dashBoard/chartOptions';
const { TabPane } = Tabs;
const ButtonGroup = Button.Group;
type TitleTab = {
  title: string
  code?: string
  urlParam?: string
}
type Props = {
  id: boolean
  grade: string
  type: string
  size: "quarter" | "half" | "threeQuarter"
  url: string
  chartType: string
  valuesParam: Array<string>
  titleTabList: Array<TitleTab>
  data: Array<object>
  pietitle?: string
  timeTabType?: "1" | "2"
  canShowAllData?: boolean
  isStack?: boolean
  unit?: string
}
const initialState = {
  currentKey: '',
  formHTML: null
}

type State = Readonly<typeof initialState>;

const sizeMap = {
  quarter: 'small-card',
  half: 'middle-card',
  threeQuarter: 'three-quarter-card'
}

const timeButtonsMap = {
  '1': [{
    name: '按天',
    code: 'day'
  }, {
    name: '按月',
    code: 'month'
  }],
  '2': [{
    name: '今日',
    code: 'today'
  }, {
    name: '本周',
    code: 'week'
  }, {
    name: '本月',
    code: 'month'
  }]
}

class TabsAndChartCard extends Component<Props, State> {
  readonly state: State = initialState;

  chart = null;

  componentDidMount() {
    const { timeTabType, chartType } = this.props;
    if (chartType !== 'form') {
      this.renderChart();
    } else {
      this.getFormHTML();
    }
    this.setState({
      currentKey: timeTabType ? timeButtonsMap[timeTabType][0]['code'] : ''
    })
  }

  getOptHTML = () => {
    const { timeTabType } = this.props;
    const { currentKey } = this.state;
    return timeTabType &&
      <ButtonGroup>
        {
          timeButtonsMap[timeTabType].map(item =>
            <Button
              size="small"
              key={item.code}
              type={currentKey === item.code ? 'primary' : 'default'}
              onClick={() => this.changeTimeTab(item.code)}
            >{item.name}</Button>
          )
        }
      </ButtonGroup>
  }

  renderChart = (): void => {
    // 请求接口，获取数据，渲染图表
    const { id, data } = this.props;
    setTimeout(() => {
      const dom = document.getElementById(`tabsAndChart-${id}`);
      this.chart = echarts.init(dom, null, { height: '430px' });
      this.refreshChart(data);
    }, 0);
  }

  refreshChart = (data: object[]): void => {
    this.chart.setOption(this.handleChartOption(data));
  }

  getHandleSeries = (data: Array<object>, opts?: {}): { series, xAixsData } => {
    // 重组图表的数据，主要用于柱图和线图
    const { valuesParam } = this.props;
    let dataMap = {};
    let xAixsData = [];
    data.forEach((item: any) => {
      const { values } = item;
      xAixsData.push(item.key);
      values.forEach((value: number, index: number) => {
        if (!dataMap[index]) {
          dataMap[index] = [];
        }
        dataMap[index].push(value);
      });
    })

    const series = valuesParam.map((item, index) => {
      return {
        name: item,
        data: dataMap[index],
        ...opts
      }
    })
    return { series, xAixsData };
  }

  getBarSeries = (data: Array<object>): { series, xAixsData } => {
    const { isStack } = this.props;
    const barGap = isStack ? '-100%' : '30%';
    const { series, xAixsData } = this.getHandleSeries(data, { barGap, ...barSeriesOpt });

    return { series, xAixsData };
  }

  toPercent = (num1: number, num2: number): string => {
    return (T.math.floatDiv(num1, num2) * 100).toFixed(2) + '%';
  }

  handleBarOptions = (data: Array<object>): {} => {
    const { valuesParam } = this.props;
    let newChartOption = percentBarChartOption;
    const { series, xAixsData } = this.getBarSeries(data);

    newChartOption['series'] = series;
    newChartOption['xAxis']['data'] = xAixsData;
    newChartOption['legend']['data'] = valuesParam;
    newChartOption['tooltip']['formatter'] = (param: any) => {
      // tooltip增加一行占比，不用回调则没有前面的颜色原点
      // return出去的是每一行的信息，所以要判断是最后一个才显示占比
      const len = param.length;
      return param.map((item: any, index: number) => {
        const { color, seriesName, value } = item;
        return `<i style="background:${color};" class="tooltip-icon"></i>
          ${seriesName}：${value}
          ${(index === len - 1) && len === 2 ? `<br/ ><span class="tooltip-percent">占比：
          ${this.toPercent(param[1].value, param[0].value)}
          </span>` : ''}<br/>`
      }).join('')
    };
    return newChartOption;
  }

  handlePieOptions = (data: object[]): {} => {
    let newChartOption = pieChartOption;
    const { pietitle, unit } = this.props;
    const legendData = data.map((item: any) => item.name)
    let total = 0;
    let valMap = {}
    data.forEach((item: any) => {
      const { value, name } = item;
      total += value;
      valMap[name] = value;
    })
    newChartOption['series']['name'] = pietitle;
    newChartOption['series']['data'] = data;
    newChartOption['series']['label']['formatter'] = `${pietitle}\n${unit} ${total}`;
    newChartOption['legend']['data'] = legendData;
    newChartOption['tooltip']['formatter'] = `{b}：${unit} {c} ({d}%)`;
    newChartOption['legend']['formatter'] = (name: string) => {
      return `${name}  |  ${this.toPercent(valMap[name], total)}  ${unit} ${valMap[name]}`;
    }
    return newChartOption;
  }

  handleLineOptions = (data: object[]): {} => {
    let newChartOption = lineChartOption;
    const { valuesParam } = this.props;
    const { series, xAixsData } = this.getHandleSeries(data, { ...lineSeriesOpt });

    newChartOption['series'] = series;
    newChartOption['xAxis']['data'] = xAixsData;
    newChartOption['legend']['data'] = valuesParam;
    return newChartOption;
  }

  handleOptionsFuncMap = {
    bar: this.handleBarOptions,
    pie: this.handlePieOptions,
    line: this.handleLineOptions
  }

  handleChartOption = (data: Array<object>): {} => {
    const { chartType } = this.props;
    const options = this.handleOptionsFuncMap[chartType](data);
    return options;
  }

  changeTimeTab = (code: string): void => {
    this.setState({
      currentKey: code
    })
    this.refreshChart([{
      key: '2019-09-29',
      values: [20, 6]
    }, {
      key: '2019-10-01',
      values: [30, 6]
    }, {
      key: '2019-09-30',
      values: [17, 6]
    }, {
      key: '2019-10-02',
      values: [15, 5]
    }, {
      key: '2019-10-04',
      values: [25, 6]
    }])
  }

  getFormHTML = () => {
    const formHTML = <Fragment>
      <Tabs className="tabs-no-margin" defaultActiveKey="1" size="small">
        <TabPane tab="总排行" key="1">
        </TabPane>
        <TabPane tab="公司排行" key="2">
        </TabPane>
        <TabPane tab="小组排行" key="3">
        </TabPane>
      </Tabs>
      <table className="card-table">
        <thead>
          <tr>
            <th>排名</th>
            <th>销售</th>
            <th>公司-所属组</th>
            <th>销售额</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>aaa</td>
            <td>bbb-ccc</td>
            <td>eee</td>
          </tr>
          <tr>
            <td>2</td>
            <td>啊啊啊</td>
            <td>啊啊啊-啊啊啊</td>
            <td>啊啊啊</td>
          </tr>
          <tr>
            <td>3</td>
            <td>啊啊啊</td>
            <td>啊啊啊-啊啊啊</td>
            <td>啊啊啊</td>
          </tr>
          <tr>
            <td>152</td>
            <td>啊啊啊</td>
            <td>啊啊啊-啊啊啊</td>
            <td>啊啊啊</td>
          </tr>
        </tbody>
      </table>
    </Fragment>
    this.setState({
      formHTML
    })
  }

  render() {
    const { id, size, titleTabList = [{ title: '', code: '' }], chartType } = this.props;
    const { formHTML } = this.state;
    const isForm = chartType === 'form';
    const optHTML = this.getOptHTML();
    // 单个tab没有蓝色选中线，表格的tab去掉maginBottom
    let tabsClass = 'tab-title';
    if (titleTabList.length === 1) {
      tabsClass += ' single-tab';
    }
    if (isForm) {
      tabsClass += ' tabs-no-margin';
    }
    return (
      <div className={`base-card ${sizeMap[size]}`}>
        {
          <Tabs
            className={tabsClass}
            tabBarExtraContent={optHTML}>
            {
              titleTabList.map((item: any) =>
                <TabPane tab={item.title} key={item.code} />
              )
            }
          </Tabs>
        }
        {
          isForm ?
            formHTML :
            <div className="chart-wrap" id={`tabsAndChart-${id}`}></div>
        }
      </div >
    )
  }
}

export default TabsAndChartCard;

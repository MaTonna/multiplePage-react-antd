import React, { Component } from 'react';
import { volumnLineChartOption } from './chartOptions';
const echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
require('echarts/lib/component/tooltip');

type Props = {
  title: string
  value: number
  id: number
  areaColor: string
  data: Array<object>
}

const initialState = {

}

type State = Readonly<typeof initialState>;

class VolumnAndLineCard extends Component<Props, State> {
  readonly state: State = initialState;

  chart = null;

  componentDidMount() {
    this.renderChart();
  }

  renderChart = () => {
    const { id, areaColor, data } = this.props;
    setTimeout(() => {
      const dom = document.getElementById(`volumnLineChart-${id}`);
      this.chart = echarts.init(dom, null, { height: '140px' });
      this.chart.setOption(this.setChartOption(areaColor, data));
    }, 0);
  }

  setChartOption = (areaColor: string, data: Array<Object>): {} => {
    let newChartOption = volumnLineChartOption;
    let dataMap = { keys: [], values: [] };
    data.forEach((item: any) => {
      dataMap['keys'].push(item.key)
      dataMap['values'].push(item.value)
    })

    // 获取数据后重新set一次option
    newChartOption['series'] = {
      ...newChartOption['series'],
      data: dataMap['values'],
      itemStyle: { color: areaColor },
      areaStyle: { color: areaColor }
    }
    newChartOption['xAxis'] = {
      ...newChartOption['xAxis'],
      data: dataMap['keys']
    }

    return newChartOption;
  }

  render() {
    const { title, value, id } = this.props;
    return (
      <div className="base-card small-card">
        <h3 className="card-title">{title}</h3>
        <p className="volume">{value}</p>
        <div className="chart-wrap" id={`volumnLineChart-${id}`}></div>
      </div>
    )
  }
}

export default VolumnAndLineCard;

const volumnLineChartOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'none' },
    formatter: '{b0}: {c0}'
  },
  grid: {
    top: 5,
    bottom: 0,
    left: 0,
    right: 0
  },
  xAxis: {
    show: false,
    type: 'category',
    data: [],
  },
  yAxis: {
    show: false,
  },
  series: {
    type: 'line',
    smooth: true,
    lineStyle: { color: 'none' },
    itemStyle: {},
    areaStyle: {},
    data: []
  }
}
export default volumnLineChartOption;

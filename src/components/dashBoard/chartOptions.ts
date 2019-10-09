// 颜色取自于https://bizcharts.net/products/bizCharts/api/theme
const COLOR_PIE = ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0', '#3436C7', '#223273'];
const COLOR_PLATE_8 = ['#1890FF', '#2FC25B', '#FACC14', '#223273', '#8543E0', '#13C2C2', '#3436C7', '#F04864'];
const splitLine = {
  lineStyle: {
    color: '#f1f1f1',
    type: 'dashed'
  }
}

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
    right: 0,
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

const percentBarChartOption = {
  color: COLOR_PLATE_8,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: []
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    splitLine,
    type: 'value',
  },
  series: []
}
const pieChartOption = {
  color: COLOR_PIE,
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    itemGap: 20,
    y: 'middle',
    right: '7%',
    data: []
  },
  series: {
    type: 'pie',
    center: ['30%', '50%'],
    radius: ['50%', '70%'],
    avoidLabelOverlap: false,
    label: {
      position: 'center',
      color: '#999',
      lineHeight: 30,
      fontSize: 18,
      fontWeight: 200
    },
    labelLine: {
      normal: {
        show: false
      }
    },
    data: []
  }

}

const lineChartOption = {
  color: COLOR_PLATE_8,
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: []
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: []
  },
  yAxis: {
    splitLine,
    type: 'value',
  },
  series: []
}

const barSeriesOpt = {
  type: 'bar',
  barWidth: '20%',
}

const lineSeriesOpt = {
  type: 'line',
  label: {
    normal: {
      show: true,
      position: 'top'
    }
  },
}

export { volumnLineChartOption, percentBarChartOption, barSeriesOpt, pieChartOption, lineChartOption, lineSeriesOpt };

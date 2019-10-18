import 'regenerator-runtime/runtime';
import 'core-js/stable';

import '@styles/common.less';
import 'antd/dist/antd.css';

import '@utils';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

let CONFIG = window.CONFIG;

CONFIG.pagination = {
  pageSizeOptions: ['10', '20', '40', '80'],
  currentPageSize: parseInt(localStorage.getItem('currentPageSize'))
};

CONFIG.timeRanges = {
  '今天': [moment(), moment()],
  '本周': [moment().startOf('week'), moment().endOf('week')],
  '本月': [moment().startOf('month'), moment().endOf('month')],
  '近7天': [moment().subtract(7, 'days'), moment()],
  '近30天': [moment().subtract(30, 'days'), moment()],
}

CONFIG.formItemLayout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 17
  }
};

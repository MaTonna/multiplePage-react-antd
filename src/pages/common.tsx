import 'regenerator-runtime/runtime';
import 'core-js/stable';

import '@styles/common.less';
import 'antd/dist/antd.css';

import '@utils';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

CONFIG.pagination = {
  pageSizeOptions: ['10', '20', '40', '80'],
};

CONFIG.formItemLayout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 17
  }
};

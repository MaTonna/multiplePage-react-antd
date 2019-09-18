import 'regenerator-runtime/runtime';
import 'core-js/stable';

import '@styles/common.less';
import 'antd/dist/antd.css';

import '@utils';

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

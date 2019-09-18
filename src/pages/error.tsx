import React from 'react';
import ReactDOM from 'react-dom';
import '@styles/error.less';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
const config = {
  403: {
    img: `${CONFIG.resourcePath}/images/403.svg`,
    title: '403',
    desc: '抱歉，你无权访问该页面'
  },
  404: {
    img: `${CONFIG.resourcePath}/images/404.svg`,
    title: '404',
    desc: '抱歉，你访问的页面不存在'
  },
  500: {
    img: `${CONFIG.resourcePath}/images/500.svg`,
    title: '500',
    desc: '抱歉，服务器出错了'
  },
  normal: {
    img: `${CONFIG.resourcePath}/images/500.svg`,
    title: 'error',
    desc: CONFIG.option.desc
  }
};
const error = CONFIG.option.type ? config[CONFIG.option.type] : config['normal'];
ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <div className="exception">
      <div className="imgBlock">
        <div className="imgEle" style={{ backgroundImage: `url(${error.img})` }} />
      </div>
      <div className="content">
        <h1>{error.title}</h1>
        <div className="desc">{error.desc}</div>
        <div className="actions">
          <a href="/index.htm">
            <button type="button" className="ant-btn ant-btn-primary">
              <span>返回首页</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  </ConfigProvider>,
  document.getElementById('root')
);

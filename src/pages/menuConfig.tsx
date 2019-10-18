/*
 * @Description: 菜单配置
 * @Author: xiaoya
 * @Date: 2019-10-17 12:01:40
 * @Last Modified by: xiaoya
 * @Last Modified time: 2019-10-18 14:28:17
 */

import React, { Component } from 'react';
import { Icon } from 'antd';

// 异步按需加载component
const asyncComponent = (getComponent: any) => {
  return class AsyncComponent extends Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(({ default: Component }) => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }
    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  };
};

const menuConfig = {
  '首页': {
    shouldShow: false,
    path: '/myIndex',
    title: '首页',
    component: asyncComponent(() =>
      import(/* webpackChunkName: "myIndex" */ './myIndex')
    )
  },
  '仪表盘': {
    path: '/dashBoard',
    title: '仪表盘',
    icon: <Icon className="menu-icon" type="area-chart" />,
    component: asyncComponent(() =>
      import(/* webpackChunkName: "dashBoard" */ './customer/dashBoard')
    )
  },
  '联系小记查询': {
    path: '/contactRecordQuery',
    title: '联系小记查询',
    icon: <Icon className="menu-icon" type="form" />,
    component: asyncComponent(() =>
      import(/* webpackChunkName: "contactRecordQuery" */ './customer/contactRecordQuery')
    )
  },
  '手机号查询': {
    icon: '',
    path: '/customerCellQuery',
    title: '手机号查询',
    component: asyncComponent(() =>
      import(/* webpackChunkName: "customerCellQuery" */ './customer/customerCellQuery')
    )
  },
  '客户关联申请': {
    icon: '',
    path: '/customerInvolvedApply',
    title: '客户关联申请',
    component: asyncComponent(() =>
      import(/* webpackChunkName: "customerInvolvedApply" */ './customer/customerInvolvedApply')
    )
  },
  '会员转移至销售': {
    icon: '',
    path: '/userMoveToStaff',
    title: '会员转移至销售',
    component: asyncComponent(() =>
      import(/* webpackChunkName: "userMoveToStaff" */ './customer/userMoveToStaff')
    )
  },
  '业绩查询': {
    icon: '',
    path: '/orderQuery',
    title: '业绩查询',
    component: asyncComponent(() =>
      import(/* webpackChunkName: "orderQuery" */ './order/orderQuery')
    )
  }
}

export default menuConfig;

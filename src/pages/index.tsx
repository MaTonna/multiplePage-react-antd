import React, { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ConfigProvider, Layout, Menu, Dropdown } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import menuConfig from './menuConfig';
import '@styles/common.less';
import 'core-js/modules/es.promise';
import 'core-js/modules/es.array.iterator';
let history = createBrowserHistory({
  forceRefresh: false
});
window.globHistory = history;
window.gotoPage = function (obj: {}) {
  let newObj = obj;
  newObj['pathname'] = '/index' + obj['pathname'];
  history.push(newObj);
};

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const initialState = {
  currentLoc: '', // 当前路由名
  topMenu: '', // 顶部导航
  sideMenuList: [], // 侧边导航列表
  collapseMenu: [], // 打开submenu的列表
  collapseIconType: 'menu-fold',
  hasSideMenu: true,
  topMenuList: []
};

type State = Readonly<typeof initialState>;

class Index extends Component<any, State> {
  readonly state: State = initialState;

  menuItemObj = {};

  userInfoMenuList = [
    {
      code: 'refreshAuths',
      name: '刷新权限'
    },
    {
      code: 'exitLogin',
      name: '退出登录'
    }
  ];

  componentDidMount() {
    this.getTopMenuList();
  }

  changeTopMenu(item: { key: string }): void {
    this.setState(
      {
        topMenu: item.key
      }
    );
  }

  openMenu(openKeys: { key: string }): void {
    const { collapseMenu } = this.state;
    const id = openKeys.key;
    const index = collapseMenu.indexOf(id);
    // 如果能在打开的ids里找到，就删除这个id，否则就添加进去
    if (index > -1) {
      collapseMenu.splice(index, 1);
    } else {
      collapseMenu.push(id);
    }
    this.setState({
      collapseMenu
    });
  }

  changeSideMenu(item: { key: string }): void {
    this.setState({
      currentLoc: item.key
    }, () => {
      this.getSideMenuList();
    });
  }

  getMenuItemDom(menu: any): ReactNode {
    if (menu.component) {
      this.menuItemObj = {
        ...this.menuItemObj,
        ...{ ['/index' + menu.path]: menu.component }
      };
    }

    return menu.shouldShow !== false && <Menu.Item key={menu.path}>
      {menu.icon}
      <Link to={'/index' + menu.path}>{menu.title}</Link>
    </Menu.Item>
  }

  getTopMenuList() {
    const menuList = [{ code: 'manager1', title: '管理1' }, { code: 'manager2', title: '管理2' }]
    const topMenuList = menuList.map(item => {
      return <Menu.Item key={item.code}>
        {item.title}
      </Menu.Item>
    })
    this.setState({
      topMenuList
    }, () => {
      this.getSideMenuList();
    })
  }

  getSideMenuList(hasSideMenu?: boolean): void {
    const menuList = ['首页', '仪表盘', '联系小记查询', '手机号查询', '客户关联申请', '会员转移至销售', '业绩查询'];
    let sideMenuList = menuList.map((item: any) => {
      const menu = menuConfig[item] || {};
      if (menu.children) {
        return (
          <SubMenu
            key={menu.path}
            title={
              <span>
                {menu.icon}
                <span>{menu.title}</span>
              </span>
            }
            onTitleClick={({ key }) => this.openMenu({ key })}
          >
            {menu.children.map((item: any) => {
              return this.getMenuItemDom(item);
            })}
          </SubMenu>
        );
      } else {
        return this.getMenuItemDom(menu);
      }
    });
    this.setState({
      sideMenuList,
      hasSideMenu
    });
  }

  changeUserMenu({ key }): void {
    switch (key) {
      case 'refreshAuths':
        break;
      case 'exitLogin':
        break;
      default:
        break;
    }
  }

  render(): ReactNode {
    const {
      sideMenuList,
      topMenu,
      currentLoc,
      collapseMenu,
      collapseIconType,
      topMenuList
    } = this.state;
    const { menuItemObj, userInfoMenuList } = this;
    const isUnfold = collapseIconType !== 'menu-fold';
    const routers = Object.keys(menuItemObj).map((path) => {
      return <Route exact path={path} key={path} component={menuItemObj[path]} />;
    });
    const userInfoDropdown = (
      <Menu onClick={this.changeUserMenu.bind(this)}>
        {userInfoMenuList.map((item) => {
          return <Menu.Item key={item.code}>{item.name}</Menu.Item>;
        })}
      </Menu>
    );
    return (
      <Router history={window.globHistory}>
        <ConfigProvider locale={zhCN}>
          <Layout className="layout-wrap">
            <Header className="header">
              <div
                className="logo-wrap"
                style={{ width: isUnfold ? '80px' : '295px' }}
              >
                <i className="logo" />
                {!isUnfold && '彩虹CRM'}
              </div>
              <Menu
                className="menu"
                theme="light"
                mode="horizontal"
                selectedKeys={[topMenu]}
                onClick={this.changeTopMenu.bind(this)}
              >
                {topMenuList}
              </Menu>
              <Dropdown
                trigger={['click']}
                overlay={userInfoDropdown}
                placement="bottomCenter"
              >
                <div className="user-info">
                  <img
                    src={window.CONFIG.loginUserLogo}
                    className="user-logo"
                  />
                  <span className="user-name">
                    {window.CONFIG.username}
                  </span>
                </div>
              </Dropdown>
            </Header>
            <Layout>
              <Sider className="side-menu" width={295}>
                <Menu
                  mode="inline"
                  selectedKeys={[currentLoc]}
                  openKeys={collapseMenu}
                  inlineCollapsed={true}
                  onClick={(item) => this.changeSideMenu(item)}
                >
                  {sideMenuList}
                </Menu>
              </Sider>
              <Layout className="layout-content-wrap">
                <Content>
                  <Switch>{routers}</Switch>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </ConfigProvider>
      </Router>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));

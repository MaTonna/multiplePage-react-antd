import React, { ReactNode } from 'react';

import Side from './side';

import { Layout, Breadcrumb, Menu, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
const { Header, Content } = Layout;

interface IProps {
  children: ReactNode;
  selected?: string[];
  breadcrumbs?: string[];
}
const initialState = {
  menuList: [],
  topMenuList: [],
  sideMenuSelected: [],
  topMenuMap: {},
  changeBranch: {
    visible: false,
    selected: '',
    defaultId: '',
    options: [],
  },
  topKey: T.getParamName('topId'),
};
type State = Readonly<typeof initialState>;
class BasicLayout extends React.Component<IProps, State> {

  readonly state: State = initialState;

  handleHeaderMenuSelect = ({ key }) => {
    this.setState(
      {
        topKey: key,
      },
      () => {
        this.getSideMenuList();
      }
    );
  };

  initMenu = (): void => {

    const topMenuList = [{ id: 1, topMenuName: '顶部菜单1' }, { id: 2, topMenuName: '顶部菜单2' }];
    let topMenuMap = {};
    topMenuList.forEach((item: any) => {
      topMenuMap[item.id] = item.topMenuName;
    });
    this.setState(
      {
        topMenuList,
        topMenuMap,
      },
      () => {
        this.getSideMenuList();
      }
    );

  };

  getSideMenuList = (): void => {
    const sortMenuList = [{ enabled: true, sortMenuName: '侧边栏1', sortMenuHref: 'www.123.com' }];
    const menuList = sortMenuList.map((menu: any) => {
      if (menu.enabled) {
        return {
          title: menu.sortMenuName,
          link: menu.sortMenuHref + '?topId=' + this.state.topKey,
        };
      }
    });
    this.setState({
      menuList,
    });
  };

  componentDidMount = () => {
    this.initMenu();
  };

  render() {
    const { children, breadcrumbs } = this.props;
    const { menuList, topMenuList, topKey, topMenuMap } = this.state;
    return (
      <ConfigProvider locale={zhCN}>
        <Layout style={{ height: '100vh' }}>
          <Side menuList={menuList} topKey={topKey} topMenuMap={topMenuMap} />
          <Layout>
            <Header className="layout-header" style={{ background: '#fff', padding: '0 20px' }}>
              <Menu
                className="menu-list"
                selectedKeys={[this.state.topKey]}
                mode="horizontal"
                onSelect={this.handleHeaderMenuSelect}
              >
                {topMenuList.map((menu: { id: string; topMenuName: string }) => {
                  return (
                    <Menu.Item key={menu.id} className="menu-list-item">
                      {menu.topMenuName}
                    </Menu.Item>
                  );
                })}
              </Menu>
            </Header>
            {breadcrumbs && (
              <Breadcrumb>
                {breadcrumbs.map((item) => (
                  <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
                ))}
              </Breadcrumb>
            )}

            <Content
              className="layout-content"
              style={{
                position: 'relative',
                margin: '10px 10px 0',
                overflow: 'auto',
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    );
  }
}

export default BasicLayout;

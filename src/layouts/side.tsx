import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Layout, Form, Menu } from 'antd';
const { Sider } = Layout;

let siderCollapsed = false;
// 记录左侧边栏 展开-收起
if (!localStorage.hasOwnProperty('siderCollapsed')) {
  localStorage.setItem('siderCollapsed', 'false');
} else {
  siderCollapsed = localStorage.getItem('siderCollapsed') === 'true';
}

interface Props extends FormComponentProps {
  // selected: string[]
  menuList: any[];
  topKey: string;
  topMenuMap: {};
}
class UserMenu extends React.Component<Props, any> {
  state = {
    changePswVisible: false,
    collapsed: siderCollapsed,
    selected: [],
  };

  componentDidMount() {
    this.setHighlight();
  }

  UNSAFE_componentWillReceiveProps(props: any) {
    if (props.menuList.length) {
      this.setHighlight(props.menuList);
    }
  }

  setHighlight = (menuList?: []) => {
    let currentMenuId = [];
    const menuListArr = menuList || this.props.menuList
    for (let i = 0; i < menuListArr.length; i++) {
      const item = menuListArr[i];
      if (item.link === window.location.href) {
        currentMenuId = [item.title];
        this.setState({
          selected: currentMenuId,
        });
        return;
      }
    }
  }

  // 左侧边栏 展开-收起
  setCollapse = () => {
    let collapsed: boolean = !this.state.collapsed;
    this.setState({ collapsed }, () => {
      localStorage.setItem('siderCollapsed', '' + collapsed);
    });
  };

  getLogo = () => {
    const imgUrl = 'logo.png';
    return T.getImg(imgUrl);
  };
  getTopName = () => {
    const topKey = this.props.topKey;

    return this.props.topMenuMap[topKey] || '工作平台';
  };

  render() {
    const { selected } = this.state;
    return (
      <Sider
        className="layout-sider"
        id="layoutSider"
        width={256}
        trigger={null}
        collapsedWidth={10}
        collapsed={this.state.collapsed}
        style={{ overflowY: 'auto' }}
      >
        <div className="logo-wrap">
          <img className="logo-img" src={this.getLogo()} />
          <div className="sitename-wrap">
            <h1 className="sitename">{this.getTopName()}</h1>
          </div>
        </div>
        <div className="btn-group">
          <i className="btn-trigger" onClick={this.setCollapse} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selected}
        // onSelect={this.handleSiderMenuSelect}
        >
          {this.props.menuList.map((item) => {
            return (
              <Menu.Item key={item.title}>
                <a href={item.link || ''}>
                  <span>{item.title}</span>
                </a>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
    );
  }
}

export default Form.create<Props>()(UserMenu);

import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';

import { ICON_FONTS_URL } from '../config/constants';
import Link from 'umi/link';
import styles from './leftMenuList.less';

const { SubMenu } = Menu;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});

class LeftMenuList extends Component<any> {
  handleClick = value => {
    this.props.dispatch({
      type: 'menu/clickMenuItem',
      payload: {
        current: value.key,
        openKeys: [value.keyPath[1]],
      },
    });
  };
  onOpenChange = (openKeys: string[]) => {
    openKeys = openKeys.length > 0 ? openKeys.slice(-1) : [];
    // TODO:暂时不做点击`menu`切换路由操作
    this.props.dispatch({
      type: 'menu/changeOpen',
      payload: {
        openKeys,
      },
    });
  };
  componentDidMount() {
    const { router, menus } = this.props;
    //根据路由匹配菜单状态
    const pathname = router.location.pathname;
    const result = this.matchCurrentRouter(menus, pathname);
    this.props.dispatch({
      type: 'menu/changeOpen',
      payload: {
        ...result,
      },
    });
  }
  matchCurrentRouter = (menus, pathname) => {
    let current = '';
    let openKeys = [];
    for (let i = 0, len = menus.length; i < len; i++) {
      const menu = menus[i];
      if (menu.path === pathname) {
        current = menu.name;
        break;
      }
      if (menu.children && menu.children.length > 0) {
        const children = menu.children;
        for (let j = 0; j < children.length; j++) {
          const child = children[j];
          if (child.path === pathname) {
            current = child.name;
            openKeys = [menu.name];
            break;
          }
        }
      }
    }
    return {
      current,
      openKeys,
    };
  };

  renderLeftMenu = () => {
    const { menus, rootKeys } = this.props;
    return menus.map(leftMenuItem => {
      return (
        <SubMenu
          key={leftMenuItem.name}
          className={[`${styles.no_background}`, `${styles.sub_menu_list}`].join(' ')}
          title={
            <span>
              <Icon type="setting" />
              <span className={`${styles.icon_title}`}>{leftMenuItem.name}</span>
              <IconFont
                className={`${styles.icon_down}`}
                type={rootKeys[0] == leftMenuItem.name ? 'icon-down1' : 'icon-up1'}
              />
            </span>
          }
        >
          {leftMenuItem.children && leftMenuItem.children.length > 0
            ? leftMenuItem.children.map(item => {
                return (
                  <Menu.Item key={item.name}>
                    <Link className={`${styles.menu_item}`} to={item.path}>
                      {item.name}
                    </Link>
                  </Menu.Item>
                );
              })
            : ''}
        </SubMenu>
      );
    });
  };

  render() {
    const { rootKeys, current, openKeys } = this.props;
    const LeftMenu = this.renderLeftMenu();
    return (
      <Menu
        mode="inline"
        defaultOpenKeys={[rootKeys[0]]}
        defaultSelectedKeys={openKeys}
        onClick={this.handleClick}
        selectedKeys={[current]}
        openKeys={openKeys}
        onOpenChange={this.onOpenChange}
        style={{ width: 256 }}
        className={[`${styles.no_background}`, `${styles.menu_bar}`].join(' ')}
      >
        {LeftMenu}
      </Menu>
    );
  }
}

const mapState = ({ menu, router }) => ({
  ...menu,
  router,
});

export default connect(mapState)(LeftMenuList);

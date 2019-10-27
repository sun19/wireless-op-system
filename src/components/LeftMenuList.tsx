import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { connect } from 'dva';

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
        defaultSelectedKeys: value.key,
        openKeys: [value.keyPath[1]],
      },
    });
  };
  onOpenChange = (openKeys: any) => {
    const { rootKeys } = this.props;
    //最近展开的`submenu`.
    const latestOpenKey = openKeys.find((key: any) => rootKeys[0].indexOf(key) === -1);
    //关掉
    if (rootKeys.indexOf(latestOpenKey) === -1) {
      this.props.dispatch({
        type: 'menu/changeOpen',
        payload: {
          openKeys,
        },
      });
    } else {
      this.props.dispatch({
        type: 'menu/changeOpen',
        payload: {
          openKeys: latestOpenKey ? [latestOpenKey] : [],
        },
      });
    }
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
            ? leftMenuItem.children.map(childrens => {
                return (
                  <Menu.Item key={childrens.name}>
                    <Link className={`${styles.menu_item}`} to={childrens.path}>
                      {childrens.name}
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
    const { defaultSelectedKeys, rootKeys, current } = this.props;
    const LeftMenu = this.renderLeftMenu();
    return (
      <Menu
        mode="inline"
        defaultOpenKeys={[rootKeys[0]]}
        defaultSelectedKeys={[defaultSelectedKeys]}
        onClick={this.handleClick}
        selectedKeys={[current]}
        openKeys={rootKeys[0]}
        onOpenChange={this.onOpenChange}
        style={{ width: 256 }}
        className={[`${styles.no_background}`, `${styles.menu_bar}`].join(' ')}
      >
        {LeftMenu}
      </Menu>
    );
  }
}

const mapState = ({ menu }) => menu;

export default connect(mapState)(LeftMenuList);

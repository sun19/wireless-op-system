import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { ICON_FONTS_URL } from '../config/constants';
import { LEFT_MENUS } from '../config/menus';
import router from 'umi/router';
import Link from 'umi/link';
import styles from './leftMenuList.less';
const leftMenu = LEFT_MENUS;
const { SubMenu } = Menu;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});
let rootKeys = leftMenu.map(item => item.name);

class LeftMenuList extends Component {
  // rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
  rootSubmenuKeys = rootKeys;
  showUp = false;
  state = {
    openKeys: [rootKeys[0]],
    current: '1',
  };
  handleClick = value => {
    // console.log(value);
    this.setState({
      current: value.key,
    });
    let leftpath = leftMenu.find(() => {
      return { name: value.key };
    });
    this.setState({
      openKeys: [value.keyPath[1]],
    });
    // console.log(this.state.openKeys);
  };
  onOpenChange = (openKeys: any) => {
    this.showUp = openKeys.length > 0 ? true : false;
    const latestOpenKey = openKeys.find((key: any) => this.state.openKeys.indexOf(key) === -1);
    // console.log(latestOpenKey, this.rootSubmenuKeys.indexOf(latestOpenKey) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    // console.log(this.state.openKeys);
    return (
      <Menu
        mode="inline"
        defaultOpenKeys={[rootKeys[0]]}
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        style={{ width: 256 }}
        className={[`${styles.no_background}`, `${styles.menu_bar}`].join(' ')}
      >
        {leftMenu.map(leftMenuItem => {
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
                    type={this.state.openKeys[0] == leftMenuItem.name ? 'icon-down1' : 'icon-up1'}
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
                        {/* <span className={`${styles.menu_item}`}>{childrens.name}</span> */}
                      </Menu.Item>
                    );
                  })
                : ''}
            </SubMenu>
          );
        })}
      </Menu>
    );
  }
}

export default LeftMenuList;

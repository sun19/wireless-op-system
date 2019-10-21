import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

import styles from './leftMenuList.less';

const { SubMenu } = Menu;

class LeftMenuList extends Component {
  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  state = {
    openKeys: ['sub1'],
  };

  onOpenChange = (openKeys: any) => {
    const latestOpenKey = openKeys.find((key: any) => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    return (
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        style={{ width: 256 }}
        className={[`${styles.no_background}`, `${styles.menu_bar}`].join(' ')}
      >
        <SubMenu
          key="sub1"
          className={[`${styles.no_background}`, `${styles.sub_menu_list}`].join(' ')}
          title={
            <span>
              <Icon type="setting" />
              <span>系统设置</span>
            </span>
          }
        >
          <Menu.Item key="1">
            <span
              className={[`${styles.menu_item}`, `${styles.menu_item_underline_active}`].join(' ')}
            >
              用户管理
            </span>
          </Menu.Item>
          <Menu.Item key="2">
            <span className={[`${styles.menu_item}`].join(' ')}>人员类型</span>
          </Menu.Item>
          <Menu.Item key="3" className={styles.menu_item}>
            <span className={[`${styles.menu_item}`].join(' ')}>信息牌设置</span>
          </Menu.Item>
          <Menu.Item key="4" className={styles.menu_item}>
            <span className={[`${styles.menu_item}`].join(' ')}>超级管理员设置</span>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default LeftMenuList;

import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { ICON_FONTS_URL } from '../config/constants';
import styles from './leftMenuList.less';

const { SubMenu } = Menu;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});
class LeftMenuList extends Component {
  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
  showUp = false;
  state = {
    openKeys: ['sub1'],
    current: '1',
  };
  handleClick = value => {
    // console.log(value);
    this.setState({
      current: value.key,
    });
    //  router.push('/index');
  };
  onOpenChange = (openKeys: any) => {
    this.showUp = openKeys.length > 0 ? true : false;
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
        defaultOpenKeys={['sub1']}
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        style={{ width: 256 }}
        className={[`${styles.no_background}`, `${styles.menu_bar}`].join(' ')}
      >
        {/* <For >

        </For> */}
        <SubMenu
          key="sub1"
          className={[`${styles.no_background}`, `${styles.sub_menu_list}`].join(' ')}
          title={
            <span>
              <Icon type="setting" />
              <span>大屏展示</span>
              <IconFont
                className={`${styles.icon_down}`}
                type={this.showUp === false ? 'icon-down1' : 'icon-up1'}
              />
            </span>
          }
        >
          <Menu.Item key="1">
            <span className={`${styles.menu_item}`}>
              {/* `${styles.menu_item_underline_active}` */}
              大屏展示
            </span>
          </Menu.Item>
          <Menu.Item key="2">
            <span className={[`${styles.menu_item}`].join(' ')}>数据</span>
          </Menu.Item>
          <Menu.Item key="3" className={styles.menu_item}>
            <span className={[`${styles.menu_item}`].join(' ')}>主界面</span>
          </Menu.Item>
          <Menu.Item key="4" className={styles.menu_item}>
            <span className={[`${styles.menu_item}`].join(' ')}>应用</span>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default LeftMenuList;

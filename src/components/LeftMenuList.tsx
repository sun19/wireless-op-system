import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import * as _ from 'lodash';
import { getAllMenues, getLeftMenues } from '../pages/login/login.service';

import { ICON_FONTS_URL } from '../config/constants';
import Link from 'umi/link';
import styles from './leftMenuList.less';

const { SubMenu } = Menu;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});

class LeftMenuList extends Component<any> {
  constructor(props) {
    super(props);
    this.state = {
      names:[]
    }
  }
  async getMenus() {
    let user = {
      roleId: localStorage.getItem('userMessage'),
    };
    let data = await getLeftMenues(user);
    const current = localStorage.getItem('current');
    const openKeys = JSON.parse(localStorage.getItem('openKeys') || '[]');
    this.props.dispatch({
      type: 'menu/changeOpen',
      payload: {
        menus: data.result || [],
        current,
        openKeys,
      },
    });
  }
  handleClick = value => {
    const { menus, rootKeys } = this.props;

    let key = value.keyPath
    let title = []
    key.map(item=>{
      const name=_.find(this.state.names,{id:item})
      title.push(name.name)
    })
    this.props.dispatch({
      type: 'menu/clickMenuItem',
      payload: {
        title: _.reverse(title),
        current: value.key,
        openKeys: value.keyPath,
      },
    });
    localStorage.setItem('current', value.key);
    localStorage.setItem('openKeys', JSON.stringify(value.keyPath));
  };
  onOpenChange = (openKeys: string[]) => {
    this.props.dispatch({
      type: 'menu/changeOpen',
      payload: {
        openKeys,
      },
    });
    localStorage.setItem('openKeys', JSON.stringify(openKeys));
  };
  componentDidMount() {
    this.getMenus();
    const { menus, rootKeys } = this.props;

    const names = [];
    getId(menus);
    function getId(list) {
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (item.child && item.child.length > 0) {
          names.push({ name: item.name, id: item.id });
          getId(item.child);
        } else {
          names.push({ name: item.name, id: item.id});
        }
      }
    }
    this.setState({ names})
  }
  matchCurrentRouter = (menus, pathname) => {
    let { current = '', openKeys = [] } = this.props;
    for (let i = 0, len = menus.length; i < len; i++) {
      const menu = menus[i];
      if (menu.path === pathname) {
        current = menu.id;
        break;
      }
      if (menu.child && menu.child.length > 0) {
        const children = menu.child;
        for (let j = 0; j < children.length; j++) {
          const child = children[j];
          if (child.path === pathname) {
            current = child.id;
            openKeys = [menu.id];
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

    return menus.map((leftMenuItem, index) => {
      return (
        <SubMenu
          key={leftMenuItem.id}
          className={[`${styles.no_background}`, `${styles.sub_menu_list}`].join(' ')}
          title={
            <span>
              <IconFont type={leftMenuItem.icon} />
              <span className={`${styles.icon_title}`}>
                {leftMenuItem.name} {rootKeys[index] == leftMenuItem.id}
              </span>
            </span>
          }
        >
          {leftMenuItem.child && leftMenuItem.child.length > 0
            ? leftMenuItem.child.map(item => {
                item.child && leftMenuItem.child.length > 0;

                if (item.child && item.child.length > 0) {
                  return (
                    <SubMenu key={item.id} title={`${item.name}  `} className="sub_menus_second">
                      {item.child.map(itemChild => {
                        if (itemChild.child && itemChild.child.length > 0) {
                          return (
                            <SubMenu
                              key={itemChild.id}
                              title={`${itemChild.name}  `}
                              className="sub_menus_second"
                            >
                              {itemChild.child.map(lastChild => {
                                return (
                                  <Menu.Item key={lastChild.id}>
                                    <Link className={`${styles.menu_item}`} to={lastChild.path}>
                                      {lastChild.name}
                                    </Link>
                                  </Menu.Item>
                                );
                              })}
                            </SubMenu>
                          );
                        } else {
                          return (
                            <Menu.Item key={itemChild.id}>
                              <Link className={`${styles.menu_item}`} to={itemChild.path}>
                                {itemChild.name}
                              </Link>
                            </Menu.Item>
                          );
                        }
                      })}
                    </SubMenu>
                  );
                } else {
                  return (
                    <Menu.Item key={item.id}>
                      <Link className={`${styles.menu_item}`} to={item.path}>
                        {item.name}
                      </Link>
                    </Menu.Item>
                  );
                }
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
        // defaultOpenKeys={openKeys}
        // defaultSelectedKeys={openKeys}
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

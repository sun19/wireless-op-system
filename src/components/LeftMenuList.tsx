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
  constructor(props) {
    super(props);
    this.state = {
      // openKeys: ['设置','管理员设置'],
    };
  }
  handleClick = value => {
    this.props.dispatch({
      type: 'menu/clickMenuItem',
      payload: {
        current: value.key,
        openKeys: value.keyPath,
      },
    });
  };
  onOpenChange = (openKeys: string[]) => {
    // openKeys = openKeys.length > 0 ? openKeys.slice(-1) : [];
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
    // console.log(menus)
    let { current = '', openKeys = [] } = this.props;
    for (let i = 0, len = menus.length; i < len; i++) {
      const menu = menus[i];
      if (menu.path === pathname) {
        current = menu.id;
        break;
      }
      if (menu.children && menu.children.length > 0) {
        const children = menu.children;
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
    const { menus, rootKeys, openKeys } = this.props;
    return menus.map((leftMenuItem, index) => {
      // console.log(leftMenuItem.name)
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
              {/* <IconFont
                className={`${styles.icon_down}`}
                type={openKeys == leftMenuItem.name ? 'icon-down1' : 'icon-up1'}
              /> */}
            </span>
          }
        >
          {leftMenuItem.children && leftMenuItem.children.length > 0
            ? leftMenuItem.children.map(item => {
                item.children && leftMenuItem.children.length > 0;
                // console.log(item.children, 'item.children');
                if (item.children && item.children.length > 0) {
                  return (
                    <SubMenu key={item.id} title={`${item.name}  `} className='sub_menus_second'>
                      {item.children.map(child => {
                      // if(child.path){
                        return (
                          <Menu.Item key={child.id}>
                              <Link className={`${styles.menu_item}`} to={child.path}>
                                {child.name}
                              </Link>
                          </Menu.Item>
                        );
                      // }else{
                      //   return (
                      //     <Menu.Item key={child.id}>
                      //       <Link className={`${styles.menu_item}`} to=''>
                      //         {child.name}
                      //       </Link>
                      //     </Menu.Item>
                      //   );
                      // }
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
        defaultOpenKeys={openKeys}
        defaultSelectedKeys={openKeys}
        onClick={this.handleClick}
        selectedKeys={[current]}
        // openKeys={openKeys}
        // onOpenChange={this.onOpenChange}
        style={{ width: 256 }}
        className={[`${styles.no_background}`, `${styles.menu_bar}`].join(' ')}
      >
        {LeftMenu}
      </Menu>
    );
  }
}

const mapState = ({ menu, router, }) => ({
  ...menu,
  router,
});

export default connect(mapState)(LeftMenuList);

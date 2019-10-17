import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import styles from './index.css';

import MenuItem from '../components/MenuItem';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const LeftMenuLayout: React.FC = props => {
  return (
    <Sider width={200} className={styles.siderBar}>
      <Menu mode="inline" className={styles.sideMenu}>
        {[1, 2, 3].map(() => (
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="laptop" />
                subnav 2
              </span>
            }
          >
            <Menu.Item key="5">option5</Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </SubMenu>
        ))}
      </Menu>
    </Sider>
  );
};

export default LeftMenuLayout;

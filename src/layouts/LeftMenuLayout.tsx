import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import styles from './index.css';

import MenuList from '../components/MenuList';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const LeftMenuLayout: React.FC = props => {
  return (
    <Sider width={200} className={styles.siderBar}>
      <Menu mode="inline" className={styles.sideMenu}>
        <MenuList />
        <MenuList />
        <MenuList />
      </Menu>
    </Sider>
  );
};

export default LeftMenuLayout;

import React from 'react';
import { Layout } from 'antd';

import MenuBreadCrumb from './menuBreadCrumb';
import RolePanel from './RolePanel';
import styles from './topHeader.less';

const { Header } = Layout;

export default class TopHeader extends React.Component {
  render() {
    return (
      <Header className={[`${styles.no_background}`].join(' ')}>
        <MenuBreadCrumb />
        <RolePanel />
      </Header>
    );
  }
}

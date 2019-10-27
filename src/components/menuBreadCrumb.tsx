import React from 'react';
import { Breadcrumb } from 'antd';
import NavLink from 'umi/navlink';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';

import styles from './menuBreadCrumb.less';

export default class MenuBreadCrumb extends React.Component<any, any> {
  render() {
    return (
      <Breadcrumb separator=">" className={styles.bread_box}>
        <Breadcrumb.Item className={styles.prev_item}>大屏展示</Breadcrumb.Item>
        <Breadcrumb.Item className={styles.current_item}>大屏展示</Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}

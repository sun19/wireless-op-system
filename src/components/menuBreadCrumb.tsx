import React from 'react';
import { Breadcrumb } from 'antd';

import styles from './menuBreadCrumb.less';

export default class MenuBreadCrumb extends React.Component {
  render() {
    return (
      <Breadcrumb separator=">" className={styles.bread_box}>
        <Breadcrumb.Item className={styles.prev_item}>大屏展示</Breadcrumb.Item>
        <Breadcrumb.Item className={styles.current_item}>大屏展示</Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}

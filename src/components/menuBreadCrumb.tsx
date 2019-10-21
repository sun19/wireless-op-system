import React from 'react';
import { Breadcrumb } from 'antd';

import styles from './menuBreadCrumb.less';

export default class MenuBreadCrumb extends React.Component {
  render() {
    return (
      <Breadcrumb separator=">" className={styles.bread_box}>
        <Breadcrumb.Item className={styles.prev_item}>系统设置</Breadcrumb.Item>
        <Breadcrumb.Item className={styles.current_item}>人员类型</Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}

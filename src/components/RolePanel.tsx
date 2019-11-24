import React from 'react';
import { Icon } from 'antd';

import styles from './rolePanel.less';

export default class RolePanel extends React.Component {
  render() {
    return (
      <div className={styles.role_panel_box}>
        <span className={styles.role_panel_box_span}>管理员</span>
        <Icon type="down" />
      </div>
    );
  }
}

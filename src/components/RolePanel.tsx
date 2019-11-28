import React from 'react';
import { Icon, Menu, Dropdown } from 'antd';
import request, { format } from '@/utils/request';
import router from 'umi/router';



import styles from './rolePanel.less';


export default class RolePanel extends React.Component {

  async loginOut() {
    const resp = await request(
      'http://47.96.112.31:8086/jeecg-boot//intf/location/logout',
      {
        method: 'GET',
      },
    );
    if (resp.code === 200) {
      router.push('/login')
    }
  }
  render() {
    let menu = (
      <Menu>
        <Menu.Divider />
        <Menu.Item key="3"><span onClick={this.loginOut.bind()}>退出</span></Menu.Item>
      </Menu>
    );
    return (
      <div className={styles.role_panel_box}>
        <Dropdown overlay={menu} trigger={['click']}>
          <span className={styles.role_panel_box_span} >
            管理员<Icon className={styles.role_panel_box_span} type="down" />
          </span>
        </Dropdown>

      </div>
    );
  }
}

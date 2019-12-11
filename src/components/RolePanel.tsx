import React from 'react';
import { Icon, Menu, Dropdown, Form } from 'antd';
import request, { format } from '@/utils/request';
import router from 'umi/router';
import { UmiComponentProps } from '@/common/type';
import { connect } from 'dva';

import styles from './rolePanel.less';
// type StateProps = ReturnType<typeof mapState>;
type Props = UmiComponentProps;
type State = {
  userInfo: object;
};
class RolePanel extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      userInfo: {},
    };
    this.loginOut = this.loginOut.bind(this);
  }

  async loginOut() {
    let userData = JSON.parse(localStorage.getItem('usepass'));
    let token = localStorage.getItem('token');

    let data = {
      ...userData,
    };
    // ?username=${data.username}&password=${data.password}&roleId=${data.roleId}
    const resp = await request(`http://47.96.112.31:8086/jeecg-boot//intf/location/logout`, {
      method: 'GET',
      headers: { 'X-Access-Token': token },
    });
    if (resp.code === 200) {
      router.push('/login');
    }
  }
  componentDidMount() {
    const infoStr = localStorage.getItem('userinfo') || '{}';
    const info = JSON.parse(infoStr);
    this.setState({
      userInfo: info,
    });
  }
  render() {
    let menu = (
      <Menu>
        <Menu.Item key="3">
          {' '}
          <a target="_blank" rel="noopener" onClick={this.loginOut}>
            退出
          </a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className={styles.role_panel_box}>
        <Dropdown overlay={menu} trigger={['click']}>
          <span className={styles.role_panel_box_span}>
            {this.state.userInfo.name}
            <Icon className={styles.role_panel_box_span} type="down" />
          </span>
        </Dropdown>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(RolePanel);

const mapState = ({ commonState }) => {
  const resp = commonState;
  return {
    commonState: resp,
  };
};

export default connect(mapState)(WrappedNormalLoginForm);

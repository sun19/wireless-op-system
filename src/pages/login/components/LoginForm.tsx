import React from 'react';
import router from 'umi/router';
import { Form, Icon, Input, Row, Col, Radio, message } from 'antd';
import request from 'umi-request';
import { connect } from 'dva';

import { ICON_FONTS_URL } from '../../../config/constants';
import {
  getAllMap,
  getAllArea,
  getAllRoles,
  getAllLevels,
  getAllUserInfo,
  getAllFencingTypes,
} from '../login.service';
import { UmiComponentProps } from '@/common/type';
import styles from '../index.less';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});

interface State {
  value: number;
}

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps;

class NormalLoginForm extends React.Component<Props> {
  state: State;
  constructor(props: any) {
    super(props);
    this.state = {
      value: 1,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let data = {
          username: values.username,
          password: values.password,
        };
        this.showLoadingMessage();
        const resp = await request(
          `http://47.95.195.189:8086/jeecg-boot/intf/location/login?username=${data.username}&password=${data.password}`,
          {
            method: 'GET',
          },
        );
        if (resp.code === 200 && resp.success) {
          const token = resp.result.token;
          localStorage.setItem('token', token);
          await this.preFetchAllCommonState();
          router.push('/system-setting/customer-manager');
        } else {
          this.showErrorMessage('账号或密码输入不正常，登录失败');
        }
      }
    });
  }

  async preFetchAllCommonState() {
    const mapResp = await getAllMap();
    const areasResp = await getAllArea();
    const rolesResp = await getAllRoles();
    const levelsResp = await getAllLevels();
    const userInfoResp = await getAllUserInfo();
    const fencingTypesResp = await getAllFencingTypes();

    this.props.dispatch({
      type: 'commonState/update',
      payload: {
        allUserInfo: userInfoResp.result,
        allMap: mapResp.result,
        allRoles: rolesResp.result,
        allLevels: levelsResp.result,
        allFencingTypes: fencingTypesResp.result,
        allAreas: areasResp.result,
      },
    });
  }

  showLoadingMessage() {
    message.loading('努力登录中...', 0);
  }

  showMessage() {
    message.success('恭喜您，登录成功!', 1000);
  }

  showErrorMessage(msg: string) {
    message.error(msg, 1000);
  }

  componentWillUnmount() {
    message.destroy();
  }

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login_form">
        <div className={styles.login_title}>欢迎登录</div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('radio-group', {
              initialValue: 1,
              setFieldsValue: this.onChange,
            })(
              <Radio.Group>
                <Radio value={1}>
                  <span className={styles.rolename}>系统管理员 </span>
                </Radio>
                <Radio value={2}>
                  <span className={styles.rolename}>值班员</span>
                </Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(<Input prefix={<IconFont type="icon-user" />} placeholder="登录名" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(<Input prefix={<IconFont type="icon-key" />} type="password" placeholder="密码" />)}
          </Form.Item>
          <Form.Item>
            {/* <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button> */}
            <Row type="flex" justify="center" style={{ height: '100%' }}>
              <Col span={12}>
                {/* className={styles.login_btn} onClick={this.loginBtn()} */}
                <div className={styles.login_btn} onClick={this.handleSubmit}>
                  登录
                </div>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

const mapState = ({ commonState }) => {
  const resp = commonState;
  return {
    commonState: resp,
  };
};

export default connect(mapState)(WrappedNormalLoginForm);

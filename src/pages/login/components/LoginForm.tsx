import React from 'react';
import router from 'umi/router';
import { Form, Icon, Input, Row, Col, Radio, Button, Alert, message } from 'antd';
import request, { format } from '@/utils/request';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/lib/form';
import { BASE_API_URL } from '../../../config/constants';
import { ICON_FONTS_URL } from '../../../config/constants';
import {
  getAllMap,
  getAllArea,
  getAllRoles,
  getAllLevels,
  getAllUserInfo,
  getAllFencingTypes,
  getAllPosition,
  getAllSecretLevels,
} from '../login.service';
import { UmiComponentProps } from '@/common/type';
import styles from '../index.less';
import { ids } from 'konva/types/Node';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});

interface State {
  value: string;
  message?: string;
}

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormComponentProps;

class NormalLoginForm extends React.Component<Props> {
  state: State;
  constructor(props: any) {
    super(props);
    this.state = {
      value: '1',
      message: '',
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
          roleId: values.roleId,
        };

        this.showLoadingMessage();
        const resp = await request(
          `${BASE_API_URL}/jeecg-boot/intf/location/login?username=${data.username}&password=${data.password}&roleId=${data.roleId}`,
          {
            method: 'GET',
          },
        );
        if (resp.code === 200 && resp.success) {
          const token = resp.result.token;
          localStorage.setItem('token', token);
          await this.preFetchAllCommonState();
          localStorage.setItem('usepass', JSON.stringify(data));
          localStorage.setItem('userMessage', resp.result.userInfo.roleId);
          localStorage.setItem('userinfo', JSON.stringify(resp.result.userInfo));
          this.setState({ message: this.getDialog('success', '登录成功') });
          setTimeout(() => this.setState({ message: '' }), 3000);
          setTimeout(() => router.push('/big-screen/homepage'), 1000);

          // message.success(<span style={{ fontSize: '25px' }}>登录成功！</span>);
        } else {
          this.setState({ message: this.getDialog('error', '登录失败!请重新登录！') });
          setTimeout(() => this.setState({ message: '' }), 3000);
        }
      }
    });
  }
  getDialog = (data, message) => {
    if (data === 'success' || data === 'error') {
      return (
        <div className="login_message">
          <div className="login_message_box">
            <Icon type="check-circle" theme="filled" />
            {message}
          </div>
        </div>
      );
    }
  };
  async preFetchAllCommonState() {
    // const mapResp = await getAllMap();
    // const areasResp = await getAllArea();
    const rolesResp = await getAllRoles();
    // const levelsResp = await getAllLevels();
    // const userInfoResp = await getAllUserInfo();
    // const fencingTypesResp = await getAllFencingTypes();
    // const dutiesResp = await getAllPosition();
    // const secretsLevelsResp = await getAllSecretLevels();

    this.props.dispatch({
      type: 'commonState/update',
      payload: {
        // allUserInfo: userInfoResp.result,
        // allMap: mapResp.result,
        allRoles: rolesResp,
        // allLevels: levelsResp.result,
        // allFencingTypes: fencingTypesResp.result,
        // allAreas: areasResp.result,
        // allDuties: dutiesResp.result,
        // allSecretLevel: secretsLevelsResp.result,
      },
    });
  }

  showLoadingMessage() {
    // message.loading('努力登录中...');
  }

  // showErrorMessage(msg: string) {
  //   message.error(msg, 1000);
  // }
  componentDidMount() {
    this.preFetchAllCommonState();
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
    const { allRoles } = this.props;

    return (
      <React.Fragment>
        <div className={styles.login_form}>
          <div className={styles.login_title}>欢迎登录</div>
          <Form onSubmit={this.handleSubmit} className={styles.login_main}>
            <Form.Item>
              {getFieldDecorator('roleId', { rules: [] })(
                <div className={styles.redio_style}>
                  <Radio.Group>
                    {allRoles.map((res, index) => {
                      return (
                        <Radio value={res.id} key={index}>
                          <span className={styles.rolename} key={index}>
                            {res.roleName}{' '}
                          </span>
                        </Radio>
                      );
                    })}
                  </Radio.Group>
                </div>,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入登录名!' }],
              })(<Input prefix={<IconFont type="icon-user" />} placeholder="  登录名" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input
                  prefix={<IconFont type="icon-key" />}
                  type="password"
                  placeholder="  密码"
                />,
              )}
            </Form.Item>
            {this.state.message}
            <Form.Item>
              <Row type="flex" justify="center" style={{ height: '100%' }}>
                <Col span={12}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={this.handleSubmit}
                    className={styles.login_button}
                  >
                    登录
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </div>
      </React.Fragment>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

const mapState = ({ commonState }) => {
  const resp = commonState;
  return {
    commonState: resp,
    allRoles: commonState.allRoles,
  };
};

export default connect(mapState)(WrappedNormalLoginForm);

/**
 * title: 添加方式
 */
import React from 'react';
import { Form, Row, Col, Button, Input, Select, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import * as _ from 'lodash';
import router from 'umi/router';

import { WEBSOCKET, BASE_API_URL } from '../../../config/constants';
import ContentBorder from '../../../components/ContentBorder';
import { UmiComponentProps } from '@/common/type';
import { getAllPosition, getAllSecretLevels, getAllDepartment } from '@/pages/login/login.service';
import { addUser } from '../services';
import request from '@/utils/request';

import styles from './index.less';

const { Option } = Select;

interface FormProps extends FormComponentProps {}

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormProps;

interface State {
  name?: string;
  cardNo?: string;
  realTimeData?: any;
}

class UserAuths extends React.Component<Props, State> {
  ws: WebSocket;
  constructor(props) {
    super(props);
    this.state = {
      realTimeData: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  goBack = () => {
    this.props.form.resetFields();
    router.push('/user-manager/user-outside');
  };
  setupDuties = () => {
    const { allDuties } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form.Item label="职务">
        {getFieldDecorator('positionId', {
          rules: [
            {
              message: '请选择职务',
            },
          ],
          // initialValue: (allDuties && allDuties[0] && allDuties[0].id) || '',
        })(
          <Select
            getPopupContainer={triggerNode => triggerNode.parentElement}
            placeholder="请选择职务"
          >
            {allDuties &&
              allDuties.map((duty, index) => (
                <Option value={duty.id} key={index}>
                  {duty.name}
                </Option>
              ))}
          </Select>,
        )}
      </Form.Item>
    );
  };

  setupAllSecretLevel = () => {
    const { allSecretLevel } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form.Item label="保密等级">
        {getFieldDecorator('securityLevelId', {
          rules: [
            {
              message: '请选择保密等级',
            },
          ],
          // initialValue: (allSecretLevel && allSecretLevel[0] && allSecretLevel[0].id) || '',
        })(
          <Select
            getPopupContainer={triggerNode => triggerNode.parentElement}
            placeholder="请选择保密等级"
          >
            {allSecretLevel &&
              allSecretLevel.map((level, index) => (
                <Option value={level.id} key={index}>
                  {level.name}
                </Option>
              ))}
          </Select>,
        )}
      </Form.Item>
    );
  };

  async componentDidMount() {
    const dutiesResp = await getAllPosition();
    const secretsLevelsResp = await getAllSecretLevels();
    const allPositions = await getAllDepartment();
    this.props.dispatch({
      type: 'commonState/update',
      payload: {
        allDuties: dutiesResp.result,
        allPosition: allPositions,
        allSecretLevel: secretsLevelsResp.result,
      },
    });
    // this.connectWs();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    let msgText = nextProps.wsInfo;
    //身份证只接受`msgType`为1的数据
    if (msgText.msgType != '1') return;
    msgText = msgText.msgTxt;
    msgText = {
      name: msgText.name,
      sex: msgText.sex,
      address: msgText.address,
      cardNo: msgText.idnum,
    };
    this.setState({
      realTimeData: msgText,
    });
  }
  connectWs() {
    this.ws = new WebSocket('ws://47.96.112.31:8086/jeecg-boot/websocket/1');
    this.ws.onopen = () => {
      request.get('http://47.96.112.31:8086/jeecg-boot/intf/location/executeUserCard?status=true');
    };
    this.ws.onmessage = evt => {
      let msgText = JSON.parse(evt.data);
      //身份证只接受`msgType`为1的数据
      if (msgText.msgType != '1') return;
      msgText = msgText.msgTxt;
      msgText = {
        name: msgText.name,
        sex: msgText.sex,
        address: msgText.address,
        cardNo: msgText.idnum,
      };
      this.setState({
        realTimeData: msgText,
      });
    };
    this.ws.onclose = () => {
      request.get('http://47.96.112.31:8086/jeecg-boot/intf/location/executeUserCard?status=false');
    };
  }

  componentWillUnmount() {
    this.ws && this.ws.close();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        // console.error(err, values, 'err');
        message.error('填写信息有误 ', values);
        return;
      }
      let data = {
        isIn: '1',
        ...values,
      };
      const isSuccessed = await addUser(data);
      if (isSuccessed) {
        setTimeout(() => router.push('/user-manager/user-outside'), 1000);
      }
    });
  }

  render() {
    const props = this.props;
    const { getFieldDecorator } = props.form;
    const { allPosition } = this.props;

    // if (_.isEmpty(props.allDuties) || _.isEmpty(props.allSecretLevel)) return null;
    return (
      <ContentBorder className={styles.auth_root}>
        <Form
          layout="inline"
          labelAlign="right"
          style={{ marginTop: '0.57rem' }}
          onSubmit={this.handleSubmit}
        >
          <Row type="flex" justify="center" align="middle" className={styles.add}>
            <Col span={20}>
              <div className="auth__inner--container">
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="姓名">
                      {getFieldDecorator('name', {
                        rules: [
                          {
                            message: '请输入姓名',
                          },
                        ],
                        initialValue: this.state.realTimeData.name,
                      })(<Input placeholder="请输入姓名" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="身份证号">
                      {getFieldDecorator('cardNo', {
                        rules: [
                          {
                            message: '请输入身份证号',
                          },
                        ],
                        initialValue: this.state.realTimeData.cardNo,
                      })(<Input placeholder="请输入身份证号" />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="性别">
                      {getFieldDecorator('sex', {
                        rules: [
                          {
                            message: '请选择性别',
                          },
                        ],
                        initialValue: this.state.realTimeData.sex,
                      })(
                        <Select
                          getPopupContainer={triggerNode => triggerNode.parentElement}
                          placeholder="请选择性别"
                        >
                          <Option value="0">男</Option>
                          <Option value="1">女</Option>
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="家庭住址">
                      {getFieldDecorator('address', {
                        rules: [
                          {
                            message: '请输入家庭住址',
                          },
                        ],
                        initialValue: this.state.realTimeData.address,
                      })(<Input placeholder="请输入家庭住址" />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="联系方式">
                      {getFieldDecorator('phone', {
                        rules: [
                          {
                            message: '请选输入联系方式',
                          },
                        ],
                      })(<Input placeholder="请输入联系方式" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="部门">
                      {getFieldDecorator('departmentId', {
                        rules: [
                          {
                            message: '请选择部门',
                            required: true,
                          },
                        ],
                        // initialValue: allPosition && allPosition[0] && allPosition[0].id,
                      })(
                        <Select
                          getPopupContainer={triggerNode => triggerNode.parentElement}
                          placeholder="请选择部门"
                        >
                          {allPosition &&
                            allPosition.map(option => (
                              <Option value={option.id} key={option.key}>
                                {option.name}
                              </Option>
                            ))}
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span={12}>{this.setupDuties()}</Col>
                  <Col span={12}>
                    <Form.Item label="在职状态">
                      {getFieldDecorator('type', {
                        rules: [
                          {
                            message: '请选择在职状态',
                          },
                        ],
                        // initialValue: '0',
                      })(
                        <Select
                          getPopupContainer={triggerNode => triggerNode.parentElement}
                          placeholder="请选择在职状态"
                        >
                          <Option value="0">在职</Option>
                          <Option value="1">离职</Option>
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span={12}>{this.setupAllSecretLevel()}</Col>
                </Row>
                <Row type="flex" justify="center" style={{ marginTop: '0.35rem' }}>
                  <Col span={6}>
                    <Form.Item className={styles.button_type}>
                      <Button className={styles.form_btn} htmlType="submit">
                        确认
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col span={6} className={styles.select_padding_left}>
                    <Form.Item>
                      <Button className={styles.form_btn} onClick={this.goBack}>
                        返回
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Form>
      </ContentBorder>
    );
  }
}

const AddUserForm = Form.create<Props>({ name: 'auth_user' })(UserAuths);

const mapState = ({ userManager, commonState }) => {
  const resp = userManager.innerUserList;
  const { allDuties, allSecretLevel, allPosition } = commonState;
  return {
    innerUserList: resp,
    allDuties: allDuties,
    allSecretLevel: allSecretLevel,
    allPosition: allPosition,
    wsInfo: commonState.wsInfo,
  };
};

export default connect(mapState)(AddUserForm);

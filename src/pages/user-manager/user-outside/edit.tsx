/**
 * title: 添加方式
 */
import React from 'react';
import { Form, Row, Col, Button, Input, Select, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import * as _ from 'lodash';
import router from 'umi/router';

import ContentBorder from '../../../components/ContentBorder';
import { UmiComponentProps } from '@/common/type';
import { getAllPosition, getAllSecretLevels, getAllDepartment } from '@/pages/login/login.service';
import { updateUser } from '../services';

import styles from './index.less';

const { Option } = Select;

interface FormProps extends FormComponentProps {}

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormProps;

interface State {
  name?: string;
  cardNo?: string;
}

class EditAuth extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  goBack = () => {
    this.props.form.resetFields();
    router.push('/user-manager/user-inside');
  }; 
  setupDuties = () => {
    const { allDuties, userInside } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form.Item label="职务">
        {getFieldDecorator('positionId', {
          rules: [
            {
              message: '请选择职务',
            },
          ],
          initialValue: userInside.positionId ? userInside.positionId:'',
        })(
          <Select placeholder="请选择职务">
            {allDuties&&allDuties.map((duty, index) => (
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
    const { allSecretLevel, userInside } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form.Item label="保密等级">
        {getFieldDecorator('securityLevelId', {
          rules: [
            {
              message: '请选择保密等级',
            },
          ],
          initialValue: userInside.securityLevelId ? userInside.securityLevelId:'',

        })(
          <Select placeholder="请选择保密等级">
            {allSecretLevel&&allSecretLevel.map((level, index) => (
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
    const allPositions = await getAllDepartment()

    this.props.dispatch({
      type: 'commonState/update',
      payload: {
        allDuties: dutiesResp.result,
        allSecretLevel: secretsLevelsResp.result,
        allPosition: allPositions,

      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { userInside}=this.props
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        message.error('填写信息有误 ', values);
        return;
      }
      const data={
        isIn: '1',
        id: userInside.id,
        ...values
      }
      const isSuccessed = await updateUser(data);
      if (isSuccessed) {
        setTimeout(() => router.push('/user-manager/user-inside'), 1000);
      }
    });
  }

  render() {
    const props = this.props;
    const { getFieldDecorator } = props.form;
    const { userInside,allPosition}=this.props
    return (
      <ContentBorder className={styles.auth_root}>
        <Form
          layout="inline"
          labelAlign="right"
          style={{ marginTop: '0.57rem' }}
          onSubmit={this.handleSubmit}
        >
          <Row type="flex" justify="center" align="middle" className={styles.add}>
            <Col span={12}>
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
                        initialValue: userInside.name,
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
                        initialValue: userInside.cardNo,

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
                        initialValue: userInside.sex,

                      })(
                        <Select placeholder="请选择性别">
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
                        initialValue: userInside.address,

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
                        initialValue: userInside.phone,

                      })(<Input placeholder="请输入联系方式" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="部门">
                      {getFieldDecorator('departmentId', {
                        rules: [
                          {
                            message: '请选择部门',
                          },
                        ],
                        initialValue: userInside.departmentId ? userInside.departmentId : '',
                      })(
                        <Select placeholder="请选择部门">
                          {allPosition && allPosition.map(option => (
                            <Option value={option.id} key={option.key}>
                              {option.name}
                            </Option>
                          ))}
                        </Select>
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
                        initialValue: userInside.address,

                      })(
                        <Select placeholder="请选择在职状态">
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
                      <Button className={styles.form_btn} onClick={this.goBack}>返回</Button>
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

const AddUserForm = Form.create<Props>({ name: 'auth_user' })(EditAuth);

const mapState = ({ userManager, commonState,  }) => {
  const resp = userManager.innerUserList;
  const { allDuties, allSecretLevel, allPosition } = commonState;
  return {
    innerUserList: resp,
    allDuties: allDuties,
    allSecretLevel: allSecretLevel,
    userInside: userManager.userInside,
    allPosition: allPosition,

  };
};

export default connect(mapState)(AddUserForm);

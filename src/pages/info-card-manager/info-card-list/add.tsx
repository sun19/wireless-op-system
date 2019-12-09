/**
 * title: 发放
 */
import React from 'react';
import { Form, Row, Col, Button, Input, Select, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import * as _ from 'lodash';
import router from 'umi/router';

import ContentBorder from '../../../components/ContentBorder';
// import { InputText, TreeNodeMenu } from '../components';
import { UmiComponentProps } from '@/common/type';

import SelectText from '../components/SelectText';
import { OptionValue } from '../components/SelectText';
import { getAllRoles } from '../../system-setting/services';
import { getAllPosition, getAllSecretLevels, getAllDepartment } from '@/pages/login/login.service';
import { addInfoList } from '../services';

import styles from './index.less';

const { TextArea } = Input;
const { Option } = Select;

interface UserType {
  key?: string;
  value?: string;
  roleId: string;
}

interface FormProps extends FormComponentProps {}
type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormProps;

interface State {
  userTypes: UserType[];
  userName?: string;
  cardNo?: string;
  phone?: string;
  departmentId?: string;
  name?: string;
  id?: string;
  note?: string;
}
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class AddUsers extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      userTypes: [],
    };
  }
  setupDuties = () => {
    const { allDuties } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form.Item label="职务">
        {getFieldDecorator('positionId', {
          rules: [
            {
              // required: true,
              message: '请选择职务',
            },
          ],
          // initialValue: (allDuties && allDuties[0] && allDuties[0].id) || '',
        })(
          <Select placeholder="请选择职务">
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
              // required: true,
              message: '请选择保密等级',
            },
          ],
          // initialValue: (allSecretLevel && allSecretLevel[1] && allSecretLevel[1].id) || '',
        })(
          <Select placeholder="请选择保密等级">
            {allSecretLevel.map((level, index) => (
              <Option value={level.id} key={index}>
                {level.name}
              </Option>
            ))}
          </Select>,
        )}
      </Form.Item>
    );
  };

  componentWillUnmount() {
    message.destroy();
  }
  goBack = () => {
    this.props.form.resetFields();
    router.push('/info-card-manager/info-card-list');
  };
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        message.error('参数错误', err);
        return;
      }
      const isSuccessed = await addInfoList(values);
      if (isSuccessed) {
        message.success('添加成功!', 1000);
        setTimeout(() => router.push('/info-card-manager/info-card-list'), 1000);
      }
    });
  }
  async componentDidMount() {
    this.props.form.validateFields();
    let userTypes = await getAllRoles();
    userTypes = userTypes.map(item => ({
      key: item.id,
      value: item.roleName,
      roleId: item.id,
    }));
    this.setState({ userTypes });
    const dutiesResp = await getAllPosition();
    const secretsLevelsResp = await getAllSecretLevels();
    const allPositions = await getAllDepartment();

    this.props.dispatch({
      type: 'commonState/update',
      payload: {
        allDuties: dutiesResp.result,
        allSecretLevel: secretsLevelsResp.result,
        allPosition: allPositions,
      },
    });
  }
  render() {
    const props = this.props;
    const { getFieldDecorator, getFieldsError } = this.props.form;
    // if (this.state.userTypes.length === 0) return null;
    // if (_.isEmpty(props.allDuties) || _.isEmpty(props.allSecretLevel)) return null;
    const { allPosition } = this.props;

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
                      {getFieldDecorator('userName', {
                        rules: [
                          {
                            //required: true,
                            message: '请输入姓名',
                          },
                        ],
                      })(<Input placeholder="请输入姓名" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="身份证号">
                      {getFieldDecorator('cardNo', {
                        rules: [
                          {
                            //required: true,
                            message: '请输入身份证号',
                          },
                        ],
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
                            //required: true,
                            message: '请选择性别',
                          },
                        ],
                        // initialValue: '0',
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
                            //required: true,
                            message: '请输入家庭住址',
                          },
                        ],
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
                            //required: true,
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
                          },
                        ],
                        // initialValue: (allPosition && allPosition[0] && allPosition[0].id) || '',
                      })(
                        <Select placeholder="请选择部门">
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
                    <Form.Item label="类型">
                      {getFieldDecorator('type', {
                        rules: [
                          {
                            //required: true,
                            message: '请选择类型',
                          },
                        ],
                        initialValue: '0',
                      })(
                        <Select placeholder="请选择类型">
                          <Option value="0">内部</Option>
                          <Option value="1">外部</Option>
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="在职状态">
                      {getFieldDecorator('incumbency', {
                        rules: [
                          {
                            //required: true,
                            message: '请选择在职状态',
                          },
                        ],
                        // initialValue: '0',
                      })(
                        <Select placeholder="请选择在职状态">
                          <Option value="0">在职</Option>
                          <Option value="1">离职</Option>
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>{this.setupAllSecretLevel()}</Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="信息牌编号">
                      {getFieldDecorator('name', {
                        rules: [
                          {
                            //required: true,
                            message: '请选输入信息牌编号',
                          },
                        ],
                      })(<Input placeholder="请输入信息牌编号" />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span={24} className="textarea">
                    <Form.Item label="备注">
                      {getFieldDecorator('remark')(
                        <TextArea autoSize={{ minRows: 6, maxRows: 8 }} />,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="center" style={{ marginTop: '0.35rem' }}>
                  <Col span={6}>
                    <Form.Item className={styles.button_type}>
                      <Button
                        className={styles.form_btn}
                        disabled={hasErrors(getFieldsError())}
                        htmlType="submit"
                      >
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
const AddUserForm = Form.create<Props>({ name: 'add_user' })(AddUsers);
const mapState = ({ userManager, commonState }) => {
  const { allDuties, allSecretLevel, allPosition } = commonState;
  return {
    allDuties: allDuties,
    allPosition: allPosition,

    allSecretLevel: allSecretLevel,
  };
};
export default connect(mapState)(AddUserForm);

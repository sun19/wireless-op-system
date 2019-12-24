/**
 * title: 发放
 */
import React from 'react';
import { Form, Row, Col, Button, Input, Select, message, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import * as _ from 'lodash';
import router from 'umi/router';
import moment from 'moment';

import ContentBorder from '../../../components/ContentBorder';
// import { InputText, TreeNodeMenu } from '../components';
import { UmiComponentProps } from '@/common/type';
import { BASE_API_URL } from '../../../config/constants';
import SelectText from '../components/SelectText';
import { OptionValue } from '../components/SelectText';
import { getAllRoles } from '../../system-setting/services';
import { getAllPosition, getAllSecretLevels, getAllDepartment } from '@/pages/login/login.service';
import { addInfoList } from '../services';
import request from '@/utils/request';

import styles from './index.less';

const { TextArea } = Input;
const { Option } = Select;

interface UserType {
  key?: string;
  value?: string;
  roleId: string;
}

interface FormProps extends FormComponentProps { }
type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormProps;

interface State {
  // userTypes: UserType[];
  userName?: string;
  cardNo?: string;
  phone?: string;
  sex?: string;
  departmentId?: string;
  name?: string;
  id?: string;
  note?: string;
  // userInfoList: any[];
  currentIndex?: number;
  currentUser?: any;
  // userInfoNumber?: number;
  departmentNumber?: string;
}
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class AddUsers extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      // userTypes: [],
      // userInfoList: [],
      departmentNumber: '',
    };

 
  }
  setupDuties = () => {
    const { allDuties } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { currentIndex, currentUser } = this.state;
    return (
      <Form.Item label="职务">
        {getFieldDecorator('positionId', {
          rules: [],
          initialValue: (currentIndex != null && currentUser.positionId) || undefined,
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
    const { currentIndex, currentUser } = this.state;
    return (
      <Form.Item label="保密等级">
        {getFieldDecorator('securityLevelId', {
          rules: [],
          initialValue: currentIndex != null && currentUser.securityLevelId,
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
      const { enableTime, ...props } = values;
      const data = {
        ...props,
        enableTime: values.enableTime
          ? values.enableTime.format('YYYY-MM-DD HH:mm:ss').toString()
          : '',

      };
      const isSuccessed = await addInfoList(data);
      if (isSuccessed) {
        message.success('添加成功!', 1000);
        setTimeout(() => router.push('/info-card-manager/info-card-list'), 1000);
      }
    });
  }
  async componentDidMount() {
    // 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
    // this.props.form.validateFields();


    const dutiesResp = await getAllPosition();
    const secretsLevelsResp = await getAllSecretLevels();
    const allPositions = await request.get(
      `${BASE_API_URL}/jeecg-boot/intf/location/listDepartment`,
    );
    let userInfoList1 = await request.get(
      BASE_API_URL + '/jeecg-boot/intf/location/queryUserInfoList',
    );
    userInfoList1 = (userInfoList1.result && userInfoList1.result.records) || [];
    let userInfoNumber = await request.get(
      BASE_API_URL + '/jeecg-boot/intf/location/getDictNameByType?type=informationBoardNumber',
    );

    this.props.dispatch({
      type: 'commonState/update',
      payload: {
        allDuties: dutiesResp.result,
        allSecretLevel: secretsLevelsResp.result,
        allPosition: allPositions.result.records,
        userInfoList:userInfoList1,
        userInfoNumber:userInfoNumber
      },
    });
  }
  onSelectChange = (value, index) => {
    // const { userInfoList } = this.state;
    const { allPosition , userInfoList } = this.props;
    let currentIndex = undefined;
    userInfoList.map((item, index) => {
      if (item.name === value) {
        currentIndex = index;

        for (var i = 0; i < allPosition.length; i++) {
          var dic = allPosition[i];
          if (dic.id == item.departmentId) {
            this.setState({
              departmentNumber: dic['deptCode'],
            });
          }
        }

        this.setState({
          currentIndex,
          currentUser: item,
        });
      }
    });
  };
  onSelectDepartmentChange = (value, key) => {
    this.setState({
      departmentNumber: key.key,
    });
  };

  setupSelectName = () => {
    const { userInfoList } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form.Item label="姓名">
        {getFieldDecorator('userName', {
          // rules: [],
          rules: [{ required: true, message: "请选择一个用户!" }],
        })(
          <Select onSelect={this.onSelectChange}>
            {userInfoList.map(user => {
              return (
                <Option key={user.id} value={user.name}>
                  {user.name}
                </Option>
              );
            })}
          </Select>,
        )}
      </Form.Item>
    );
  };

  render() {
    const props = this.props;
    const { getFieldDecorator, getFieldsError } = this.props.form;
    const { allPosition ,userInfoNumber} = this.props;
    const { currentIndex, currentUser, departmentNumber } = this.state;

   

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
                  <Col span={12}>{this.setupSelectName()}</Col>
                  <Col span={12}>
                    <Form.Item label="身份证号">
                      {getFieldDecorator('cardNo', {
                        // rules: [],
                        initialValue: (currentIndex != null && currentUser.cardNo) || undefined,
                      })(<Input placeholder="请输入身份证号" />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="性别">
                      {getFieldDecorator('sex', {
                        rules: [],
                        initialValue: (currentIndex != null && currentUser.sex) || undefined,
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
                        rules: [],
                        initialValue: (currentIndex != null && currentUser.address) || undefined,
                      })(<Input placeholder="请输入家庭住址" />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="联系方式">
                      {getFieldDecorator('phone', {
                        initialValue: (currentIndex != null && currentUser.phone) || undefined,
                      })(<Input placeholder="请输入联系方式" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="部门" >
                      {getFieldDecorator('departmentId', {
                        initialValue: (currentIndex != null && currentUser.departmentId) || undefined,
                      })(
                        <Select placeholder="请选择部门" onSelect={this.onSelectDepartmentChange}>
                          {allPosition &&
                            allPosition.map(option => (
                              <Option value={option.id} key={option.deptCode}>
                                {option.name}
                              </Option>
                            ))}
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="信息牌编号">
                    {getFieldDecorator('name', {
                        initialValue: (userInfoNumber != null && (departmentNumber + userInfoNumber)) || undefined,
                      })(
                        <Input disabled={true} />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="部门编号">
                      {getFieldDecorator('dictCode', {
                        rules: [],
                        initialValue: (departmentNumber != null && departmentNumber) || undefined,
                      })(<Input disabled={true} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span={12}>{this.setupDuties()}</Col>
                  <Col span={12}>
                    <Form.Item label="类型">
                      {getFieldDecorator('type', {
                        rules: [],
                        initialValue: currentIndex != null && currentUser.type,
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
                        rules: [],
                        initialValue: currentIndex != null && currentUser.type,
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
                    <Form.Item label="人员编号">
                      {getFieldDecorator('userCode', {
                        rules: [],
                        initialValue: (userInfoNumber != null && userInfoNumber) || undefined,
                      })(<Input disabled={true} />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="启用时间">
                      {getFieldDecorator(
                        'enableTime',
                        {
                          initialValue: moment(),

                        },
                      )(<DatePicker showTime={true} placeholder="请选择开始时间" />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span={24} className="textarea">
                    <Form.Item label="备注">
                      {getFieldDecorator('remark', {
                        rules: [],
                        initialValue: currentIndex != null && currentUser.remark,
                      })(<TextArea autoSize={{ minRows: 6, maxRows: 8 }} />)}
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
  const { allDuties, allSecretLevel, allPosition,userInfoList,userInfoNumber } = commonState;
  return {
    allDuties: allDuties,
    allPosition: allPosition,
    allSecretLevel: allSecretLevel,
    userInfoList:userInfoList,
    userInfoNumber:userInfoNumber
  };
};
export default connect(mapState)(AddUserForm);

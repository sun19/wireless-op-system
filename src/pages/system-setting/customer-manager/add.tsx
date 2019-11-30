/**
 * title: 添加
 */
import React from 'react';
import { Form, Row, Col, message, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import router from 'umi/router';

import SelectText from '../components/SelectText';
import AreaText from '../components/AreaText';
import FormButton from '../components/FormButton';
import ContentBorder from '../../../components/ContentBorder';
import { getAllRoles } from '../services';
import { OptionValue } from '../components/SelectText';
import { updateUserInfo } from '../services';
import { InputText, TreeNodeMenu } from '../components';

import styles from '../index.less';
import './index.less';

interface UserType {
  key?: string;
  value?: string;
  selectValue?: string;
}

interface Props extends FormComponentProps {}

interface State {
  userTypes: UserType[];
  loginName?: string;
  name?: string;
  userType?: string;
  sex?: string;
  remark?: string;
}

const defaultGenderType = [
  {
    key: '0',
    value: '男',
  },
  {
    key: '1',
    value: '女',
  },
];

const { Option } = Select;

class AddUser extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      userTypes: [],
    };
  }
  goBack = () => {
    this.props.form.resetFields();
    router.push('/system-setting/customer-manager');
  };
  onLoginNameChange = value => {
    this.props.form.setFieldsValue({
      loginName: value,
    });
  };

  onUserNameChange = value => {
    this.props.form.setFieldsValue({
      name: value,
    });
  };

  onTipsChange = value => {
    this.props.form.setFieldsValue({
      remark: value,
    });
  };
  componentWillUnmount() {
    message.destroy();
  }

  handleSubmit(e) {
    e.preventDefault();
    const formValues = {};
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        // console.error(err, values, 'err');
        message.error('填写信息有误 ', values);
        return;
      }
      const isSuccessed = await updateUserInfo(values);
      if (isSuccessed) {
        setTimeout(() => router.push('/system-setting/customer-manager'), 1000);
      }
    });
  }

  async componentDidMount() {
    let userTypes = await getAllRoles();
    userTypes = userTypes.map(item => ({
      key: item.id,
      value: item.roleName,
      selectValue: item.roleCode,
    }));
    this.setState({ userTypes });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    if (this.state.userTypes.length === 0) return null;
    // console.log(this.state.userTypes[0].roleId, 'roleId');
    return (
      <ContentBorder className={styles.add_root}>
        <Form layout="inline" style={{ marginTop: '0.57rem' }} onSubmit={this.handleSubmit}>
          <Row type="flex" justify="center" align="middle" className={styles.add}>
            <Col span={12}>
              <div className="add__inner--container">
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="登录名">
                      {getFieldDecorator('loginName', {
                        rules: [
                          {
                            //required: true,
                            message: '请输入登录名',
                          },
                        ],
                      })(
                        <InputText placeholder="请输入登录名" onChange={this.onLoginNameChange} />,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="姓名">
                      {getFieldDecorator('name', {
                        rules: [
                          {
                            //required: true,
                            message: '请输入姓名',
                          },
                        ],
                      })(<InputText placeholder="请输入姓名" onChange={this.onUserNameChange} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col
                    span={12}
                    className={styles.select_padding_left}
                    style={{ marginLeft: '-0.18rem' }}
                  >
                    <Form.Item label="人员类型">
                      {getFieldDecorator('roleId', {
                        rules: [
                          {
                            //required: true,
                            message: '请选择人员类型',
                          },
                        ],
                        initialValue: this.state.userTypes[0].key,
                      })(
                        <Select style={{ width: '2rem' }} className={styles.select_text}>
                          {this.state.userTypes.map(option => (
                            <Option value={option.key} key={option.key}>
                              {option.value}
                            </Option>
                          ))}
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="性别">
                      {getFieldDecorator('sex', {
                        initialValue: '0',
                        rules: [
                          {
                            message: '请选择性别',
                          },
                        ],
                      })(
                        <Select
                          // defaultValue={this.props.value}
                          style={{ width: '2rem' }}
                          className={styles.select_text}
                        >
                          {defaultGenderType.map(option => (
                            <Option value={option.key} key={option.key}>
                              {option.value}
                            </Option>
                          ))}
                        </Select>,
                        // <SelectText options={defaultGenderType} style={{ width: '2rem' }} />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span={23} className={styles.text_areas}>
                    <Form.Item label="备注">
                      {getFieldDecorator('remark')(
                        <AreaText
                          autoSize={{ minRows: 6, maxRows: 8 }}
                          onChange={this.onTipsChange}
                        />,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="center" style={{ marginTop: '0.35rem' }}>
                  <Col span={6}>
                    <Form.Item>
                      <FormButton title="确认" htmlType="submit" />
                    </Form.Item>
                  </Col>
                  <Col span={6} className={styles.select_padding_left}>
                    <Form.Item>
                      <FormButton title="返回" onClick={this.goBack} />
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

export default Form.create<Props>({ name: 'add_user' })(AddUser);

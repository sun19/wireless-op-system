import React from 'react';
import { Form, Row, Col, Button, Input, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import ContentBorder from '../../../components/ContentBorder';
// import { InputText, TreeNodeMenu } from '../components';
import SelectText from '../components/SelectText';
import { OptionValue } from '../components/SelectText';
import { getAllRoles } from '../../system-setting/services';


import styles from './index.less';

const { TextArea } = Input;
const { Option } = Select;

interface UserType {
  key?: string;
  value?: string;
  roleId: string;
}
interface Props extends FormComponentProps {}
interface State {
  userTypes: UserType[];
  userName?: string;
  cardNo?:string;
  phone?: string;
  departmentId?:string;
  name?: string;
  id?: string;
  note?: string;
}
class AddUser extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      userTypes: [],
    };
  }
   
  async componentDidMount() {
    let userTypes = await getAllRoles();
    userTypes = userTypes.map(item => ({
      key: item.id,
      value: item.roleName,
      roleId: item.id,
    }));
    this.setState({ userTypes });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    if (this.state.userTypes.length === 0) return null;

    return (
      <ContentBorder className={styles.auth_root}>
        <Form layout="inline" labelAlign="right" style={{ marginTop: '0.57rem' }}>
          <Row type="flex" justify="center" align="middle" className={styles.add}>
            <Col span={12}>
              <div className="auth__inner--container">
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="姓名">
                      {getFieldDecorator('userName', {
                        rules: [
                          {
                            message: '请输入姓名',
                          },
                        ],
                      })(
                        <Input
                          placeholder="请输入姓名"
                          // onChange={this.onNameChange}
                          // value={this.state.userName}
                        />,
                      )}
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
                      })(
                        <Input
                          placeholder="请输入身份证号"
                          // onChange={this.cardNoChange}
                          // value={this.state.cardNo}
                        />,
                      )}
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
                      })(
                        <Select placeholder="请选择性别" defaultValue="0">
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
                      })(
                        <Input
                          placeholder="请输入联系方式"
                          // onChange={this.phoneChange}
                          // value={this.state.phone}
                        />,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="部门">
                      {getFieldDecorator('departmentId', {
                        rules: [
                          {
                            message: '请选输入部门',
                          },
                        ],
                      })(<Input placeholder="请输入部门" />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="职务">
                      {getFieldDecorator('positionName', {
                        rules: [
                          {
                            message: '请选择职务',
                          },
                        ],
                      })(
                        <Select placeholder="请选择职务" defaultValue="lucy">
                          <Option value="jack">Jack</Option>
                          <Option value="lucy">Lucy</Option>
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="人员类型">
                      {getFieldDecorator('type', {
                        rules: [
                          {
                            message: '请选择人员类型',
                          },
                        ],
                        initialValue: this.state.userTypes[0].roleId || '管理员',
                      })(
                        <SelectText
                          options={this.state.userTypes as OptionValue[]}
                          style={{ width: '2rem' }}
                        />,
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
                            message: '请选择在职状态',
                          },
                        ],
                      })(
                        <Select placeholder="请选择在职状态" defaultValue="0">
                          <Option value="0">在职</Option>
                          <Option value="1">离职</Option>
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="保密等级">
                      {getFieldDecorator('security_levelName', {
                        rules: [
                          {
                            message: '请选择保密等级',
                          },
                        ],
                      })(
                        <Select placeholder="请选择保密等级" defaultValue="0">
                          <Option value="0">Jack</Option>
                          <Option value="1">Lucy</Option>
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="信息牌编号">
                      {getFieldDecorator('name', {
                        rules: [
                          {
                            message: '请选输入信息牌编号',
                          },
                        ],
                      })(<Input placeholder="请输入信息牌编号" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="信息牌ID">
                      {getFieldDecorator('id', {
                        rules: [
                          {
                            message: '请选输入信息牌ID',
                          },
                        ],
                      })(<Input placeholder="请输入信息牌ID" />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span={24} className="textarea">
                    <Form.Item label="备注">
                      {getFieldDecorator('note')(
                        <TextArea autoSize={{ minRows: 6, maxRows: 8 }} />,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="center" style={{ marginTop: '0.35rem' }}>
                  <Col span={6}>
                    <Form.Item className={styles.button_type}>
                      <Button className={styles.form_btn} >确认</Button>
                    </Form.Item>
                  </Col>
                  <Col span={6} className={styles.select_padding_left}>
                    <Form.Item>
                      <Button className={styles.form_btn}>返回</Button>
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
};

// export default Form.create<Props>({ name: 'auth_user' })(UserAuth);
export default Form.create<Props>({ name: 'add_user' })(AddUser);


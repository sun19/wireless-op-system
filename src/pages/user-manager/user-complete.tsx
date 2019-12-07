/**
 * title:完善信息
 */
import React from 'react';
import { Form, Row, Col, Button, Input, Select, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import request from '@/utils/request';
import router from 'umi/router';

import ContentBorder from '../../components/ContentBorder';
import { updateUserInfo } from '@/pages/system-setting/services';

import styles from './index.less';

const { Option } = Select;

interface FormProps extends FormComponentProps {}

class UserComplete extends React.Component<FormProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      record: {},
    };
  }
  async componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem('usepass'));
    const { username, roleId } = userInfo;
    const editInfo = await request.get(
      'http://47.96.112.31:8086/jeecg-boot/intf/location/listUser',
      {
        params: { loginName: username, userType: roleId },
      },
    );
    let records = (editInfo.result && editInfo.result.records) || [];
    const record = records.filter(item => item.loginName === username)[0];
    if (!record) return;
    this.setState({
      record,
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    const { record } = this.state;
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        message.error('参数错误', err);
        return;
      }
      const req = Object.assign({}, record, values);
      updateUserInfo(req).then(resp => {
        setTimeout(() => router.go(-1), 1000);
      });
    });
  };
  componentWillUnmount() {
    message.destroy();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { record } = this.state;
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
                    <Form.Item label="登录名">
                      {getFieldDecorator('loginName', {
                        rules: [],
                        initialValue: record.loginName,
                      })(<Input disabled={true} />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="姓名">
                      {getFieldDecorator('name', {
                        rules: [
                          {
                            message: '请输入姓名',
                          },
                        ],
                        initialValue: record.name,
                      })(<Input placeholder="请输入姓名" />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="密码">
                      {getFieldDecorator('password', {
                        rules: [],
                      })(<Input placeholder="请输入密码" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="性别">
                      {getFieldDecorator('sex', {
                        rules: [
                          {
                            message: '请选择性别',
                          },
                        ],
                        initialValue: record.sex,
                      })(
                        <Select placeholder="请选择性别">
                          <Option value="0">男</Option>
                          <Option value="1">女</Option>
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
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

export default Form.create<FormProps>({ name: 'auth_user' })(UserComplete);

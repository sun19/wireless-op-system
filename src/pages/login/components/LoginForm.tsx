import React from 'react';

import { Form, Icon, Input, Row, Col, Radio } from 'antd';
import { ICON_FONTS_URL } from '../../../config/constants';
import styles from '../index.css';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login_form">
        <div className={styles.login_title}>欢迎登陆</div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('radio-group')(
              <Radio.Group>
                <Radio value="a">
                  <span className={styles.rolename}>系统管理员 </span>
                </Radio>
                <Radio value="b">
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
              登陆
            </Button> */}
            <Row type="flex" justify="center" style={{ height: '100%' }}>
              <Col span={12}>
                <div className={styles.login_btn}>登陆</div>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;

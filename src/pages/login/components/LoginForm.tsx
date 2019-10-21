import React from 'react';

import { Form, Icon, Input, Row, Col, Radio, Button } from 'antd';
import { ICON_FONTS_URL } from '../../../config/constants';
import styles from '../index.css';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});

class NormalLoginForm extends React.Component {
  constructor(props: any) {
    super(props);
    // this.state={
    //   userName:'',
    //   passWord:'',
    // }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = {
          username: values.username,
          password: values.password,
        };
        var myInit = {
          method: 'GET',
          url: `http://47.96.112.31:8085/jeecg-boot/intf/location/login?username=jeecg&password=123456`,
          // headers: {
          //   'Content-Type': 'image/jpeg'
          // },
          // mode: 'cors',
          // cache: 'default'
        };
        fetch().then(function(response) {

        });
        // var myRequest = new Request(data, myInit);
        // console.log('Received values of form: ', values);
      }
    });
  };
  // loginBtn=()=>{
  //   console.log('2',this.props.form.validateFields)
  //   this.props.form.validateFields((err, values) => {
  //     console.log(values)
  //     if (!err) {
  //       console.log('Received values of form: ', values);
  //     }
  //   });
  //   console.log('ffff1')
  // }
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
              登录
            </Button> */}
            <Row type="flex" justify="center" style={{ height: '100%' }}>
              <Col span={12}>
                {/* className={styles.login_btn} onClick={this.loginBtn()} */}
                <Button className={styles.login_btn} onClick={this.handleSubmit}>
                  登录
                </Button>
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

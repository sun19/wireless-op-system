import React, { Component, Props } from 'react';
import { Row, Col, Radio, Input, Icon } from 'antd';
import styles from './index.css';

export default class Login extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className={styles.bg}>
        <div className={styles.titleContainer}>
          <Row>
            <Col span={12} offset={6}>
              <div className={styles.title}>无线光频定位管理系统</div>
            </Col>
          </Row>
        </div>
        <div className={styles.content}>
          <Row type="flex" justify="center">
            <Col>
              <div className={styles.loginPanel}>
                <div className={styles.login_title}>欢迎登录</div>
                <div>
                  <Radio.Group>
                    <Radio value={1}>系统管理员</Radio>
                    <Radio value={2}>值班员</Radio>
                  </Radio.Group>
                </div>
                <div>
                  <Input placeholder="登录名" prefix={<Icon type="" />}></Input>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

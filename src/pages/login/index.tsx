import React, { Component, Props } from 'react';
import { Row, Col, Radio, Input, Icon, Layout, Form } from 'antd';

import WrappedNormalLoginForm from './components/LoginForm';
import styles from './index.css';
// import { Icon } from 'antd';

const { Header, Content, Footer } = Layout;

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1464236_mya4evtbh9i.js',
});
export default class Login extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Layout className={styles.bg}>
        <div className={styles.right_top_panel}>
          <div className={styles.date_string}>2019/8/5</div>
          <div className={styles.time_string}>
            <span>1</span>
            <span>5</span>:<span>5</span>
            <span>8</span>
          </div>
        </div>
        <Header className={[`${styles.no_bg}`].join(' ')}>
          <Row
            type="flex"
            justify="center"
            align="middle"
            style={{ position: 'relative', top: '30px' }}
          >
            <Col span={12}>
              <div className={styles.system_name} />
            </Col>
          </Row>
        </Header>
        <Content className={[`${styles.no_bg}`].join(' ')}>
          <Row type="flex" justify="center" style={{ height: '100%' }}>
            <Col span={12}>
              <div className={styles.loginPanel}>
                <WrappedNormalLoginForm />
              </div>
            </Col>
          </Row>
        </Content>
        <Footer className={[`${styles.no_bg}`].join(' ')}>
          <div className={styles.foot_text}>©智谷光频产业研究院</div>
        </Footer>
      </Layout>
    );
  }
}

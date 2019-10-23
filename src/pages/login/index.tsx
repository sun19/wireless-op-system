import React, { Component, Props } from 'react';
import { Row, Col, Radio, Input, Icon, Layout, Form } from 'antd';

import WrappedNormalLoginForm from './components/LoginForm';
import styles from './index.less';
// import { Icon } from 'antd';

const { Header, Content, Footer } = Layout;

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1464236_mya4evtbh9i.js',
});

interface State {
  year: string;
  time: string[];
}

export default class Login extends Component {
  private timer;
  constructor(props: any) {
    super(props);
    const time = new Date();
    this.state = {
      year: this.getYear(time),
      time: this.getTime(time),
    } as State;
  }

  getYear = time => {
    return `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}`;
  };

  getTime = time => {
    const _time =
      time.toLocaleTimeString().length === 10
        ? `0${time.toLocaleTimeString()}`
        : time.toLocaleTimeString();
    return _time
      .substr(0, 5)
      .split('')
      .filter(str => str !== ':');
  };
  componentDidMount() {
    this.timer = setInterval(() => {
      const time = new Date();
      this.setState({
        year: this.getYear(time),
        time: this.getTime(time),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  render() {
    const state: State = this.state as State;
    return (
      <Layout className={styles.bg}>
        <div className={styles.right_top_panel}>
          <div className={styles.date_string}>{(this.state as State).year}</div>
          <div className={styles.time_string}>
            <span>{state.time[0]}</span>
            <span>{state.time[1]}</span>:<span>{state.time[2]}</span>
            <span>{state.time[3]}</span>
          </div>
        </div>
        <Header className={[`${styles.no_bg}`].join(' ')}>
          <Row
            type="flex"
            justify="center"
            align="middle"
            style={{ position: 'relative', top: '1rem' }}
          >
            <Col span={12}>
              <div className={styles.system_name} />
            </Col>
          </Row>
        </Header>
        <Content className={[`${styles.no_bg}`].join(' ')}>
          <Row type="flex" justify="center" style={{ height: '100%' }}>
            <Col span={10}>
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

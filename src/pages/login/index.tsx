import React, { Component, Props } from 'react';
import { Row, Col, Radio, Input, Icon, Layout, Form } from 'antd';
import moment from 'moment';
import request, { format } from '@/utils/request';

import { BASE_API_URL } from '../../config/constants';

import WrappedNormalLoginForm from './components/LoginForm';
import styles from './index.less';
// import { Icon } from 'antd';

const { Header, Content, Footer } = Layout;

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1464236_mya4evtbh9i.js',
});

import { getDictNameByType } from '../system-setting/services';

interface State {
  title: string;
  year: string;
  time?: any;
  size?: string;
  type?: object;
}
import Background from '../../assets/login/1.png';
import Background2 from '../../assets/login/2.png';
import Background3 from '../../assets/login/3.png';
import Background4 from '../../assets/login/4.png';
import Background5 from '../../assets/login/5.png';
export default class Login extends Component<any, State> {
  private timer;
  constructor(props: any) {
    super(props);
    const time = new Date();
    this.state = {
      title: '',
      year: this.getYear(time),
      time: '',
      size: '25',
      type: Background,
    };
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
  async gettitle() {
    const resp = await request(BASE_API_URL + '/jeecg-boot/intf/location/getCompany', {
      method: 'GET',
    });
    // console.log(resp)
    let result = resp.result;
    if (result.isShow === '0') {
      this.setState({ title: result.name, size: result.fontSize });
    }
  }
  async getBack() {
    const themes = await getDictNameByType({ type: 'theme' });
    switch (themes) {
      case 1:
        this.setState({ type: Background });
        break;
      case 2:
        this.setState({ type: Background2 });
        break;
      case 3:
        this.setState({ type: Background3 });
        break;
      case 4:
        this.setState({ type: Background4 });
        break;
      case 5:
        this.setState({ type: Background5 });
        break;
      default:
        this.setState({ type: Background });
    }
    // this.setState({ type: themes })
  }
  componentDidMount() {
    this.gettitle();
    this.timer = setInterval(() => {
      const time = new Date();
      this.setState({
        year: this.getYear(time),
        time: moment().format('HH:mm'),
      });
    }, 1000);
    this.getBack();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  render() {
    let sectionStyle = {
      backgroundImage: `url(${this.state.type})`,
    };
    const state: State = this.state as State;
    return (
      // < Layout className={styles.bg} style={{ backgroundImage: "url(" + `../../assets/login/${this.state.type}.png` + ")" }} >

      <Layout className={styles.bg} style={sectionStyle}>
        <div className={styles.right_top_panel}>
          <div className={styles.date_string}>{(this.state as State).year}</div>
          <div className={styles.time_string}>
            <span>{state.time[0]}</span>
            <span>{state.time[1]}</span>:<span>{state.time[3]}</span>
            <span>{state.time[4]}</span>
          </div>
        </div>
        <Header className={[`${styles.no_bg}`].join(' ')}>
          <div className={styles.system_name} />
        </Header>
        <div className={styles.loginPanel}>
          <WrappedNormalLoginForm />
        </div>
        <div style={{ fontSize: ` ${this.state.size}px` }} className={styles.foot_text}>
          {this.state.title}
        </div>
      </Layout>
    );
  }
}

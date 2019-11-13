import React from 'react';
import { Menu, Icon, Row, Col, Button } from 'antd';
import router from 'umi/router';

import styles from './index.less';
import { connect } from 'dva';

const { SubMenu } = Menu;

type Props = ReturnType<typeof mapState>;

interface State {
  time: any;
  current: any;
}

class Navigation extends React.Component<Props, State> {
  timer: any;
  constructor(props: Props) {
    super(props);
    const current = props.location.pathname.substr(props.location.pathname.lastIndexOf('/') + 1);
    this.state = {
      current: current,
      time: new Date(),
    };
  }

  handleClick = e => {
    const key = e.key;
    switch (key) {
      case 'homepage':
        this.gotoHomepage();
        break;
      case 'realtime':
        this.gotoRealTime();
      case 'dataview':
        this.gotoDataview();
        break;
      case 'system':
        this.gobackToSystem();
        break;
      default:
        break;
    }
    this.setState({
      current: e.key,
    });
  };
  gotoHomepage = () => {
    router.push('/big-screen/homepage');
  };
  gotoRealTime = () => {
    router.push('/big-screen/homepage/realtime');
  };
  gotoDataview = () => {
    router.push('/big-screen/dataview');
  };
  gobackToSystem = () => {
    router.push('/system-setting/customer-manager');
  };
  setupTime = () => {
    const { time } = this.state;
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    hours = hours < 10 ? `0${hours}` : `${hours}`;
    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return (
      <React.Fragment>
        <span className={styles.year}>
          {time.getFullYear()}-{time.getMonth() + 1}-{time.getDate()}
        </span>
        <span className={styles.hours}>{`${hours}`[0]}</span>
        <span className={styles.hours}> {`${hours}`[1]}</span>
        <span className={styles.split}> :</span>
        <span className={styles.hours}> {`${minutes}`[0]}</span>
        <span className={styles.hours}> {`${minutes}`[1]}</span>
        <span className={styles.split}> :</span>
        <span className={styles.hours}> {`${seconds}`[0]}</span>
        <span className={styles.hours}> {`${seconds}`[1]}</span>
      </React.Fragment>
    );
  };
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        time: new Date(),
      });
    }, 1000);
  }
  render() {
    return (
      <Row>
        <div className={styles.navigation}>
          <Col span={5} className="left_panel">
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
              <Menu.Item key="homepage">首页</Menu.Item>
              <Menu.Item key="realtime">实时</Menu.Item>
              <Menu.Item key="dataview">数据</Menu.Item>
              <Menu.Item key="system">系统</Menu.Item>
              {/* <SubMenu title={<span className="submenu-title-wrapper">系统</span>}> */}
              {/* <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
                <Menu.Item key="setting:3">Option 3</Menu.Item> */}
              {/* </SubMenu> */}
              <Menu.Item key="admin">admin</Menu.Item>
            </Menu>
          </Col>
          <Col span={13} className={styles.middle_panel}>
            <div className={styles.title_back} />
          </Col>
          <Col span={4} className={styles.right_panel}>
            {this.setupTime()}
          </Col>
        </div>
      </Row>
    );
  }
}

const mapState = ({ router }) => {
  const { location } = router;
  return {
    location,
  };
};

export default connect(mapState)(Navigation);

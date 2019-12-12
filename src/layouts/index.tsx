import React from 'react';
import { Layout, notification } from 'antd';
import withRouter from 'umi/withRouter';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { connect } from 'dva';

import AppTitle from '../components/AppTitle';
import LeftMenuList from '../components/LeftMenuList';
import TopHeader from '../components/TopHeader';
import styles from './index.less';

const { Sider } = Layout;

const ignoreLayout = [
  '/login',
  '/login/',
  '/wireless-op-system/big-screen/homepage',
  '/big-screen/homepage',
  '/wireless-op-system/big-screen/homepage/realtime',
  '/big-screen/homepage/realtime',
  '/wireless-op-system/big-screen/dataview',
  '/big-screen/dataview',
  '/wireless-op-system/big-screen/homepage/lampshow',
  '/big-screen/homepage/lampshow',
];

class BasicLayout extends React.Component<any, any> {
  ws: WebSocket;
  componentDidMount() {
    this.ws = new WebSocket('ws://47.96.112.31:8086/jeecg-boot/websocket/1');
    this.ws.onmessage = evt => {
      let msgInfo = JSON.parse(evt.data);
      this.props.dispatch({
        type: 'commonState/update',
        payload: {
          wsInfo: msgInfo,
        },
      });
      if (msgInfo.msgType != '2') return;

      let msgText = msgInfo.msgTxt;

      const { warnType, lampCode, informationBordCodes } = msgText;
      if (warnType == 0) {
        notification.warn({
          message: '弹框报警',
          description: `
            灯具编号：${lampCode}
            信息牌编号：${informationBordCodes}
          `,
          duration: 0,
        });
      } else if (warnType == 1) {
        notification.warn({
          message: '声音报警',
          description: `
            灯具编号：${lampCode}
            信息牌编号：${informationBordCodes}
          `,
          duration: 0,
        });
      } else if (warnType == 2) {
        notification.warn({
          message: '灯光报警',
          description: `
            灯具编号：${lampCode}
            信息牌编号：${informationBordCodes}
          `,
          duration: 0,
        });
      } else {
        notification.warn({
          message: '报警',
          description: `灯具编号：${lampCode}
            信息牌编号：${informationBordCodes}
          `,
        });
      }
    };
  }
  componentWillUnmount() {
    this.ws && this.ws.close();
  }
  render() {
    const props = this.props;
    let routeName = props.location.pathname;
    if (ignoreLayout.includes(routeName)) {
      return <div>{props.children}</div>;
    }
    return (
      <>
        <AppTitle />
        <Layout className={[`${styles.layout}`, `${styles.no_background}`].join(' ')}>
          <Sider className={[`${styles.left_bar_bg}`].join(' ')} width="280">
            <LeftMenuList />
          </Sider>
          <Layout className={[`${styles.no_background}`].join(' ')}>
            <TopHeader />
            {props.children}
          </Layout>
        </Layout>
      </>
    );
  }
}

// export default BasicLayout;

const mapState = ({ commonState }) => {
  return {
    wsInfo: commonState.wsInfo,
  };
};

export default connect(mapState)(BasicLayout);

//去除`router`切换动画
// export default withRouter(props => (
//   <TransitionGroup>
//     <CSSTransition key={props.location.pathname} classNames="fade" timeout={0}>
//       <BasicLayout {...props} />
//     </CSSTransition>
//   </TransitionGroup>
// ));

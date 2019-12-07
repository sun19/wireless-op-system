import React from 'react';
import { Layout } from 'antd';
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

const BasicLayout: React.FC = (props: any) => {
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
};

export default BasicLayout;

//去除`router`切换动画
// export default withRouter(props => (
//   <TransitionGroup>
//     <CSSTransition key={props.location.pathname} classNames="fade" timeout={0}>
//       <BasicLayout {...props} />
//     </CSSTransition>
//   </TransitionGroup>
// ));

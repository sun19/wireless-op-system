import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import withRouter from 'umi/withRouter';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import AppTitle from '../components/AppTitle';
import LeftMenuList from '../components/LeftMenuList';
import TopHeader from '../components/TopHeader';
import MainContent from '../components/MainContent';
import styles from './index.css';

const { Header, Content, Sider, Footer } = Layout;

const ignoreLayout = ['/login', '/login/'];

const BasicLayout: React.FC = (props: any) => {
  let routeName = props.location.pathname;
  if (ignoreLayout.includes(routeName)) {
    return <div>{props.children}</div>;
  }
  return (
    <Layout className={[`${styles.layout}`, `${styles.no_background}`].join(' ')}>
      <Sider className={[`${styles.left_bar_bg}`].join(' ')} width="258">
        <AppTitle />
        <LeftMenuList />
      </Sider>
      <Layout className={[`${styles.no_background}`].join(' ')}>
        <TopHeader />
        <MainContent />
        {/* <Footer className={[`${styles.no_background}`].join(' ')} /> */}
      </Layout>
    </Layout>
  );
};

export default withRouter(props => (
  <TransitionGroup>
    <CSSTransition key={props.location.pathname} classNames="fade" timeout={300}>
      <BasicLayout {...props} />
    </CSSTransition>
  </TransitionGroup>
));

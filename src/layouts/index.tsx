import React from 'react';
import { Layout, Breadcrumb } from 'antd';

import AppTitle from '../components/AppTitle';
import LeftMenuList from '../components/LeftMenuList';
import TopHeader from '../components/TopHeader';
import MainContent from '../components/MainContent';
import styles from './index.css';

const { Header, Content, Sider, Footer } = Layout;

const BasicLayout: React.FC = props => {
  return (
    <Layout className={[`${styles.layout}`, `${styles.no_background}`].join(' ')}>
      <Sider className={[`${styles.left_bar_bg}`].join(' ')} width="258">
        <AppTitle />
        <LeftMenuList />
      </Sider>
      <Layout className={[`${styles.no_background}`].join(' ')}>
        <TopHeader />
        <MainContent />
        <Footer className={[`${styles.no_background}`].join(' ')}>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;

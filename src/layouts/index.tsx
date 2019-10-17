import React from 'react';
import { Layout, Breadcrumb } from 'antd';

import LeftMenuLayout from './LeftMenuLayout';
import styles from './index.css';

const { Header, Content, Sider } = Layout;

const BasicLayout: React.FC = props => {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className="logo" />
      </Header>
      <LeftMenuLayout />

      <Layout className={styles.content}>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;

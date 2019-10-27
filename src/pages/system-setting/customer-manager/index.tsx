import React from 'react';
import { Layout, Form, Input, Row, Col, Button, Icon } from 'antd';

import MainContent from '../components/MainContent';
import styles from './index.less';
import publicStyles from './index.less';

const { Content } = Layout;
const FormItem = Form.Item;

export default class UserManager extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    // const {
    //   form: { getFieldDecorator },
    // } = this.props as any;

    return (
      <div className={styles.customerManager}>
        <Content className={publicStyles.bg}>
          <div className={styles.padding_top_20}>
            <Form layout="inline">
              <Row
                type="flex"
                justify="start"
                align="middle"
                style={{ paddingLeft: '39px' }}
                gutter={16}
              >
                <FormItem label="登录名">
                  <Input placeholder="请输入登录名" />
                </FormItem>
                <FormItem label="姓名">
                  <Input placeholder="请输入姓名" />
                </FormItem>
                <Button className={styles.bg_button}>查询</Button>
                <Button className={styles.bg_button} style={{ marginLeft: 37 }}>
                  {' '}
                  清空{' '}
                </Button>
              </Row>
            </Form>
          </div>
        </Content>
        <MainContent />
      </div>
    );
  }
}

// export default UserManager;

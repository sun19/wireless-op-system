/**
 * title: 日志管理
 */
import React from 'react';
import { Layout, Form, Input, Row, Col, TimePicker, Button, Icon } from 'antd';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';
import styles from './index.less';
import publicStyles from '../index.less';
import moment from 'moment';

const { Content } = Layout;
const FormItem = Form.Item;

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});
export default class SuperAdmin extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div className={publicStyles.public_hight}>
        <Content className={publicStyles.bg}>
          <div className={styles.public_hight_40}>
            <Form layout="inline">
              <Row
                // type="flex"
                justify="start"
                align="middle"
                style={{ paddingLeft: '39px' }}
                gutter={16}
              >
                <span className={publicStyles.authInner} style={{ paddingLeft: '39px' }}>
                  操作时间
                  <span className={publicStyles.timePicker}>
                    <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} />
                  </span>
                  <span className={publicStyles.timePicker}>-</span>
                  <span className={publicStyles.timePicker}>
                    <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} />
                  </span>
                </span>
                <span className={publicStyles.button_type}>
                  <Button className={publicStyles.form_btn} style={{ marginLeft: 30 }}>
                    查询
                  </Button>
                  <Button className={publicStyles.form_btn} style={{ marginLeft: 30 }}>
                    清空
                  </Button>
                </span>
              </Row>
            </Form>
          </div>
          <MainContent />
        </Content>
      </div>
    );
  }
}

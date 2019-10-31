import React from 'react';
import { Layout, Form, Input, Row, Col, Button, Icon } from 'antd';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';

import styles from './index.less';
import publicStyles from '../index.less';

const { Content } = Layout;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});
const FormItem = Form.Item;

export default class UserManager extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div className={`${publicStyles.public_hight} add__inner--container`}>
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
                <FormItem label="登录名">
                  <Input className={publicStyles.input_text} placeholder="请输入登录名" />
                </FormItem>
                <FormItem label="姓名">
                  <Input className={publicStyles.input_text} placeholder="请输入姓名" />
                </FormItem>
                <span className={publicStyles.button_type}>
                  <Button className={publicStyles.form_btn}>查询</Button>
                  <Button className={publicStyles.form_btn} style={{ marginLeft: 37 }}>
                    清空
                  </Button>
                </span>
                <span
                  className={[`${publicStyles.form_btn_add}`, `${publicStyles.form_btns}`].join(
                    ' ',
                  )}
                  style={{ marginLeft: 37 }}
                >
                  <IconFont type="icon-plus" />
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

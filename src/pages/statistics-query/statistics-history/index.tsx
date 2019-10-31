import React from 'react';
import { Layout, Form, Input, Row, Col, Select, TimePicker, Button, Icon } from 'antd';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';
import styles from './index.less';
import publicStyles from '../index.less';
import moment from 'moment';

const { Content } = Layout;
const { Option } = Select;
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
                style={{ paddingLeft: '30px' }}
                gutter={16}
              >
                <FormItem label="信息牌">
                  <Input className={publicStyles.input_text} placeholder="请输入信息牌" />
                </FormItem>
                <FormItem label="身份证号">
                  <Input className={publicStyles.input_text} placeholder="请输入身份证号" />
                </FormItem>
                <FormItem label="人员类型">
                  <div style={{ marginTop: '-3px' }}>
                    <Select className={publicStyles.select_text} defaultValue="lucy">
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                    </Select>
                  </div>
                </FormItem>
                <span className={publicStyles.authInner} style={{ paddingLeft: '10px' }}>
                  进入时间
                  <span className={publicStyles.timePicker}>
                    <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} />
                  </span>
                  <span className={publicStyles.timePicker}>-</span>
                  <span className={publicStyles.timePicker}>
                    <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} />
                  </span>
                </span>
                <span className={publicStyles.button_type}>
                  <Button className={publicStyles.form_btn} style={{ marginLeft: 10 }}>
                    查询
                  </Button>
                  <Button className={publicStyles.form_btn} style={{ marginLeft: 10 }}>
                    清空
                  </Button>
                </span>
                <span className={[`${publicStyles.form_btns}`].join(' ')}>
                  <span className={[`${publicStyles.form_btn_add}`].join('')}>
                    <IconFont type="icon-plus" />
                  </span>
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

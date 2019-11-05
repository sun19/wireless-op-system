import React from 'react';
import { Layout, Form, Input, Row, Col, Select, Button, Icon } from 'antd';
import router from 'umi/router';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';
import styles from './index.less';
import publicStyles from '../index.less';

const { Content } = Layout;
const FormItem = Form.Item;
const { Option } = Select;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});
export default class SuperAdmin extends React.Component {
  constructor(props: any) {
    super(props);
  }
  addUser = () => {
    router.push('/warning-manager/type/add');
  };
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
                <FormItem label="警告名称">
                  <Input className={publicStyles.input_text} placeholder="请输入姓名" />
                </FormItem>

                <span className={publicStyles.button_type}>
                  <Button className={publicStyles.form_btn}>查询</Button>
                  <Button className={publicStyles.form_btn} style={{ marginLeft: 37 }}>
                    清空
                  </Button>
                </span>
                <span className={[`${publicStyles.form_btns}`].join(' ')}>
                  <span
                    className={[`${publicStyles.form_btn_add}`].join('')}
                    onClick={this.addUser}
                  >
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

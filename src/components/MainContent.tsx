import React from 'react';
import { Layout, Form, Input, Row, Col, Button, Icon } from 'antd';

import styles from './mainContent.less';
import EditableTable from './EditorableTable';

const { Content } = Layout;
const FormItem = Form.Item;

@Form.create()
export default class MainContent extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props as any;

    const EditableFormTable = Form.create()(EditableTable);
    return (
      <Content className={styles.bg}>
        <div className={styles.padding_top_20}>
          <Form layout="inline">
            <Row
              type="flex"
              justify="start"
              align="middle"
              style={{ paddingLeft: '39px' }}
              gutter={16}
            >
              <Col>
                <FormItem label="登录名">
                  {getFieldDecorator('name')(<Input placeholder="请输入登录名" />)}
                </FormItem>
              </Col>
              <Col>
                <FormItem label="姓名">
                  {getFieldDecorator('name')(<Input placeholder="请输入姓名" />)}
                </FormItem>
              </Col>
            </Row>
            <div style={{ overflow: 'hidden' }}>
              <div>
                <Button className={styles.bg_button}>查询</Button>
                <Button className={styles.bg_button} style={{ marginLeft: 37 }}>
                  清空
                </Button>
              </div>
              <div className={styles.div_button_bg} />
            </div>
          </Form>
        </div>
        <div className={[`${styles.table_list_panel}`, `${styles.padding_top_20}`].join(' ')}>
          <EditableFormTable />
        </div>
      </Content>
    );
  }
}

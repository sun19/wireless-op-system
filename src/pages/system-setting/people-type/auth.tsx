/**
 * title: 授权
 */
import React from 'react';
import { Form, Row, Col, Button, Input, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import router from 'umi/router';

import ContentBorder from '../../../components/ContentBorder';
import { InputText, TreeNodeMenu } from '../components';
import { addUserType } from '../services';

import styles from './index.less';

interface Props extends FormComponentProps {}

class UserAuth extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }
  goBack = () => {
    this.props.form.resetFields();
    router.push('/system-setting/people-type');
  }; 
  onSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        message.error('填写信息有误', values);
        return;
      }
      const isSuccessed = await addUserType(values);
      if (isSuccessed) {
        setTimeout(() => router.push('/system-setting/people-type'), 1000);
      }
    });
  }

  onCancel() {
    router.push('/system-setting/people-type');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <ContentBorder className={styles.auth_root}>
        <Form layout="inline" style={{ marginTop: '0.57rem' }} onSubmit={this.onSubmit}>
          <Row type="flex" justify="center" align="middle" className={styles.add}>
            <Col span={12}>
              <div className="auth__inner--container">
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="角色名称">
                      {getFieldDecorator('roleName', {
                        rules: [
                          {
                            message: '请输入角色名称',
                          },
                        ],
                      })(<Input placeholder="请输入角色名称" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="英文名称">
                      {getFieldDecorator('roleCode', {
                        rules: [
                          {
                            message: '请输入英文名称',
                          },
                        ],
                      })(<Input placeholder="请输入英文名称" />)}
                    </Form.Item>
                  </Col>
                </Row>
                {/* <Row type="flex" justify="space-between">
                  <Col span={23}>
                    <Form.Item label="人员类型">
                      {getFieldDecorator('人员类型')(<TreeNodeMenu />)}
                    </Form.Item>
                  </Col>
                </Row> */}
                <Row type="flex" justify="center" style={{ marginTop: '0.35rem' }}>
                  <Col span={6}>
                    <Form.Item className={styles.button_type}>
                      <Button className={styles.form_btn} htmlType="submit">
                        确认
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col span={6} className={styles.select_padding_left}>
                    <Form.Item>
                      <Button className={styles.form_btn} onClick={this.goBack}>返回</Button>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Form>
      </ContentBorder>
    );
  }
}

export default Form.create<Props>({ name: 'auth_user' })(UserAuth);

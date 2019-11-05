import React from 'react';
import { Form, Row, Col, Button, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import ContentBorder from '../../../components/ContentBorder';
import { InputText, TreeNodeMenu } from '../components';

import styles from './index.less';

interface Props extends FormComponentProps {}

const UserAuth: React.FC<Props> = (props: Props) => {
  const { getFieldDecorator } = props.form;
  return (
    <ContentBorder className={styles.auth_root}>
      <Form layout="inline" style={{ marginTop: '0.57rem' }}>
        <Row type="flex" justify="center" align="middle" className={styles.add}>
          <Col span={12}>
            <div className="auth__inner--container">
              <Row type="flex" justify="space-between">
                <Col span={12}>
                  <Form.Item label="角色名称">
                    {getFieldDecorator('角色名称', {
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
                    {getFieldDecorator('英文名称', {
                      rules: [
                        {
                          message: '请输入英文名称',
                        },
                      ],
                    })(<Input placeholder="请输入英文名称" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row type="flex" justify="space-between">
                <Col span={23}>
                  <Form.Item label="人员类型">
                    {getFieldDecorator('人员类型')(<TreeNodeMenu />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row type="flex" justify="center" style={{ marginTop: '0.35rem' }}>
                <Col span={6}>
                  <Form.Item className={styles.button_type}>
                    <Button className={styles.form_btn}>确认</Button>
                  </Form.Item>
                </Col>
                <Col span={6} className={styles.select_padding_left}>
                  <Form.Item>
                    <Button className={styles.form_btn}>返回</Button>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Form>
    </ContentBorder>
  );
};

export default Form.create<Props>({ name: 'auth_user' })(UserAuth);

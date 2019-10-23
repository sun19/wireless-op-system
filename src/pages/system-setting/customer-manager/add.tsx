import React from 'react';
import { Form, Row, Col, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import InputText from '../components/InputText';
import SelectText from '../components/SelectText';
import styles from './index.less';

interface Props extends FormComponentProps {}

const defaultUserTypes = [
  {
    key: '操作工',
    value: '操作工',
  },
  {
    key: '开发者',
    value: '开发者',
  },
];

const defaultGenderType = [
  {
    key: '男',
    value: '男',
  },
  {
    key: '女',
    value: '女',
  },
];

const AddUser: React.FC<Props> = (props: Props) => {
  const { getFieldDecorator } = props.form;
  return (
    <Form layout="inline">
      <Row type="flex" justify="center" align="middle" className={styles.add}>
        <Col span={12}>
          <div className="add__inner--container">
            <Row type="flex" justify="space-between">
              <Col span={12}>
                <Form.Item label="登录名">
                  {getFieldDecorator('登录名', {
                    rules: [
                      {
                        message: '请输入登录名',
                      },
                    ],
                  })(<InputText placeholder="请输入登录名" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="姓名">
                  {getFieldDecorator('姓名', {
                    rules: [
                      {
                        message: '请输入姓名',
                      },
                    ],
                  })(<InputText placeholder="请输入姓名" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="space-between">
              <Col span={12} className={styles.select_padding_left}>
                <Form.Item label="人员类型">
                  {getFieldDecorator('人员类型', {
                    rules: [
                      {
                        message: '请选择人员类型',
                      },
                    ],
                    initialValue: '开发者',
                  })(<SelectText options={defaultUserTypes} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="性别">
                  {getFieldDecorator('性别', {
                    initialValue: '男',
                    rules: [
                      {
                        message: '请选择性别',
                      },
                    ],
                  })(<SelectText options={defaultGenderType} />)}
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create<Props>({ name: 'add_user' })(AddUser);

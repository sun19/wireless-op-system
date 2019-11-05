import React from 'react';
import { Form, Row, Col, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import SelectText from '../components/SelectText';
import AreaText from '../components/AreaText';
import FormButton from '../components/FormButton';
import ContentBorder from '../../../components/ContentBorder';
import styles from './index.less';

interface Props extends FormComponentProps {}

const { TextArea } = Input;

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
    <ContentBorder className={styles.add_root}>
      <Form layout="inline" style={{ marginTop: '0.57rem' }}>
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
                    })(<Input placeholder="请输入登录名" />)}
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
                    })(<Input placeholder="请输入姓名" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row type="flex" justify="space-between">
                <Col
                  span={12}
                  className={styles.select_padding_left}
                  style={{ marginLeft: '-0.18rem' }}
                >
                  <Form.Item label="人员类型">
                    {getFieldDecorator('人员类型', {
                      rules: [
                        {
                          message: '请选择人员类型',
                        },
                      ],
                      initialValue: '开发者',
                    })(<SelectText options={defaultUserTypes} style={{ width: '2rem' }} />)}
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
                    })(<SelectText options={defaultGenderType} style={{ width: '2rem' }} />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row type="flex" justify="space-between">
                <Col span={24} className="textarea">
                  <Form.Item label="备注">
                    {getFieldDecorator('备注')(<TextArea autoSize={{ minRows: 6, maxRows: 8 }} />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row type="flex" justify="center" style={{ marginTop: '0.35rem' }}>
                <Col span={6}>
                  <Form.Item className={styles.button_type}>
                    <FormButton title="确认" className={styles.form_btn} />
                  </Form.Item>
                </Col>
                <Col span={6} className={styles.select_padding_left}>
                  <Form.Item>
                    <FormButton className={styles.button_type} title="返回" />
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

export default Form.create<Props>({ name: 'add_user' })(AddUser);

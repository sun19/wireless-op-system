import React from 'react';
import { Form, Row, Col, Button, Input, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import ContentBorder from '../../../components/ContentBorder';
// import { InputText, TreeNodeMenu } from '../components';

import styles from './index.less';

const { TextArea } = Input;
const { Option } = Select;

interface Props extends FormComponentProps {}

const UserAuth: React.FC<Props> = (props: Props) => {
  const { getFieldDecorator } = props.form;
  return (
    <ContentBorder className={styles.auth_root}>
      <Form layout="inline" labelAlign="right" style={{ marginTop: '0.57rem' }}>
        <div className="auth__inner--container">
          <div className={styles.input_body}>
            <Row type="flex" justify="space-between">
              <Col span={24}>
                <Form.Item label="编号">
                  {getFieldDecorator('编号', {
                    rules: [
                      {
                        message: '请输入编号',
                      },
                    ],
                  })(<Input placeholder="请输入编号" />)}
                </Form.Item>
                <Form.Item label="型号">
                  {getFieldDecorator('型号', {
                    rules: [
                      {
                        message: '请输入型号',
                      },
                    ],
                  })(<Input placeholder="请输入型号" />)}
                </Form.Item>{' '}
                <Form.Item   label="横坐标" className="from-width">
                  {getFieldDecorator('横坐标', {
                    rules: [
                      {
                        message: '请输入横坐标',
                      },
                    ],
                  })(
                    <Input
                      style={{ width: '1rem', backgroundSize: '1rem 0.4rem' }}
                      placeholder="请输入横坐标"
                    />,
                  )}
                </Form.Item>
                <Form.Item label="纵坐标">
                  {getFieldDecorator('纵坐标', {
                    rules: [
                      {
                        message: '请输入纵坐标',
                      },
                    ],
                  })(
                    <Input
                      style={{ width: '1rem', backgroundSize: '1rem 0.4rem' }}
                      placeholder="请输入纵坐标"
                    />,
                  )}
                </Form.Item>
                <Form.Item className={styles.area_style} label="区域">
                  {getFieldDecorator('区域', {
                    rules: [
                      {
                        message: '请输入区域',
                      },
                    ],
                  })(<Input placeholder="请输入区域" />)}
                </Form.Item>
              </Col>
            </Row>

            <Row type="flex" justify="space-between">
              <Col span={24}>
                <Form.Item label="最大人员数量">
                  {getFieldDecorator('最大人员数量', {
                    rules: [
                      {
                        message: '请选择最大人员数量',
                      },
                    ],
                  })(
                    <Select placeholder="请选择最大人员数量" defaultValue="lucy">
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                    </Select>,
                  )}
                </Form.Item>
                <Form.Item className={styles.area_style} label="区域">
                  {getFieldDecorator('区域', {
                    rules: [
                      {
                        message: '请输入区域',
                      },
                    ],
                  })(
                    <Input
                      placeholder="请输入区域"
                      style={{ width: '8.5rem', backgroundSize: '8.5rem 0.4rem' }}
                    />,
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row className={styles.line_style}>
              <Col className={styles.line_type} span={11}/>
              <Col span={2}>地图</Col>
              <Col className={styles.line_type} span={11}/>
            </Row>
            <Row className={styles.line_style}>
              <Col className={styles.img_type} span={24}/>
            </Row>
            <Row type="flex" justify="center" style={{ marginTop: '0.35rem' }}>
              <Col span={2}>
                <Form.Item className={styles.button_type}>
                  <Button className={styles.form_btn}>确认</Button>
                </Form.Item>
              </Col>
              <Col span={2} className={styles.select_padding_left}>
                <Form.Item>
                  <Button className={styles.form_btn}>返回</Button>
                </Form.Item>
              </Col>
            </Row>
          </div>
        </div>
      </Form>
    </ContentBorder>
  );
};

export default Form.create<Props>({ name: 'auth_user' })(UserAuth);

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
                <Form.Item label="地图名称">
                  {getFieldDecorator('地图名称', {
                    rules: [
                      {
                        message: '请选择地图名称',
                      },
                    ],
                  })(
                    <Select placeholder="请选择地图名称" defaultValue="lucy">
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                    </Select>,
                  )}
                </Form.Item>
                <Form.Item label="围栏名称">
                  {getFieldDecorator('围栏名称', {
                    rules: [
                      {
                        message: '请输入围栏名称',
                      },
                    ],
                  })(<Input placeholder="请输入围栏名称" />)}
                </Form.Item>
                <Form.Item label="围栏类型">
                  {getFieldDecorator('围栏类型', {
                    rules: [
                      {
                        message: '请选择围栏类型',
                      },
                    ],
                  })(
                    <Select placeholder="请选择围栏类型" defaultValue="lucy">
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                    </Select>,
                  )}
                </Form.Item>
                <Form.Item label="是否永久">
                  {getFieldDecorator('是否永久', {
                    rules: [
                      {
                        message: '请选择是否永久',
                      },
                    ],
                  })(
                    <Select placeholder="请选择是否永久" defaultValue="lucy">
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row type="flex" justify="space-between">
              <Col span={24}>
                <Form.Item label="生效时间">
                  {getFieldDecorator('生效时间', {
                    rules: [
                      {
                        message: '请输入生效时间',
                      },
                    ],
                  })(<Input placeholder="请输入生效时间" />)}
                </Form.Item>
                <Form.Item label="失效时间">
                  {getFieldDecorator('失效时间', {
                    rules: [
                      {
                        message: '请输入失效时间',
                      },
                    ],
                  })(<Input placeholder="请输入失效时间" />)}
                </Form.Item>
                <Form.Item label="级别">
                  {getFieldDecorator('级别', {
                    rules: [
                      {
                        message: '请选择级别',
                      },
                    ],
                  })(
                    <Select placeholder="请选择级别" defaultValue="lucy">
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                    </Select>,
                  )}
                </Form.Item>
                <Form.Item label="关联人员">
                  {getFieldDecorator('关联人员', {
                    rules: [
                      {
                        message: '请选择关联人员',
                      },
                    ],
                  })(
                    <Select placeholder="请选择关联人员" defaultValue="lucy">
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                    </Select>,
                  )}
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
                  })(<Input placeholder="请输入区域" style={{'width': '5.25rem','backgroundSize':'5.25rem 0.4rem'}} />)}
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

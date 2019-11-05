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
                <Form.Item label="告警名称">
                  {getFieldDecorator('告警名称', {
                    rules: [
                      {
                        message: '请输入告警名称',
                      },
                    ],
                  })(<Input placeholder="请输入告警名称" />)}
                </Form.Item>
                <Form.Item label="所属地图">
                  {getFieldDecorator('所属地图', {
                    rules: [
                      {
                        message: '请输入所属地图',
                      },
                    ],
                  })(<Input placeholder="请输入所属地图" />)}
                </Form.Item>
                <Form.Item label="区域选择">
                  {getFieldDecorator('区域选择', {
                    rules: [
                      {
                        message: '请输入区域选择',
                      },
                    ],
                  })(<Input placeholder="请输入区域选择" />)}
                </Form.Item>
                <Form.Item label="关联标签">
                  {getFieldDecorator('关联标签', {
                    rules: [
                      {
                        message: '请输入关联标签',
                      },
                    ],
                  })(<Input placeholder="请输入关联标签" />)}
                </Form.Item>
              </Col>
            </Row>

            <Row type="flex" justify="space-between">
              <Col span={24}>
                <Form.Item label="开始时间">
                  {getFieldDecorator('开始时间', {
                    rules: [
                      {
                        message: '请输入开始时间',
                      },
                    ],
                  })(<Input placeholder="请输入开始时间" />)}
                </Form.Item>
                <Form.Item label="结束时间">
                  {getFieldDecorator('结束时间', {
                    rules: [
                      {
                        message: '请输入结束时间',
                      },
                    ],
                  })(<Input placeholder="请输入结束时间" />)}
                </Form.Item>
                <Form.Item label="聚集半径">
                  {getFieldDecorator('聚集半径', {
                    rules: [
                      {
                        message: '请输入聚集半径',
                      },
                    ],
                  })(<Input placeholder="请输入聚集半径" />)}
                </Form.Item>
                <Form.Item label="超限人数">
                  {getFieldDecorator('超限人数', {
                    rules: [
                      {
                        message: '请输入超限人数',
                      },
                    ],
                  })(<Input placeholder="请输入超限人数" />)}
                </Form.Item>
              </Col>
            </Row>

            <Row type="flex" justify="space-between">
              <Col span={24}>
                <Form.Item label="超限时间">
                  {getFieldDecorator('超限时间', {
                    rules: [
                      {
                        message: '请输入超限时间',
                      },
                    ],
                  })(<Input placeholder="请输入超限时间" />)}
                </Form.Item>
                <Form.Item label="重复类型">
                  {getFieldDecorator('重复类型', {
                    rules: [
                      {
                        message: '请输入重复类型',
                      },
                    ],
                  })(<Input placeholder="请输入重复类型" />)}
                </Form.Item>
                <Form.Item label="告警方式" className={styles.area_style}>
                  {getFieldDecorator('告警方式', {
                    rules: [
                      {
                        message: '告警方式',
                      },
                    ],
                  })(
                    <Select placeholder="告警方式" defaultValue="lucy">
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row className={styles.line_style}>
              <Col className={styles.line_type} span={11} />
              <Col span={2}>地图</Col>
              <Col className={styles.line_type} span={11} />
            </Row>
            <Row className={styles.line_style}>
              <Col className={styles.img_type} span={24} />
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

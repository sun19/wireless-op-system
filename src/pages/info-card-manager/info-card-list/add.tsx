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
        <Row type="flex" justify="center" align="middle" className={styles.add}>
          <Col span={12}>
            <div className="auth__inner--container">
              <Row type="flex" justify="space-between">
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
                <Col span={12}>
                  <Form.Item label="身份证号">
                    {getFieldDecorator('身份证号', {
                      rules: [
                        {
                          message: '请输入身份证号',
                        },
                      ],
                    })(<Input placeholder="请输入身份证号" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row type="flex" justify="space-between">
                <Col span={12}>
                  <Form.Item label="性别">
                    {getFieldDecorator('性别', {
                      rules: [
                        {
                          message: '请选择性别',
                        },
                      ],
                    })(
                      <Select placeholder="请选择性别" defaultValue="jack">
                        <Option value="jack">男</Option>
                        <Option value="lucy">女</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="家庭住址">
                    {getFieldDecorator('家庭住址', {
                      rules: [
                        {
                          message: '请输入家庭住址',
                        },
                      ],
                    })(<Input placeholder="请输入家庭住址" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row type="flex" justify="space-between">
                <Col span={12}>
                  <Form.Item label="联系方式">
                    {getFieldDecorator('联系方式', {
                      rules: [
                        {
                          message: '请选输入联系方式',
                        },
                      ],
                    })(<Input placeholder="请输入联系方式" />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="部门">
                    {getFieldDecorator('部门', {
                      rules: [
                        {
                          message: '请选输入部门',
                        },
                      ],
                    })(<Input placeholder="请输入部门" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row type="flex" justify="space-between">
                <Col span={12}>
                  <Form.Item label="职务">
                    {getFieldDecorator('职务', {
                      rules: [
                        {
                          message: '请选择职务',
                        },
                      ],
                    })(
                      <Select placeholder="请选择职务" defaultValue="lucy">
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="人员类型">
                    {getFieldDecorator('人员类型', {
                      rules: [
                        {
                          message: '请选择人员类型',
                        },
                      ],
                    })(
                      <Select placeholder="请选择人员类型" defaultValue="lucy">
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row type="flex" justify="space-between">
                <Col span={12}>
                  <Form.Item label="在职状态">
                    {getFieldDecorator('在职状态', {
                      rules: [
                        {
                          message: '请选择在职状态',
                        },
                      ],
                    })(
                      <Select placeholder="请选择在职状态" defaultValue="lucy">
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="保密等级">
                    {getFieldDecorator('职务', {
                      rules: [
                        {
                          message: '请选择保密等级',
                        },
                      ],
                    })(
                      <Select placeholder="请选择保密等级" defaultValue="lucy">
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row type="flex" justify="space-between">
                <Col span={12}>
                  <Form.Item label="信息牌编号">
                    {getFieldDecorator('信息牌编号', {
                      rules: [
                        {
                          message: '请选输入信息牌编号',
                        },
                      ],
                    })(<Input placeholder="请输入信息牌编号" />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="信息牌ID">
                    {getFieldDecorator('信息牌ID', {
                      rules: [
                        {
                          message: '请选输入信息牌ID',
                        },
                      ],
                    })(<Input placeholder="请输入信息牌ID" />)}
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

/**
  * title: 添加
 */
import React from 'react';
import { Form, Row, Col, Button, Input, Select } from 'antd';
import router from 'umi/router';
import { FormComponentProps } from 'antd/lib/form';

import ContentBorder from '../../../components/ContentBorder';
import { warningTypeSearch } from '@/pages/warning-manager/services';

import styles from './index.less';

const { TextArea } = Input;
const { Option } = Select;

interface Props extends FormComponentProps {}

interface State {
  warningTypes: any[];
}

class AddPollingLine extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      warningTypes: [],
    };
  }
  goBack = () => {
    this.props.form.resetFields();
    router.push('/map-manager/polling-line');
  }; 
  setupAlarmSelect = () => {
    const { getFieldDecorator } = this.props.form;
    const { warningTypes } = this.state;
    // if (warningTypes.length === 0) return null;
    return (
      <Form.Item label="告警方式" className={styles.area_style}>
        {getFieldDecorator('alarmName', {
          rules: [
            {
              message: '告警方式',
            },
          ],
          initialValue: warningTypes.length === 0 ? '' : warningTypes[0].name,
        })(
          <Select placeholder="告警方式">
            {warningTypes.map((item, index) => (
              <Option value={item.name} key={index}>
                {item.name}
              </Option>
            ))}
          </Select>,
        )}
      </Form.Item>
    );
  };

  async componentDidMount() {
    const warningTypes = await warningTypeSearch({});
    this.setState({
      warningTypes: warningTypes.records,
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <ContentBorder className={styles.auth_root}>
        <Form layout="inline" labelAlign="right" style={{ marginTop: '0.57rem' }}>
          <div className="auth__inner--container">
            <div className={styles.input_body}>
              <Row type="flex" justify="space-between">
                <Col span={24}>
                  <Form.Item label="地图名称">
                    {getFieldDecorator('mapName', {
                      rules: [
                        {
                          message: '请输入地图名称',
                        },
                      ],
                    })(<Input placeholder="请输入地图名称" />)}
                  </Form.Item>
                  <Form.Item label="巡检人员">
                    {getFieldDecorator('login_id', {
                      rules: [
                        {
                          message: '请输入巡检人员',
                        },
                      ],
                    })(<Input placeholder="请输入巡检人员" />)}
                  </Form.Item>

                  <Form.Item label="信息牌">
                    {getFieldDecorator('informationBoardId', {
                      rules: [
                        {
                          message: '请输入信息牌',
                        },
                      ],
                    })(<Input placeholder="请输入信息牌" />)}
                  </Form.Item>
                  {this.setupAlarmSelect()}
                </Col>
              </Row>

              <Row type="flex" justify="space-between">
                <Col span={24}>
                  <Form.Item label="巡检路线">
                    {getFieldDecorator('inspectionRoute', {
                      rules: [
                        {
                          message: '请输入巡检路线',
                        },
                      ],
                    })(<Input placeholder="请输入巡检路线" />)}
                  </Form.Item>
                  <Form.Item label="开始时间">
                    {getFieldDecorator('startTime', {
                      rules: [
                        {
                          message: '请输入开始时间',
                        },
                      ],
                    })(<Input placeholder="请输入开始时间" />)}
                  </Form.Item>
                  <Form.Item label="结束时间">
                    {getFieldDecorator('endTime', {
                      rules: [
                        {
                          message: '请输入结束时间',
                        },
                      ],
                    })(<Input placeholder="请输入结束时间" />)}
                  </Form.Item>
                </Col>
              </Row>

              <Row type="flex" justify="space-between">
                <Col span={24}>
                  <Form.Item className={styles.area_style} label="备注">
                    {getFieldDecorator('备注', {
                      rules: [
                        {
                          message: '请输入备注',
                        },
                      ],
                    })(
                      <Input
                        placeholder="请输入备注"
                        style={{ width: '11.8rem', backgroundSize: '11.8rem 0.4rem' }}
                      />,
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
                    <Button className={styles.form_btn} onClick={this.goBack}>返回</Button>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>
        </Form>
      </ContentBorder>
    );
  }
}

export default Form.create<Props>({ name: 'add_polling_line' })(AddPollingLine);

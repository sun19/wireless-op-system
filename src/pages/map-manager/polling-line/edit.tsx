/**
 * title: 修改
 */
import React from 'react';
import { Form, Row, Col, Button, Input, Select, DatePicker } from 'antd';
import router from 'umi/router';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';

import ContentBorder from '../../../components/ContentBorder';
import { warningTypeSearch } from '@/pages/warning-manager/services';
import { UmiComponentProps } from '@/common/type';
import { getAllMap } from '@/pages/login/login.service';
import { getAllWarningType, updatePollingLine } from '../services';

import styles from './index.less';

const { TextArea } = Input;
const { Option } = Select;

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormComponentProps;

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
    return (
      <Form.Item label="告警方式" className={styles.area_style}>
        {getFieldDecorator('alarmId', {
          rules: [
            {
              message: '告警方式',
            },
          ],
        })(
          <Select placeholder="告警方式">
            {warningTypes.map((item, index) => (
              <Option value={item.dictValue} key={item.dictValue}>
                {item.dictName}
              </Option>
            ))}
          </Select>,
        )}
      </Form.Item>
    );
  };

  async componentDidMount() {
    const warningTypes = await getAllWarningType();
    this.setState({
      warningTypes: warningTypes.result.records,
    });
    this.initRequest();
  }
  async initRequest() {
    const maps = await getAllMap();
    this.props.dispatch({
      type: 'mapManager/update',
      payload: {
        allMaps: maps.result,
      },
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const { pollingLinesRecord } = this.props;
    this.props.form.validateFields(async (err, values) => {
      const { startTime, endTime, ...props } = values;
      const data = {
        ...props,
        startTime: values.startTime
          ? values.startTime.format('YYYY-MM-DD HH:mm:ss').toString()
          : '',
        endTime: values.endTime ? values.endTime.format('YYYY-MM-DD HH:mm:ss').toString() : '',
      };

      await updatePollingLine(Object.assign(pollingLinesRecord, data));
      router.push('/map-manager/polling-line');
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { maps, pollingLinesRecord } = this.props;
    return (
      <ContentBorder className={styles.auth_root}>
        <Form
          layout="inline"
          labelAlign="right"
          style={{ marginTop: '0.57rem' }}
          onSubmit={this.onSubmit}
        >
          <div className="auth__inner--container">
            <div className={styles.input_body}>
              <Row type="flex" justify="space-between">
                <Col span={24}>
                  <Form.Item label="地图名称">
                    {getFieldDecorator('mapId', {
                      rules: [
                        {
                          message: '请选择地图名称',
                        },
                      ],
                      initialValue: pollingLinesRecord.mapId,
                    })(
                      <Select placeholder="请选择地图名称">
                        {maps.map(item => (
                          <Option value={item.id} key={item.name}>
                            {item.name}
                          </Option>
                        ))}
                      </Select>,
                    )}
                  </Form.Item>
                  <Form.Item label="巡检人员">
                    {getFieldDecorator('login_id', {
                      rules: [
                        {
                          message: '请输入巡检人员',
                        },
                      ],
                      initialValue: pollingLinesRecord.login_id,
                    })(<Input placeholder="请输入巡检人员" />)}
                  </Form.Item>

                  <Form.Item label="信息牌">
                    {getFieldDecorator('informationBoardId', {
                      rules: [
                        {
                          message: '请输入信息牌',
                        },
                      ],
                      initialValue: pollingLinesRecord.informationBoardId,
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
                      initialValue: pollingLinesRecord.inspectionRoute,
                    })(<Input placeholder="请输入巡检路线" />)}
                  </Form.Item>
                  <Form.Item label="开始时间">
                    {getFieldDecorator('startTime', {
                      rules: [],
                    })(
                      <DatePicker
                        showTime={true}
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="请选择开始时间"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item label="结束时间">
                    {getFieldDecorator('endTime', {
                      rules: [],
                    })(
                      <DatePicker
                        showTime={true}
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="请选择结束时间"
                      />,
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Row type="flex" justify="space-between">
                <Col span={24}>
                  <Form.Item className={styles.area_style} label="备注">
                    {getFieldDecorator('remark', {
                      rules: [
                        {
                          message: '请输入备注',
                        },
                      ],
                      initialValue: pollingLinesRecord.remark,
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
                    <Button className={styles.form_btn} htmlType="submit">
                      确认
                    </Button>
                  </Form.Item>
                </Col>
                <Col span={2} className={styles.select_padding_left}>
                  <Form.Item>
                    <Button className={styles.form_btn} onClick={this.goBack}>
                      返回
                    </Button>
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

const AddPollingLineHOC = Form.create<Props>({ name: 'add_polling_line' })(AddPollingLine);

const mapState = ({ mapManager }) => {
  const { allMaps, fencingTypes, users, levels, areas, pollingLinesRecord } = mapManager;
  return {
    mapFencing: mapManager.mapFencing,
    maps: allMaps,
    fencingTypes,
    users,
    levels,
    areas,
    pollingLinesRecord,
  };
};

export default connect(mapState)(AddPollingLineHOC);

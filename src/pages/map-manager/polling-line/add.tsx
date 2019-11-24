/**
 * title: 添加
 */
import React from 'react';
import { Form, Row, Col, Button, Input, Select, DatePicker } from 'antd';
import router from 'umi/router';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import Konva from 'konva';
import {
  Stage,
  Layer,
  Image as ImageLayer,
  Circle as CircleLayer,
  Line as LineLayer,
} from 'react-konva';

import ContentBorder from '../../../components/ContentBorder';
import { warningTypeSearch } from '@/pages/warning-manager/services';
import { UmiComponentProps } from '@/common/type';
import { getAllMap } from '@/pages/login/login.service';
import { getAllWarningType, addPollingLine } from '../services';

import styles from './index.less';

const { TextArea } = Input;
const { Option } = Select;

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormComponentProps;

interface State {
  warningTypes: any[];
  mapImage: any;
  width: number;
  height: number;
  circleX: number;
  circleY: number;
  circleShow: boolean;
}

class AddPollingLine extends React.Component<Props, State> {
  map: React.RefObject<HTMLDivElement>;
  constructor(props) {
    super(props);
    this.map = React.createRef<HTMLDivElement>();
    this.state = {
      warningTypes: [],
      mapImage: null,
      width: 0,
      height: 0,
      circleX: 10,
      circleY: 10,
      circleShow: true,
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

  dynamicLoadMapImage() {
    return new Promise(resolve => {
      const mapImage = new Image();
      mapImage.src = require('../../big-screen/assets/map.png');
      mapImage.onload = function() {
        resolve(mapImage);
      };
    });
  }
  async componentDidMount() {
    const mapImage = await this.dynamicLoadMapImage();
    if (this.map.current) {
      const { clientWidth, clientHeight } = this.map.current;

      this.setState({
        mapImage,
        width: clientWidth,
        height: clientHeight,
      });
    }
    const warningTypes = await getAllWarningType();
    this.setState({
      warningTypes: warningTypes.result.records,
    });
    this.initRequest();
  }
  async initRequest() {
    const maps = await getAllMap();
    // const fencingTypes = await getAllFencingTypes();
    // let usersResp = await getAllUserInfo();
    // let users = [];
    // for (let i = 0; i < usersResp.result.length; i++) {
    //   const dept = usersResp.result[i];
    //   for (let j = 0; j < dept.relatePeopleResponses.length; j++) {
    //     const item = dept.relatePeopleResponses[j];
    //     users.push(item);
    //   }
    // }
    // const levels = await getAllLevels();
    // const areas = await getAllArea();
    this.props.dispatch({
      type: 'mapManager/update',
      payload: {
        allMaps: maps.result,
        // fencingTypes: fencingTypes.result,
        // users: users,
        // levels: levels.result,
        // areas: areas.result,
      },
    });
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      const { startTime, endTime, ...props } = values;
      const data = {
        ...props,
        startTime: values.startTime
          ? values.startTime.format('YYYY-MM-DD HH:mm:ss').toString()
          : '',
        endTime: values.endTime ? values.endTime.format('YYYY-MM-DD HH:mm:ss').toString() : '',
      };

      await addPollingLine(data);
      router.push('/map-manager/polling-line');
      // this.getRouteInspectList(data);
    });
  };
  setupCircle = () => {
    const x = this.state.circleX;
    const y = this.state.circleY;
    const circleShow = this.state.circleShow;
    if (!circleShow) return;
    return (
      <CircleLayer
        x={x}
        y={y}
        radius={10}
        fill="red"
        draggable={true}
        listening={true}
        onDragMove={this.onCircleDragging}
      />
    );
  };
  onCircleDragging = (event: any) => {
    const defaultWidth = 1920;
    const defaultHeight = 1080;
    const { clientWidth, clientHeight } = this.map.current;

    const evt = event.evt;
    //换算由于地图拉伸造成的坐标不一致
    this.props.form.setFieldsValue({
      xCoordinate: Math.floor((evt.x * defaultWidth) / clientWidth),
    });
    this.props.form.setFieldsValue({
      yCoordinate: Math.floor((evt.y * defaultHeight) / clientHeight),
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { maps } = this.props;
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
              <Row>
                <div className={styles.tips}>请拖拽灯具至指定位置</div>
              </Row>
              <Row className={styles.line_style}>
                <Col className={styles.img_type} span={24}>
                  <div style={{ width: '100%', height: '100%' }} ref={this.map}>
                    <Stage
                      width={this.state.width}
                      height={this.state.height}
                      draggable={false}
                      // onClick={this.onCircleClick}
                    >
                      <Layer>
                        <ImageLayer
                          image={this.state.mapImage}
                          x={0}
                          y={0}
                          width={this.state.width}
                          height={this.state.height}
                        />
                        {this.setupCircle()}
                      </Layer>
                    </Stage>
                  </div>
                </Col>
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
  const { allMaps, fencingTypes, users, levels, areas } = mapManager;
  return {
    mapFencing: mapManager.mapFencing,
    maps: allMaps,
    fencingTypes,
    users,
    levels,
    areas,
  };
};

export default connect(mapState)(AddPollingLineHOC);

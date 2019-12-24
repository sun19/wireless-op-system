/**
 * title: 添加
 */

// 备份代码
import React from 'react';
import { Form, Row, Col, Button, Input, Select, DatePicker, message, Cascader } from 'antd';
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
import router from 'umi/router';
import moment from 'moment';

import ContentBorder from '../../../components/ContentBorder';
import { UmiComponentProps } from '@/common/type';
import {
  getAllMap,
  getAllFencingTypes,
  getAllUserInfo,
  getAllLevels,
  getAllArea,
} from '@/pages/login/login.service';
import { addMapArea } from '../services';
import { guid } from '@/utils/guid';

import styles from './index.less';
import publicStyles from '../index.less';

const { TextArea } = Input;
const { Option } = Select;

interface State {
  mapImage: any;
  width: number;
  height: number;
  circleX: number;
  circleY: number;
  circleShow: boolean;
  stageScale: number;
  stageX: number;
  stageY: number;
  circles: any[];
  canDraw: boolean;
}

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormComponentProps;
const scaleBy = 1.01;

class FencingSetting extends React.Component<Props, State> {
  map: React.RefObject<HTMLDivElement>;
  num: 0;
  constructor(props) {
    super(props);
    this.map = React.createRef<HTMLDivElement>();
    this.state = {
      mapImage: null,
      width: 0,
      height: 0,
      circleX: -10,
      circleY: -10,
      circleShow: true,
      stageScale: 1,
      stageX: 0,
      stageY: 0,
      circles: [],
      canDraw: false,
    };
    this.initRequest = this.initRequest.bind(this);
  }
  async componentDidMount() {
    const mapImage = await this.dynamicLoadMapImage();
    if (this.map.current) {
      const { clientWidth } = this.map.current;
      const clientHeight = Math.floor((clientWidth * 1080) / 1920);

      this.setState({
        mapImage,
        width: clientWidth,
        height: clientHeight,
      });
    }
    this.initRequest();
  }

  dynamicLoadMapImage() {
    return new Promise(resolve => {
      const mapImage = new Image();
      mapImage.src = require('../../big-screen/assets/map.png');
      mapImage.onload = function() {
        resolve(mapImage);
      };
    });
  }

  async initRequest() {
    const maps = await getAllMap();
    const fencingTypes = await getAllFencingTypes();
    let usersResp = await getAllUserInfo();
    let users = [];
    for (let i = 0; i < usersResp.result.length; i++) {
      const dept = usersResp.result[i];
      for (let j = 0; j < dept.relatePeopleResponses.length; j++) {
        const item = dept.relatePeopleResponses[j];
        users.push(item);
      }
    }

    const levels = await getAllLevels();
    const areas = await getAllArea();
    this.props.dispatch({
      type: 'mapManager/update',
      payload: {
        allMaps: maps.result,
        fencingTypes: fencingTypes.result,
        users: users,
        levels: levels.result,
        areas: areas.result,
      },
    });
  }
  //TODO:暂不提供拖拽功能
  onCircleDragging = (event: any) => {
    const defaultWidth = 1920;
    const defaultHeight = 1080;
    const { clientWidth } = this.map.current;
    const clientHeight = Math.floor((clientWidth * 1080) / 1920);

    const evt = event.evt;
    const target = event.target;
    const attrs = target.attrs;
    const id = attrs.id;
    const { circles } = this.state;
    const newCircles = circles.map(item => {
      if (item.num === id) {
        return { ...item, x: evt.layerX, y: evt.layerY };
      }
      return item;
    });
    this.setState({
      circles: newCircles,
    });
    //换算由于地图拉伸造成的坐标不一致
    // this.props.form.setFieldsValue({
    //   xCoordinate: Math.floor((evt.layerX * defaultWidth) / clientWidth),
    // });
    // this.props.form.setFieldsValue({
    //   yCoordinate: Math.floor((evt.layerY * defaultHeight) / clientHeight),
    // });
  };
  onCircleClick = (event: any) => {
    const defaultWidth = 1920;
    const defaultHeight = 1080;
    const { clientWidth } = this.map.current;
    const clientHeight = Math.floor((clientWidth * 1080) / 1920);

    const evt = event.evt;
    //换算由于地图拉伸造成的坐标不一致
    this.props.form.setFieldsValue({
      xCoordinate: Math.floor((evt.x * defaultWidth) / clientWidth),
    });
    this.props.form.setFieldsValue({
      yCoordinate: Math.floor((evt.y * defaultHeight) / clientHeight),
    });
    this.setState({
      circleX: evt.x,
      circleY: evt.y,
      circleShow: true,
    });
  };
  setupCircle = () => {
    const { circles } = this.state;
    const circleShow = this.state.circleShow;
    if (!circleShow) return;
    return circles.map((circle, index) => (
      <CircleLayer
        x={circle.circleX}
        y={circle.circleY}
        radius={10}
        key={index}
        fill="red"
        id={circle.num}
        // draggable={true}
        listening={true}
        onDragMove={this.onCircleDragging}
      />
    ));
  };
  setupPolygon = () => {
    const { circles } = this.state;
    const points = circles.reduce((p, n) => {
      p.push(n.circleX);
      p.push(n.circleY);
      return p;
    }, []);
    return (
      <LineLayer
        points={points}
        fill="rgba(0,0,0,0.2)"
        stroke="#00D2FF"
        strokeWidth={2}
        closed={true}
      />
    );
  };

  onWheel = evt => {
    evt.evt.preventDefault();
    const stage = evt.target.getStage();
    const oldScale = stage.scaleX();

    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    const newScale = evt.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    stage.scale({ x: newScale, y: newScale });

    this.setState({
      stageScale: newScale,
      stageX: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      stageY: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    });
  };

  mapClick = evt => {
    if (!this.state.canDraw) return;
    const defaultWidth = 1920;
    const defaultHeight = 1080;
    const { clientWidth } = this.map.current;
    const clientHeight = Math.floor((clientWidth * 1080) / 1920);
    const event: any = evt.evt;
    const stage = evt.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };
    let circles = this.state.circles;
    circles = circles.concat([
      {
        circleX: Math.floor(mousePointTo.x),
        circleY: Math.floor(mousePointTo.y),
        num: guid(),
      },
    ]);
    this.setState({ circles });
    // this.props.form.setFieldsValue({
    //   xCoordinate: Math.floor((event.layerX * defaultWidth) / clientWidth),
    // });
    // this.props.form.setFieldsValue({
    //   yCoordinate: Math.floor((event.layerY * defaultHeight) / clientHeight),
    // });
  };
  onStartDraw = () => {
    this.setState({
      canDraw: true,
      circles: [],
    });
  };
  onEndDraw = () => {
    this.setState({
      canDraw: false,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      const { ...props } = values;
      const data = {
        operatTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        ...props,
      };
      const isSuccessed = await addMapArea(data);
      if (isSuccessed) {
        // message.success('添加成功!');
        setTimeout(() => router.push('/map-manager/area-set'), 1000);
      }
    });
  };

  onBack = () => {
    router.push('/map-manager/area-set');
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { mapImage, width, height } = this.state;
    const { maps, fencingTypes, users, levels, areas } = this.props;
    const polygon = this.setupPolygon();
    return (
      <ContentBorder className={styles.auth_root}>
        <Form layout="inline" style={{ marginTop: '0.57rem' }} onSubmit={this.onSubmit}>
          <Row type="flex" justify="center" align="middle" className={styles.add}>
            <Col span={12}>
              {/* <Col span={12}> */}
              <div className="add__inner--container">
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="区域名称">
                      {getFieldDecorator('regionName', {
                        rules: [
                          {
                            message: '请输入区域名称',
                          },
                        ],
                      })(<Input placeholder="请输入区域名称" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="地图名称">
                      {getFieldDecorator('mapId', {
                        rules: [
                          {
                            message: '请选择地图名称',
                          },
                        ],
                      })(
                        <Select   getPopupContainer={triggerNode => triggerNode.parentElement} placeholder="请选择地图名称">
                          {maps.map(item => (
                            <Option value={item.id} key={item.name}>
                              {item.name}
                            </Option>
                          ))}
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="区域级别">
                      {getFieldDecorator('regionalLevelId', {
                        rules: [
                          {
                            message: '请选择区域级别',
                          },
                        ],
                      })(
                        <Select   getPopupContainer={triggerNode => triggerNode.parentElement} placeholder="请选择区域级别">
                          {levels.map(item => (
                            <Option value={item.id} key={item.name}>
                              {item.name}
                            </Option>
                          ))}
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12} className={styles.text_areas}>
                    <Form.Item label="备注">
                      {getFieldDecorator('remark')(
                        <TextArea
                          className={publicStyles.text_area}
                          autoSize={{ minRows: 1, maxRows: 8 }}
                        />,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row className={styles.line_style}>
                  <Col className={styles.img_type} span={24}>
                    <div style={{ width: '100%', height: '100%' }} ref={this.map}>
                      <Stage
                        width={this.state.width}
                        height={this.state.height}
                        draggable={true}
                        onWheel={this.onWheel}
                        scaleX={this.state.stageScale}
                        scaleY={this.state.stageScale}
                        x={this.state.stageX}
                        y={this.state.stageY}
                        onClick={this.mapClick}
                      >
                        <Layer>
                          <ImageLayer
                            image={this.state.mapImage}
                            x={0}
                            y={0}
                            width={this.state.width}
                            height={this.state.height}
                          />
                          {polygon}
                          {this.setupCircle()}
                        </Layer>
                      </Stage>
                    </div>
                  </Col>
                </Row>

                <Row type="flex" justify="center" style={{ marginTop: '0.35rem' }}>
                  <Col span={6}>
                    <Form.Item>
                      <Button className={styles.form_btn} onClick={this.onStartDraw}>
                        开始绘制
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col span={6} className={styles.select_padding_left}>
                    <Form.Item>
                      <Button className={styles.form_btn} onClick={this.onEndDraw}>
                        结束绘制
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item>
                      <Button className={styles.form_btn} htmlType="submit">
                        确认
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col span={6} className={styles.select_padding_left}>
                    <Form.Item>
                      <Button className={styles.form_btn} onClick={this.onBack}>
                        返回
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Form>
      </ContentBorder>
    );
  }
}

const FencingSettingHOC = Form.create<Props>({ name: 'fencing_setting_add' })(FencingSetting);

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

export default connect(mapState)(FencingSettingHOC);

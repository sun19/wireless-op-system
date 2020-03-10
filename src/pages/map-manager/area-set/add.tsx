/**
 * title: 添加
 */
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
import { getLampList } from '@/pages/map-manager/services';
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
  lamps: any[];
}

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormComponentProps;
const scaleBy = 1.01;

class FencingSetting extends React.Component<Props, State> {
  map: React.RefObject<HTMLDivElement>;
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
      lamps: [],
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
      mapImage.src = require('../../big-screen/assets/地图2.png');
      mapImage.onload = function() {
        resolve(mapImage);
      };
    });
  }

  async initRequest() {
    const { clientWidth } = this.map.current;
    const clientHeight = Math.floor((clientWidth * 1080) / 1920);

    const maps = await getAllMap();
    const fencingTypes = await getAllFencingTypes();
    let usersResp = await getAllUserInfo();
    usersResp.result = usersResp.result || [];
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
    let lamps = await getLampList();
    lamps = (lamps.result && lamps.result.records) || [];
    lamps = lamps.map(item => ({
      x: +item.xcoordinate,
      y: +item.ycoordinate,
      id: item.id,
    }));
    lamps = this.setupLampData(lamps, clientWidth, clientHeight);
    lamps = lamps.map(item => {
      return Object.assign(item, { selected: false });
    });
    this.setState({
      lamps: lamps,
    });
  }
  createLamps() {
    const lamps = this.state.lamps;

    return lamps.map((lamp, index) => (
      <CircleLayer
        x={lamp.x - 4}
        y={lamp.y - 4}
        radius={8}
        fill={lamp.selected ? 'red' : 'blue'}
        id={lamp.id}
        key={index}
        onClick={this.onLampClick}
      />
    ));
  }
  onLampClick = evt => {
    const target = evt.target;
    const attr = target.attrs;
    const id = attr.id;
    let lamps = this.state.lamps;
    lamps = lamps.map(lamp => {
      if (lamp.id === id) {
        return Object.assign(lamp, { selected: !lamp.selected });
      }
      return lamp;
    });
    this.setState({
      lamps: lamps,
    });
  };
  setupLampData = (data, currentWidth, currentHeight) => {
    const defaultWidth = 1920;
    const defaultHeight = 1080;
    return data.map(item => ({
      ...item,
      x: (item.x / defaultWidth) * currentWidth,
      y: (item.y / defaultHeight) * currentHeight,
    }));
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

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      const { ...props } = values;
      let { lamps } = this.state;
      lamps = lamps.filter(item => item.selected === true);
      lamps = lamps.map(item => item.id);
      if (lamps.length === 0) {
        message.warn('请先选择灯具');
        return;
      }
      const data = {
        operatTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        lampIds: lamps.join(','),
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

  componentWillUnmount() {
    message.destroy();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { mapImage, width, height } = this.state;
    const { maps, fencingTypes, users, levels, areas } = this.props;
    return (
      <ContentBorder className={styles.auth_root}>
        <Form layout="inline" style={{ marginTop: '0.57rem' }} onSubmit={this.onSubmit}>
          <Row type="flex" justify="center" align="middle" className={styles.add}>
            <Col span={20}>
              {/*  <Col span={20}> */}
              <div className="add__inner--container">
                <Row type="flex" justify="center">
                  <Col span={10}>
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
                  <Col span={10}>
                    <Form.Item label="地图名称">
                      {getFieldDecorator('mapId', {
                        rules: [
                          {
                            message: '请选择地图名称',
                          },
                        ],
                      })(
                        <Select
                          getPopupContainer={triggerNode => triggerNode.parentElement}
                          placeholder="请选择地图名称"
                        >
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
                <Row type="flex" justify="center">
                  <Col span={10}>
                    <Form.Item label="区域级别">
                      {getFieldDecorator('regionalLevelId', {
                        rules: [
                          {
                            message: '请选择区域级别',
                          },
                        ],
                      })(
                        <Select
                          getPopupContainer={triggerNode => triggerNode.parentElement}
                          placeholder="请选择区域级别"
                        >
                          {levels.map(item => (
                            <Option value={item.id} key={item.name}>
                              {item.name}
                            </Option>
                          ))}
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={10} className={styles.text_areas}>
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
                      >
                        <Layer>
                          <ImageLayer
                            image={this.state.mapImage}
                            x={0}
                            y={0}
                            width={this.state.width}
                            height={this.state.height}
                          />
                          {this.createLamps()}
                        </Layer>
                      </Stage>
                    </div>
                  </Col>
                </Row>

                <Row type="flex" justify="center" style={{ marginTop: '0.35rem' }}>
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

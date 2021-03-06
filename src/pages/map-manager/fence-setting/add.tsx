/**
 * title: 添加
 */
import React from 'react';
import { Form, Row, Col, Button, Input, Select, DatePicker, Cascader } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import Konva from 'konva';
import { Stage, Layer, Image as ImageLayer, Line as LineLayer } from 'react-konva';
import router from 'umi/router';
import * as _ from 'lodash';

import ContentBorder from '../../../components/ContentBorder';
import { UmiComponentProps } from '@/common/type';
import {
  getAllMap,
  getAllFencingTypes,
  getAllUserInfo,
  getAllLevels,
  getAllArea,
} from '@/pages/login/login.service';

import { getSuperAdminList } from '@/pages/system-setting/services';

import { warningTypeSearch } from '@/pages/warning-manager/services';

import { addMapFencingArea, getAllLamps } from '../services';

import styles from './index.less';

const { TextArea } = Input;
const { Option } = Select;

interface Lamp {
  x: number;
  y: number;
  id: string;
}
interface State {
  mapImage: any;
  width: number;
  height: number;
  showLamps: Lamp[];
  icon: any;
  stageScale: number;
  stageX: number;
  stageY: number;
}
const scaleBy = 1.01;

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormComponentProps;

class FencingSetting extends React.Component<Props, State> {
  map: React.RefObject<HTMLDivElement>;
  constructor(props) {
    super(props);
    this.map = React.createRef<HTMLDivElement>();
    this.state = {
      mapImage: null,
      width: 0,
      height: 0,
      showLamps: [],
      icon: null,
      stageScale: 1,
      stageX: 0,
      stageY: 0,
    };
    this.initRequest = this.initRequest.bind(this);
  }

  dynamicLoadIconImage() {
    return new Promise(resolve => {
      const mapImage = new Image();
      mapImage.src = require('../../map-manager/assets/baoan.png');
      mapImage.onload = function() {
        resolve(mapImage);
      };
    });
  }
  async componentDidMount() {
    const mapImage = await this.dynamicLoadMapImage();
    const iconImage = await this.dynamicLoadIconImage();
    if (this.map.current) {
      const { clientWidth } = this.map.current;
      const clientHeight = Math.floor((clientWidth * 1080) / 1920);
      this.setState({
        icon: iconImage,
        mapImage,
        width: clientWidth,
        height: clientHeight,
      });
    }
    this.initRequest();
  }
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
    const lamps = await getAllLamps();

    const warningTypes = await warningTypeSearch({});

    this.props.dispatch({
      type: 'mapManager/update',
      payload: {
        warningTypes: warningTypes.records,
        allMaps: maps.result,
        fencingTypes: fencingTypes.result,
        users: users,
        levels: levels.result,
        areas: areas.result,
        lampsType: lamps.result,
      },
    });
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

  setupRelationPeople = () => {
    const { users } = this.props;
    const { getFieldDecorator } = this.props.form;

    return getFieldDecorator('userId', {
      rules: [],
    })(
      <Select
        getPopupContainer={triggerNode => triggerNode.parentElement}
        mode="multiple"
        placeholder="请选择关联人员"
      >
        {users.map(user => (
          <Option key={user.id} value={user.id}>
            {user.name}
          </Option>
        ))}
      </Select>,
    );
  };
  onLampSelectChange = e => {
    if (!this.map.current) return;
    const { clientWidth } = this.map.current;
    const clientHeight = Math.floor((clientWidth * 1080) / 1920);
    let _lamps = this.props.lampsType;
    // const routes = inspectionRoute && inspectionRoute.split(',');
    let showLamps = _.filter(_lamps, route => e.includes(route.id));

    showLamps = showLamps.map(lamp => ({
      x: _.isString(lamp.xcoordinate) && lamp.xcoordinate != '' ? +lamp.xcoordinate : 0,
      y: _.isString(lamp.ycoordinate) && lamp.ycoordinate != '' ? +lamp.ycoordinate : 0,
      id: lamp.id,
    }));
    const currentLamps = this.setupLampData(showLamps, clientWidth, clientHeight);
    this.setState({
      showLamps: currentLamps,
    });
  };
  setupLampData = (data, currentWidth, currentHeight) => {
    const defaultWidth = 1920;
    const defaultHeight = 1080;
    return data.map(item => ({
      x: (item.x / defaultWidth) * currentWidth,
      y: (item.y / defaultHeight) * currentHeight,
    }));
  };
  createLamps() {
    const lamps = this.state.showLamps;
    if (lamps.length === 0) return;
    return lamps.map((lamp, index) => (
      <ImageLayer
        image={this.state.icon}
        x={lamp.x - 16}
        y={lamp.y - 16}
        width={32}
        height={32}
        key={index}
      />
    ));
  }
  setupShowLamps = () => {
    const { lampsType } = this.props;
    const { getFieldDecorator } = this.props.form;
    return getFieldDecorator('lampIds', {
      rules: [],
    })(
      <Select
        getPopupContainer={triggerNode => triggerNode.parentElement}
        mode="multiple"
        placeholder="请选择灯具设置围栏"
        onChange={this.onLampSelectChange}
      >
        {lampsType.map(lamp => (
          <Option key={lamp.id} value={lamp.id}>
            {lamp.lampCode}
          </Option>
        ))}
      </Select>,
    );
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      const { effectiveTime, failureTime, userId = [], lampIds = [], ...props } = values;
      const data = {
        ...props,
        effectiveTime: values.effectiveTime
          ? values.effectiveTime.format('YYYY-MM-DD HH:mm:ss').toString()
          : '',
        failureTime: values.failureTime
          ? values.failureTime.format('YYYY-MM-DD HH:mm:ss').toString()
          : '',
        userId: userId.join(','),
        lampIds: lampIds.join(','),
      };
      const isSuccessed = await addMapFencingArea(data);
      isSuccessed && router.push('/map-manager/fence-setting');
    });
  };

  onBack = () => {
    router.push('/map-manager/fence-setting');
  };
  areaSelectChange = value => {
    //根据区域过滤灯具
    getAllLamps({ id: value }).then(lamps => {
      this.props.dispatch({
        type: 'mapManager/update',
        payload: {
          lampsType: lamps.result,
        },
      });
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { mapImage, width, height } = this.state;
    let { maps, fencingTypes, users, levels, areas, warningTypes } = this.props;
    const createdLamps = this.createLamps();
    // areas = [{ name: '全部', value: undefined }].concat(areas);
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
                  <Form.Item label="围栏名称">
                    {getFieldDecorator('name', {
                      rules: [
                        {
                          message: '请输入围栏名称',
                        },
                      ],
                    })(<Input placeholder="请输入围栏名称" />)}
                  </Form.Item>
                  <Form.Item label="围栏类型">
                    {getFieldDecorator('typeId', {
                      rules: [
                        {
                          message: '请选择围栏类型',
                        },
                      ],
                    })(
                      <Select
                        getPopupContainer={triggerNode => triggerNode.parentElement}
                        placeholder="请选择围栏类型"
                      >
                        {fencingTypes.map(item => (
                          <Option value={item.id} key={item.name}>
                            {item.name}
                          </Option>
                        ))}
                      </Select>,
                    )}
                  </Form.Item>
                  <Form.Item label="是否永久">
                    {getFieldDecorator('isForever', {
                      rules: [
                        {
                          message: '请选择是否永久',
                        },
                      ],
                    })(
                      <Select
                        getPopupContainer={triggerNode => triggerNode.parentElement}
                        placeholder="请选择是否永久"
                      >
                        <Option value="0">是</Option>
                        <Option value="1">否</Option>
                      </Select>,
                    )}
                  </Form.Item>
                  {/* </Col>
              </Row>

              <Row type="flex" justify="space-between">
                <Col span={24}> */}
                  <Form.Item label="生效时间">
                    {getFieldDecorator('effectiveTime', {
                      rules: [],
                    })(
                      <DatePicker
                        showTime={true}
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="请选择开始时间"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item label="失效时间">
                    {getFieldDecorator('failureTime', {
                      rules: [],
                    })(
                      <DatePicker
                        showTime={true}
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="请选择失效时间"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item label="级别">
                    {getFieldDecorator('levelId', {
                      rules: [
                        {
                          message: '请选择级别',
                        },
                      ],
                    })(
                      <Select
                        getPopupContainer={triggerNode => triggerNode.parentElement}
                        placeholder="请选择级别"
                      >
                        {levels.map(item => (
                          <Option value={item.id} key={item.name}>
                            {item.name}
                          </Option>
                        ))}
                      </Select>,
                    )}
                  </Form.Item>
                  <Form.Item label="人员数量">
                    {getFieldDecorator('maxUser', {
                      rules: [
                        {
                          message: '请输入最大人员数量',
                        },
                      ],
                    })(<Input placeholder="请输入最大人员数量" />)}
                  </Form.Item>
                  {/* </Col>
              </Row>
              <Row type="flex" justify="space-between">
                <Col span={24}> */}
                  <Form.Item label="关联人员">{this.setupRelationPeople()}</Form.Item>

                  <Form.Item label="围栏设置">{this.setupShowLamps()}</Form.Item>

                  {/* </Col>
              </Row>

              <Row type="flex" justify="space-between">
                <Col span={24}> */}
                  <Form.Item label="告警类型" className={styles.area_style}>
                    {getFieldDecorator('warnModeId', {
                      rules: [],
                    })(
                      <Select
                        getPopupContainer={triggerNode => triggerNode.parentElement}
                        placeholder="请选择告警方式"
                      >
                        {warningTypes.map(type => (
                          <Option value={type.id} key={type.id}>
                            {type.name}
                          </Option>
                        ))}
                      </Select>,
                    )}
                  </Form.Item>
                  <Form.Item className={styles.area_style} style={{ width: '6rem' }} label="区域">
                    {getFieldDecorator('regionalId', {
                      rules: [
                        {
                          message: '请选择区域',
                        },
                      ],
                    })(
                      <Select
                        getPopupContainer={triggerNode => triggerNode.parentElement}
                        placeholder="请选择区域"
                        // style={{ width: '5.25rem', backgroundSize: '5.25rem 40px' }}
                        onSelect={this.areaSelectChange}
                      >
                        {areas.map(item => (
                          <Option key={item.name} value={item.id}>
                            {item.name}
                          </Option>
                        ))}
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
                <Col className={styles.img_type} span={24}>
                  <div className={styles.map_manager} ref={this.map}>
                    <Stage
                      width={width}
                      height={height}
                      draggable={false}
                      onWheel={this.onWheel}
                      scaleX={this.state.stageScale}
                      scaleY={this.state.stageScale}
                      x={this.state.stageX}
                      y={this.state.stageY}
                    >
                      <Layer>
                        <ImageLayer image={mapImage} x={0} y={0} width={width} height={height} />
                        {createdLamps}
                      </Layer>
                    </Stage>
                  </div>
                </Col>
              </Row>

              <Row type="flex" justify="center" style={{ marginTop: '0.35rem' }}>
                <Col span={4}>
                  <Form.Item className={styles.button_type}>
                    <Button className={styles.form_btn} htmlType="submit">
                      确认
                    </Button>
                  </Form.Item>
                </Col>
                <Col span={2} className={styles.select_padding_left}>
                  <Form.Item>
                    <Button className={styles.form_btn} onClick={this.onBack}>
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

const FencingSettingHOC = Form.create<Props>({ name: 'fencing_setting_add' })(FencingSetting);

const mapState = ({ mapManager }) => {
  const { allMaps, fencingTypes, users, levels, areas, lampsType } = mapManager;
  return {
    mapFencing: mapManager.mapFencing,
    maps: allMaps,
    fencingTypes,
    users,
    levels,
    areas,
    lampsType,
    warningTypes: mapManager.warningTypes,
  };
};

export default connect(mapState)(FencingSettingHOC);

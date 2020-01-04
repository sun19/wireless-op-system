/**
 * title: 修改
 */
import React from 'react';
import { Form, Row, Col, Button, Input, Select, DatePicker } from 'antd';
import router from 'umi/router';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import Konva from 'konva';
import moment from 'moment';

import {
  Stage,
  Layer,
  Image as ImageLayer,
  Circle as CircleLayer,
  Line as LineLayer,
} from 'react-konva';
import * as _ from 'lodash';

import ContentBorder from '../../../components/ContentBorder';
import { warningTypeSearch } from '@/pages/warning-manager/services';
import { UmiComponentProps } from '@/common/type';
import { getSuperAdminList } from '@/pages/system-setting/services';
import { getAllMap } from '@/pages/login/login.service';
import { getAllWarningType, updatePollingLine, getMapLamps } from '../services';

import styles from './index.less';

const { TextArea } = Input;
const { Option } = Select;

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormComponentProps;

interface Lamp {
  x: number;
  y: number;
  id: string;
}
interface State {
  warningTypes: any[];
  mapImage: any;
  width: number;
  height: number;
  circleX: number;
  circleY: number;
  circleShow: boolean;
  showLamps: Lamp[];
  icon: any;
  stageScale: number;
  stageX: number;
  stageY: number;
  warnModeName: string;
  repeatTypeName: string;
}
const scaleBy = 1.01;

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
      showLamps: [],
      icon: null,
      stageScale: 1,
      stageX: 0,
      stageY: 0,
      warnModeName: '',
      repeatTypeName: '',
    };
  }
  goBack = () => {
    this.props.form.resetFields();
    router.push('/map-manager/prohibit-area');
  };

  selectAlarmName = (e, key) => {
    this.setState({
      warnModeName: key.key,
    });
  };
  selectRepeatName = (e, key) => {
    this.setState({
      repeatTypeName: key.key,
    });
  };

  setupAlarmSelect = () => {
    const { getFieldDecorator } = this.props.form;
    const { warningTypes } = this.state;

    const { pollingLinesRecord } = this.props;

    return (
      <Form.Item label="告警方式" className={styles.area_style}>
        {getFieldDecorator('warnMode', {
          rules: [],
          initialValue: pollingLinesRecord.warnMode,
        })(
          <Select
            getPopupContainer={triggerNode => triggerNode.parentElement}
            placeholder="告警方式"
            onSelect={this.selectAlarmName.bind(this)}
          >
            {warningTypes.map((item, index) => (
              <Option value={item.dictValue} key={item.dictName}>
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
    if (this.map.current) {
      const { clientWidth } = this.map.current;
      const clientHeight = Math.floor((clientWidth * 1080) / 1920);

      const mapImage = await this.dynamicLoadMapImage();
      const iconImage = await this.dynamicLoadIconImage();
      this.setState({
        icon: iconImage,
        mapImage,
        width: clientWidth,
        height: clientHeight,
      });
    }
    const warningTypes = await getAllWarningType();
    this.setState({
      warningTypes: (warningTypes.result && warningTypes.result.records) || [],
    });
    this.initRequest();

    const { pollingLinesRecord } = this.props;

    this.setState({
      warnModeName: pollingLinesRecord.warnModeName,
      repeatTypeName: pollingLinesRecord.repeatTypeName,
    });
  }
  async initRequest() {
    if (!this.map.current) return;
    const { clientWidth } = this.map.current;
    const clientHeight = Math.floor((clientWidth * 1080) / 1920);
    const maps = await getAllMap();
    //获取到所有的灯具信息
    let lamps = await getMapLamps({});
    const repeatTypes = await getSuperAdminList({
      type: 'repeatType',
      isShow: '1',
    });
    this.props.dispatch({
      type: 'mapManager/update',
      payload: {
        allMaps: maps.result,
        lamps: lamps.result,
        repeatTypes: repeatTypes.records || [],
      },
    });
    let _lamps = lamps.result || {};
    if (_.isEmpty(_lamps)) _lamps = { records: [] };
    //根据已选择的巡检路线，匹配灯具
    const { pollingLinesRecord } = this.props;
    const { inspectionRoute = '' } = pollingLinesRecord;
    const routes = inspectionRoute && inspectionRoute.split(',');
    // let showLamps = _.filter(_lamps.records, route => routes.includes(route.id));
    let showLamps = [];
    for (let i = 0, len = routes.length; i < len; i++) {
      const route = routes[i];
      for (let j = 0; j < _lamps.records.length; j++) {
        const lamp = _lamps.records[j];
        if (lamp.id == route) {
          showLamps.push(lamp);
        }
      }
    }
    // let showLamps = _lamps.records;
    showLamps = showLamps.map(lamp => ({
      x: _.isString(lamp.xcoordinate) && lamp.xcoordinate != '' ? +lamp.xcoordinate : 0,
      y: _.isString(lamp.ycoordinate) && lamp.ycoordinate != '' ? +lamp.ycoordinate : 0,
      id: lamp.id,
    }));
    const currentLamps = this.setupLampData(showLamps, clientWidth, clientHeight);
    this.setState({
      showLamps: currentLamps,
    });
  }
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
  createLampLines = () => {
    const lamps = this.state.showLamps;
    const line = [];
    lamps.forEach(lamp => {
      line.push(lamp.x);
      line.push(lamp.y);
    });
    return (
      <LineLayer points={line} stroke="#1296db" strokeWidth={5} linecap="round" lineJoin="round" />
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
    this.setState({
      circleX: Math.floor(mousePointTo.x),
      circleY: Math.floor(mousePointTo.y),
    });
    this.props.form.setFieldsValue({
      xCoordinate: Math.floor((event.layerX * defaultWidth) / clientWidth),
    });
    this.props.form.setFieldsValue({
      yCoordinate: Math.floor((event.layerY * defaultHeight) / clientHeight),
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const { pollingLinesRecord } = this.props;

    const { warnModeName, repeatTypeName } = this.state;

    this.props.form.validateFields(async (err, values) => {
      const { startTime, endTime, ...props } = values;
      const data = {
        ...props,
        startTime:
          (values.startTime && values.startTime.format('YYYY-MM-DD HH:mm:ss').toString()) || '',
        endTime: (values.endTime && values.endTime.format('YYYY-MM-DD HH:mm:ss').toString()) || '',
        inspectionRoute: values.inspectionRoute.join(','),
        type: 2,
        warnModeName: warnModeName,
        repeatTypeName: repeatTypeName,
      };
      await updatePollingLine(Object.assign({}, pollingLinesRecord, data));
      router.push('/map-manager/prohibit-area');
    });
  };

  onLampSelectChange = e => {
    if (!this.map.current) return;
    const { clientWidth } = this.map.current;
    const clientHeight = Math.floor((clientWidth * 1080) / 1920);
    let _lamps = this.props.lamps;
    let showLamps = [];
    for (let i = 0, len = e.length; i < len; i++) {
      const route = e[i];
      for (let j = 0; j < _lamps.records.length; j++) {
        const lamp = _lamps.records[j];
        if (lamp.id == route) {
          showLamps.push(lamp);
        }
      }
    }
    // let showLamps = _lamps.records;
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
  render() {
    const { getFieldDecorator } = this.props.form;
    let { maps, pollingLinesRecord, lamps, repeatTypes } = this.props;
    if (_.isEmpty(lamps)) lamps = { records: [] };
    const createdLamps = this.createLamps();
    const createdLine = this.createLampLines();
    const { mapImage, width, height } = this.state;

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
                  <Form.Item label="巡检路线">
                    {getFieldDecorator('inspectionRoute', {
                      rules: [],
                      initialValue:
                        (pollingLinesRecord.inspectionRoute &&
                          pollingLinesRecord.inspectionRoute.split(',')) ||
                        [],
                    })(
                      <Select
                        getPopupContainer={triggerNode => triggerNode.parentElement}
                        mode="multiple"
                        placeholder="请选择灯具，设置巡检路线"
                        onChange={this.onLampSelectChange}
                      >
                        {lamps.records.map(lamp => (
                          <Option key={lamp.id} value={lamp.id}>
                            {lamp.lampCode}
                          </Option>
                        ))}
                      </Select>,
                    )}
                  </Form.Item>
                  <Form.Item label="开始时间">
                    {getFieldDecorator('startTime', {
                      rules: [],
                      initialValue: moment(pollingLinesRecord.startTime),
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
                      initialValue: moment(pollingLinesRecord.endTime),
                    })(
                      <DatePicker
                        showTime={true}
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="请选择结束时间"
                      />,
                    )}
                  </Form.Item>
                  {/* </Col>
              </Row>

              <Row type="flex" justify="space-between">
                <Col span={24}> */}
                  {this.setupAlarmSelect()}
                  <Form.Item label="重复类型">
                    {getFieldDecorator('repeatType', {
                      rules: [
                        {
                          message: '请输入重复类型',
                        },
                      ],
                      initialValue: pollingLinesRecord.repeatType,
                    })(
                      <Select
                        getPopupContainer={triggerNode => triggerNode.parentElement}
                        placeholder="请选择重复类型"
                        onSelect={this.selectRepeatName.bind(this)}
                      >
                        {repeatTypes.map(type => (
                          <Option value={type.dictValue} key={type.dictName}>
                            {type.dictName}
                          </Option>
                        ))}
                      </Select>,
                    )}
                  </Form.Item>
                  <Form.Item className={styles.area_style} label="巡检名称">
                    {getFieldDecorator('name', {
                      rules: [],
                      initialValue: pollingLinesRecord.name,
                    })(
                      <Input
                        placeholder="请输入巡检名称"
                        // style={{ width: '11.8rem', backgroundSize: '11.8rem 0.4rem' }}
                      />,
                    )}
                  </Form.Item>
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
                        // style={{ width: '11.8rem', backgroundSize: '11.8rem 0.4rem' }}
                      />,
                    )}
                  </Form.Item>
                </Col>
              </Row>

              {/* <Row type="flex" justify="space-between">
                <Col span={24}>

                </Col>
              </Row> */}

              <Row className={styles.line_style}>
                <Col className={styles.line_type} span={11} />
                <Col span={2}>地图</Col>
                <Col className={styles.line_type} span={11} />
              </Row>
              <Row>{/* <div className={styles.tips}>请点选或拖拽灯具至指定位置</div> */}</Row>
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
                        {createdLamps}
                        {createdLine}
                        {/* {this.setupCircle()} */}
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
                <Col span={4} className={styles.select_padding_left}>
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
  const {
    allMaps,
    fencingTypes,
    users,
    levels,
    areas,
    repeatTypes,
    pollingLinesRecord,
    lamps,
  } = mapManager;
  return {
    mapFencing: mapManager.mapFencing,
    maps: allMaps,
    fencingTypes,
    users,
    levels,
    areas,
    pollingLinesRecord,
    lamps,
    repeatTypes,
  };
};

export default connect(mapState)(AddPollingLineHOC);

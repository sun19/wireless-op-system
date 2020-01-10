/**
 * title: 修改
 */
import React from 'react';
import { Form, Row, Col, Button, Input, Select, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import Konva from 'konva';
import { Stage, Layer, Image as ImageLayer, Line as LineLayer } from 'react-konva';
import router from 'umi/router';
import moment from 'moment';
import * as _ from 'lodash';

import ContentBorder from '../../../components/ContentBorder';
import { UmiComponentProps } from '@/common/type';
import { getAllMaps, getAllAreas, wraningTypeEdit } from '../services';
import { getAllLamps } from '@/pages/map-manager/services';
import { getSuperAdminList } from '@/pages/system-setting/services';

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
  mapImage: any;
  width: number;
  height: number;
  showLamps: Lamp[];
  icon: any;
  stageScale: number;
  stageX: number;
  stageY: number;
  warnModeName: string;
  repeatTypeName: string;
}

const scaleBy = 1.01;

class EditType extends React.Component<Props, State> {
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
      warnModeName: '',
      repeatTypeName: '',
    };
    this.onSearch = this.onSearch.bind(this);
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

    let { typeRecord } = this.props;

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

    this.setState({
      warnModeName: typeRecord.warnModeName,
      repeatTypeName: typeRecord.repeatTypeName,
    });
  }

  async initRequest() {
    const maps = await getAllMaps();
    const areas = await getAllAreas();
    const lamps = await getAllLamps();
    const warningTypes = await getSuperAdminList({
      type: 'alarmType',
      isShow: '1',
    });
    const repeatTypes = await getSuperAdminList({
      type: 'repeatType',
      isShow: '1',
    });
    this.props.dispatch({
      type: 'warningManager/update',
      payload: {
        maps: maps.result,
        areas: areas.result,
        warningTypes: warningTypes.records || [],
        repeatTypes: repeatTypes.records || [],
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
  setupMapSelect = () => {
    let { maps, typeRecord } = this.props;
    const { getFieldDecorator } = this.props.form;
    if (maps.length === 0) return;
    return getFieldDecorator('mapName', {
      rules: [],
      initialValue: typeRecord.mapId,
    })(
      <Select
        getPopupContainer={triggerNode => triggerNode.parentElement}
        placeholder="请选择所属地图"
      >
        {maps.map(item => (
          <Option value={item.id} key={item.name}>
            {item.name}
          </Option>
        ))}
      </Select>,
    );
  };
  setupAreaSelect = () => {
    let { areas, typeRecord } = this.props;
    const { getFieldDecorator } = this.props.form;
    if (areas.length === 0) return;
    return getFieldDecorator('regionalId', {
      rules: [],
      initialValue: typeRecord.regionalId,
    })(
      <Select
        getPopupContainer={triggerNode => triggerNode.parentElement}
        placeholder="请选择所属区域"
      >
        {areas.map(item => (
          <Option value={item.id} key={item.name}>
            {item.name}
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
        style={{ width: '210px' }}
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

  async onSearch(e) {
    e.preventDefault();
    const { typeRecord } = this.props;

    const { repeatTypeName, warnModeName } = this.state;

    this.props.form.validateFields(async (err, values) => {
      const { startTime, endTime, overrunTime, ...props } = values;
      const data = {
        ...props,
        startTime:
          (values.startTime && values.startTime.format('YYYY-MM-DD HH:mm:ss').toString()) || '',
        endTime: (values.endTime && values.endTime.format('YYYY-MM-DD HH:mm:ss').toString()) || '',
        overrunTime:
          (values.overrunTime && values.overrunTime.format('YYYY-MM-DD HH:mm:ss').toString()) || '',
        repeatTypeName: repeatTypeName,
        warnModeName: warnModeName,
      };
      await wraningTypeEdit(Object.assign(typeRecord, data));
      router.push('/warning-manager/type');
    });
  }

  onClear = () => {
    this.props.form.resetFields();
    router.push('/warning-manager/type');
  };
  stringifyTime = time => {
    return time.toString();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { mapImage, width, height } = this.state;
    const { warningTypes, repeatTypes, typeRecord } = this.props;
    const createdLamps = this.createLamps();
    return (
      <ContentBorder className={styles.auth_root}>
        <Form
          layout="inline"
          labelAlign="right"
          style={{ marginTop: '0.57rem' }}
          onSubmit={this.onSearch}
        >
          <div className="auth__inner--container">
            <div className={styles.input_body}>
              <Row type="flex" justify="space-between">
                <Col span={24}>
                  <Form.Item label="告警名称">
                    {getFieldDecorator('name', {
                      rules: [],
                      initialValue: typeRecord.name,
                    })(<Input placeholder="请输入告警名称" />)}
                  </Form.Item>
                  <Form.Item label="所属地图">{this.setupMapSelect()}</Form.Item>
                  {/* <Form.Item label="区域选择">{this.setupAreaSelect()}</Form.Item>
                  <Form.Item label="关联标签">
                    {getFieldDecorator('informationBoardId', {
                      rules: [],
                      initialValue: typeRecord.informationBoardName,
                    })(<Input placeholder="请输入关联标签" />)}
                  </Form.Item>
        
                  <Form.Item label="开始时间">
                    {getFieldDecorator('startTime', {
                      rules: [],
                      initialValue: moment(typeRecord.startTime),
                    })(
                      <DatePicker
                        showTime={true}
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="请选择开始时间"
                        onChange={this.stringifyTime}
                      />,
                    )}
                  </Form.Item>
                  <Form.Item label="结束时间">
                    {getFieldDecorator('endTime', {
                      rules: [],
                      initialValue: moment(typeRecord.endTime),
                    })(
                      <DatePicker
                        showTime={true}
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="请选择结束时间"
                        onChange={this.stringifyTime}
                      />,
                    )}
                  </Form.Item>
                  <Form.Item label="聚集半径">
                    {getFieldDecorator('aggregateRadius', {
                      rules: [],
                      initialValue: typeRecord.aggregateRadius,
                    })(<Input placeholder="请输入聚集半径" />)}
                  </Form.Item>
                  <Form.Item label="超限人数">
                    {getFieldDecorator('overrunNum', {
                      rules: [],
                      initialValue: typeRecord.overrunNum,
                    })(<Input placeholder="请输入超限人数" />)}
                  </Form.Item>
                  <Form.Item label="超限时间">
                    {getFieldDecorator('overrunTime', {
                      rules: [],
                      initialValue: moment(typeRecord.overrunTime),
                    })(
                      <DatePicker
                        showTime={true}
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="请选择超限时间"
                        onChange={this.stringifyTime}
                      />,
                    )}
                  </Form.Item>
                  <Form.Item label="重复类型">
                    {getFieldDecorator('repeatType', {
                      rules: [],
                      initialValue: typeRecord.repeatType,
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
                  </Form.Item> */}
                  <Form.Item label="告警方式" className={styles.area_style}>
                    {getFieldDecorator('warnMode', {
                      rules: [],
                      initialValue: typeRecord.warnMode,
                    })(
                      <Select
                        getPopupContainer={triggerNode => triggerNode.parentElement}
                        placeholder="请选择告警方式"
                        onSelect={this.selectAlarmName.bind(this)}
                      >
                        {warningTypes.map(type => (
                          <Option value={type.dictValue} key={type.dictName}>
                            {type.dictName}
                          </Option>
                        ))}
                      </Select>,
                    )}
                  </Form.Item>
                  <Form.Item label="关联灯具">{this.setupShowLamps()}</Form.Item>
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
                <Col span={4} className={styles.select_padding_left}>
                  <Form.Item>
                    <Button className={styles.form_btn} onClick={this.onClear}>
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

const FormUserAuth = Form.create<Props>({ name: 'warn_manager_type_add' })(EditType);

const mapState = ({ warningManager }) => {
  return {
    warningTypes: warningManager.warningTypes,
    repeatTypes: warningManager.repeatTypes,
    maps: warningManager.maps,
    areas: warningManager.areas,
    typeRecord: warningManager.typeRecord,
    lampsType: warningManager.lampsType,
  };
};

export default connect(mapState)(FormUserAuth);

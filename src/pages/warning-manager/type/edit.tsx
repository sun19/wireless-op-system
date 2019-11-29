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

import ContentBorder from '../../../components/ContentBorder';
import { UmiComponentProps } from '@/common/type';
import { getAllMaps, getAllAreas, wraningTypeEdit } from '../services';
import { getSuperAdminList } from '@/pages/system-setting/services';

import styles from './index.less';

const { TextArea } = Input;
const { Option } = Select;

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormComponentProps;

interface State {
  mapImage: any;
  width: number;
  height: number;
}

class UserAuth extends React.Component<Props, State> {
  map: React.RefObject<HTMLDivElement>;
  constructor(props) {
    super(props);
    this.map = React.createRef<HTMLDivElement>();
    this.state = {
      mapImage: null,
      width: 0,
      height: 0,
    };
    this.onSearch = this.onSearch.bind(this);
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
    this.initRequest();
  }

  async initRequest() {
    const maps = await getAllMaps();
    const areas = await getAllAreas();
    const warningTypes = await getSuperAdminList({
      type: 'alarmType',
    });
    const repeatTypes = await getSuperAdminList({
      type: 'repeatType',
    });
    this.props.dispatch({
      type: 'warningManager/update',
      payload: {
        maps: maps.result,
        areas: areas.result,
        warningTypes: warningTypes.records || [],
        repeatTypes: repeatTypes.records || [],
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

  setupMapSelect = () => {
    let { maps, typeRecord } = this.props;
    const { getFieldDecorator } = this.props.form;
    if (maps.length === 0) return;
    return getFieldDecorator('mapName', {
      rules: [],
      initialValue: typeRecord.mapName,
    })(
      <Select placeholder="请选择所属地图">
        {maps.map(item => (
          <Option value={item.name} key={item.name}>
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
    return getFieldDecorator('regionalName', {
      rules: [],
      initialValue: typeRecord.mapName,
    })(
      <Select placeholder="请选择所属区域">
        {areas.map(item => (
          <Option value={item.name} key={item.name}>
            {item.name}
          </Option>
        ))}
      </Select>,
    );
  };
  async onSearch(e) {
    e.preventDefault();
    const { typeRecord } = this.props;
    this.props.form.validateFields(async (err, values) => {
      const { startTime, endTime, overrunTime, ...props } = values;
      const data = {
        ...props,
        startTime: values.startTime&&values.startTime.format('YYYY-MM-DD HH:mm:ss').toString()||'',
        endTime: values.endTime&&values.endTime.format('YYYY-MM-DD HH:mm:ss').toString() ||'',
        overrunTime: values.overrunTime&&values.overrunTime.format('YYYY-MM-DD HH:mm:ss').toString()||'',
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
                  <Form.Item label="区域选择">{this.setupAreaSelect()}</Form.Item>
                  <Form.Item label="关联标签">
                    {getFieldDecorator('informationBoardName', {
                      rules: [],
                      initialValue: typeRecord.informationBoardName,
                    })(<Input placeholder="请输入关联标签" />)}
                  </Form.Item>
                </Col>
              </Row>

              <Row type="flex" justify="space-between">
                <Col span={24}>
                  <Form.Item label="开始时间">
                    {getFieldDecorator('startTime', {
                      rules: [],
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
                </Col>
              </Row>

              <Row type="flex" justify="space-between">
                <Col span={24}>
                  <Form.Item label="超限时间">
                    {getFieldDecorator('overrunTime', {
                      rules: [],
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
                      <Select placeholder="每天">
                        {repeatTypes.map(type => (
                          <Option value={type.dictValue} key={type.dictValue}>
                            {type.dictName}
                          </Option>
                        ))}
                      </Select>,
                    )}
                  </Form.Item>
                  <Form.Item label="告警方式" className={styles.area_style}>
                    {getFieldDecorator('warnMode', {
                      rules: [],
                      initialValue: typeRecord.warnMode,
                    })(
                      <Select placeholder="弹框">
                        {warningTypes.map(type => (
                          <Option value={type.dictValue} key={type.dictValue}>
                            {type.dictName}
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
                    <Stage width={width} height={height} draggable={false}>
                      <Layer>
                        <ImageLayer image={mapImage} x={0} y={0} width={width} height={height} />
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

const FormUserAuth = Form.create<Props>({ name: 'warn_manager_type_add' })(UserAuth);

const mapState = ({ warningManager }) => {
  return {
    warningTypes: warningManager.warningTypes,
    repeatTypes: warningManager.repeatTypes,
    maps: warningManager.maps,
    areas: warningManager.areas,
    typeRecord: warningManager.typeRecord,
  };
};

export default connect(mapState)(FormUserAuth);

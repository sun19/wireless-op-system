/**
 * title: 添加
 */
import React from 'react';
import { Form, Row, Col, Button, Input, Select } from 'antd';
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
import { FormComponentProps } from 'antd/lib/form';

import { UmiComponentProps } from '@/common/type';
import ContentBorder from '../../../components/ContentBorder';
// import Map from '../components/Map';
import { getAllArea, getAllMap } from '@/pages/login/login.service';
import { addMapLamps } from '../services';

import styles from './index.less';

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
}
interface FormProps extends FormComponentProps {}

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormProps;
const scaleBy = 1.01;

class halmpAdd extends React.Component<Props, State> {
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
    };
    this.initRequest = this.initRequest.bind(this);
  }

  goBack = () => {
    this.props.form.resetFields();
    router.push('/map-manager/lamps-set');
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      await addMapLamps(values);
      router.push('/map-manager/lamps-set');
    });
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
      const { clientHeight } = this.map.current;
      const clientWidth = Math.floor((clientHeight * 1920) / 1080);

      this.setState({
        mapImage,
        width: clientWidth,
        height: clientHeight,
      });
    }
    this.initRequest();
  }

  async initRequest() {
    const areas = await getAllArea();
    const maps = await getAllMap();
    this.props.dispatch({
      type: 'mapManager/update',
      payload: {
        areas: areas.result,
        allMaps: maps.result,
      },
    });
  }
  onCircleDragging = (event: any) => {
    const defaultWidth = 1920;
    const defaultHeight = 1080;
    const { clientHeight } = this.map.current;
    const clientWidth = Math.floor((clientHeight * 1920) / 1080);

    const evt = event.evt;
    //换算由于地图拉伸造成的坐标不一致
    this.props.form.setFieldsValue({
      xCoordinate: Math.floor((evt.layerX * defaultWidth) / clientWidth),
    });
    this.props.form.setFieldsValue({
      yCoordinate: Math.floor((evt.layerY * defaultHeight) / clientHeight),
    });
  };
  onCircleClick = (event: any) => {
    const defaultWidth = 1920;
    const defaultHeight = 1080;
    const { clientHeight } = this.map.current;
    const clientWidth = Math.floor((clientHeight * 1920) / 1080);

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
    const { clientHeight } = this.map.current;
    const clientWidth = Math.floor((clientHeight * 1920) / 1080);
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const { areas, maps } = this.props;
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
                  <Form.Item label="编号">
                    {getFieldDecorator('lampCode', {
                      rules: [],
                    })(<Input placeholder="请输入编号" />)}
                  </Form.Item>
                  <Form.Item label="型号">
                    {getFieldDecorator('model', {
                      rules: [
                        {
                          message: '请输入型号',
                        },
                      ],
                    })(<Input placeholder="请输入型号" />)}
                  </Form.Item>
                  <Form.Item label="横坐标" className={styles.small_style}>
                    {getFieldDecorator('xCoordinate', {
                      rules: [],
                    })(
                      <Input
                        style={{ width: '1rem', backgroundSize: '1rem 0.4rem' }}
                        placeholder="横坐标"
                        disabled={true}
                      />,
                    )}
                  </Form.Item>
                  <Form.Item label="纵坐标" className={styles.small_style}>
                    {getFieldDecorator('yCoordinate', {
                      rules: [],
                    })(
                      <Input
                        style={{ width: '1rem', backgroundSize: '1rem 0.4rem' }}
                        placeholder="纵坐标"
                        disabled={true}
                      />,
                    )}
                  </Form.Item>
                  <Form.Item label="区域">
                    {getFieldDecorator('regionalId', {
                      rules: [],
                    })(
                      <Select placeholder="请选择区域">
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

              <Row type="flex" justify="space-between">
                <Col span={24}>
                  <Form.Item label="出入口" className={styles.area_style}>
                    {getFieldDecorator('entranceExit', {
                      rules: [],
                    })(
                      <Select placeholder="请选择出入口">
                        <Option value="0">出口</Option>
                        <Option value="1">入口</Option>
                      </Select>,
                    )}
                  </Form.Item>
                  {/* 暂不清楚是否需要，勿删 */}
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
                        style={{ width: '8.6rem', backgroundSize: '8.6rem 0.4rem' }}
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
                <div className={styles.tips}>请点击或拖拽灯具至指定位置</div>
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
const HalmpAdd = Form.create<Props>({ name: 'halmp_add' })(halmpAdd);

const mapState = ({ mapManager }) => {
  const resp = mapManager.lamps;
  return {
    lamps: resp,
    maps: mapManager.allMaps,
    areas: mapManager.areas,
  };
};

export default connect(mapState)(HalmpAdd);

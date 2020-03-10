/**
 * title: 添加
 */
import React from 'react';
import { Form, Row, Col, Button, Input, Select, message, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import {
  Stage,
  Layer,
  Image as ImageLayer,
  Line as LineLayer,
  Circle as CircleLayer,
} from 'react-konva';
import { connect } from 'dva';
import router from 'umi/router';

import ContentBorder from '../../../components/ContentBorder';
import { addPollingPoint } from '../services';
import { getAllMap } from '@/pages/login/login.service';
import { UmiComponentProps } from '@/common/type';

// import { InputText, TreeNodeMenu } from '../components';

import styles from './index.less';

const { TextArea } = Input;
const { Option } = Select;

const scaleBy = 1.01;

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

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormComponentProps;
// interface Props extends FormComponentProps {}
interface State {}
class AddPollingPoint extends React.Component<Props, State> {
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
      stageScale: 1,
      stageX: 0,
      stageY: 0,
      circleShow: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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
    const { clientWidth } = this.map.current;
    const clientHeight = Math.floor((clientWidth * 1080) / 1920);
    const evt = event.evt;
    //换算由于地图拉伸造成的坐标不一致
    this.props.form.setFieldsValue({
      xCoordinate: Math.floor((evt.layerX * defaultWidth) / clientWidth),
    });
    this.props.form.setFieldsValue({
      yCoordinate: Math.floor((evt.layerY * defaultHeight) / clientHeight),
    });
  };

  async initRequest() {
    let maps = await getAllMap();

    this.props.dispatch({
      type: 'mapManager/update',
      payload: {
        allMaps: maps.result,
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        // console.error(err, values, 'err');
        message.error('填写信息有误 ', values);
        return;
      }
      const { startTime, endTime, userId = [], ...props } = values;
      const data = {
        ...props,
        startTime: values.startTime
          ? values.startTime.format('YYYY-MM-DD HH:mm:ss').toString()
          : '',
        endTime: values.endTime ? values.endTime.format('YYYY-MM-DD HH:mm:ss').toString() : '',
      };
      const isSuccessed = await addPollingPoint(data);
      if (isSuccessed) {
        setTimeout(() => router.push('/map-manager/polling-point'), 1000);
      }
    });
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

  back = () => {
    router.goBack();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { mapImage, width, height } = this.state;
    const { maps } = this.props;

    return (
      <ContentBorder className={styles.auth_root}>
        <Form
          layout="inline"
          labelAlign="right"
          style={{ marginTop: '0.57rem' }}
          onSubmit={this.handleSubmit}
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
                  <Form.Item label="巡检点名称">
                    {getFieldDecorator('name', {
                      rules: [
                        {
                          message: '请输入巡检点名称',
                        },
                      ],
                    })(<Input placeholder="请输入巡检点名称" />)}
                  </Form.Item>
                  <Form.Item label="巡检点位置">
                    {getFieldDecorator('address', {
                      rules: [
                        {
                          message: '请输入巡检点位置',
                        },
                      ],
                    })(<Input placeholder="请输入巡检点位置" />)}
                  </Form.Item>
                  <Form.Item label="横坐标" className={styles.small_style}>
                    {getFieldDecorator('xCoordinate', {
                      rules: [],
                    })(
                      <Input
                        style={{ width: '1rem', backgroundSize: '1rem 40px' }}
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
                        style={{ width: '1rem', backgroundSize: '1rem 40px' }}
                        placeholder="纵坐标"
                        disabled={true}
                      />,
                    )}
                  </Form.Item>
                  {/* </Col>
              </Row>

              <Row type="flex" justify="space-between">
                <Col span={24}> */}
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
                  {/* </Col>
              </Row>

              <Row type="flex" justify="space-between">
                <Col span={24}> */}
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
                        style={{ width: '12.3rem', backgroundSize: '12.3rem 40px' }}
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
                <div className={styles.tips}>请点击或拖拽选择巡检点</div>
              </Row>
              <Row className={styles.line_style}>
                <Col className={styles.img_type} span={24}>
                  <div className={styles.map_manager} ref={this.map}>
                    <Stage
                      width={width}
                      height={height}
                      draggable={true}
                      onWheel={this.onWheel}
                      scaleX={this.state.stageScale}
                      scaleY={this.state.stageScale}
                      x={this.state.stageX}
                      y={this.state.stageY}
                      onClick={this.mapClick}
                    >
                      <Layer>
                        <ImageLayer image={mapImage} x={0} y={0} width={width} height={height} />
                        {this.setupCircle()}
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
                    <Button className={styles.form_btn} onClick={this.back}>
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

const AddPollingPointHOC = Form.create<Props>({ name: 'fencing_setting_add' })(AddPollingPoint);

const mapState = ({ mapManager }) => {
  const { allMaps } = mapManager;
  return {
    maps: allMaps,
  };
};

export default connect(mapState)(AddPollingPointHOC);

// export default Form.create<Props>({ name: 'add_polling_point' })(AddPollingPoint);

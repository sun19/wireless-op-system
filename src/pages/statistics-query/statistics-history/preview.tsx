import React from 'react';
import { Form, Row, Col, Button, Input, Select } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import { FormComponentProps } from 'antd/lib/form';
import { Stage, Layer, Image as ImageLayer, Line as LineLayer } from 'react-konva';

import { UmiComponentProps } from '@/common/type';
import ContentBorder from '../../../components/ContentBorder';
import { getHistoryDetail } from '../services';

import styles from './index.less';

const { TextArea } = Input;
const { Option } = Select;

interface Lamp {
  x: number;
  y: number;
  id: string;
}
interface State {
  mapImage: any | null;
  icon: any;
  width: number;
  height: number;
  lamps: Lamp[];
  stageScale: number;
  stageX: number;
  stageY: number;
}

const scaleBy = 1.01;

interface FormProps extends FormComponentProps { }

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormProps;

class historyAdd extends React.Component<Props, State> {
  map: React.RefObject<HTMLDivElement>;
  constructor(props) {
    super(props);
    this.map = React.createRef<HTMLDivElement>();
    this.state = {
      mapImage: null,
      icon: null,
      width: 0,
      lamps: [],
      height: 0,
      stageScale: 1,
      stageX: 0,
      stageY: 0,
    };
  }
  goBack = () => {
    this.props.form.resetFields();
    router.push('/statistics-query/statistics-history');
  };
  async componentDidMount() {
    if(!this.map.current) return;
    const { clientWidth, clientHeight } = this.map.current;
    const { historyRecord } = this.props;
    const { informationBoardName } = historyRecord;
    const historyDetail = await getHistoryDetail({
      boardNumber: informationBoardName,
    });
    let lamps = historyDetail.result || [];
    lamps = lamps.map(lamp => ({
      x: lamp.xcoordinate,
      y: lamp.ycoordinate,
      id: lamp.lampId,
    }));
    const currentLamps = this.setupLampData(lamps, clientWidth, clientHeight);
    const mapImage = await this.dynamicLoadMapImage();
    const iconImage = await this.dynamicLoadIconImage();

    this.setState({
      mapImage,
      icon: iconImage,
      width: clientWidth,
      height: clientHeight,
      lamps: currentLamps,
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
  dynamicLoadMapImage() {
    return new Promise(resolve => {
      const mapImage = new Image();
      mapImage.src = require('../../map-manager/assets/map.png');
      mapImage.onload = function () {
        resolve(mapImage);
      };
    });
  }
  dynamicLoadIconImage() {
    return new Promise(resolve => {
      const mapImage = new Image();
      mapImage.src = require('../../map-manager/assets/baoan.png');
      mapImage.onload = function () {
        resolve(mapImage);
      };
    });
  }
  createLamps() {
    const lamps = this.state.lamps;
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
    const lamps = this.state.lamps;
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
  render() {
    const props = this.props;
    const { getFieldDecorator } = props.form;
    const { historyRecord } = this.props;
    const { mapImage, width, height } = this.state;
    const lamps = this.createLamps();
    const line = this.createLampLines();
    return (
      <ContentBorder className={styles.auth_root}>
        <Form layout="inline" labelAlign="right" style={{ marginTop: '0.57rem' }}>
          <div className="auth__inner--container">
            <div className={styles.input_body}>
              <Row type="flex" justify="space-between">
                <Col span={24}>
                  <Form.Item label="信息牌">
                    {getFieldDecorator('informationBoardName', {
                      rules: [],
                      initialValue: historyRecord.informationBoardName,
                    })(<Input placeholder="请输入信息牌" disabled={true} />)}
                  </Form.Item>
                  <Form.Item label="姓名">
                    {getFieldDecorator('userName', {
                      rules: [],
                      initialValue: historyRecord.userName,
                    })(<Input placeholder="请输入姓名" disabled={true} />)}
                  </Form.Item>
                  <Form.Item label="类型">
                    {getFieldDecorator('type', {
                      rules: [],
                      initialValue: historyRecord.type,
                    })(<Input placeholder="请输入类型" disabled={true} />)}
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
                      onWheel={this.onWheel}
                      scaleX={this.state.stageScale}
                      scaleY={this.state.stageScale}
                      x={this.state.stageX}
                      y={this.state.stageY}
                      draggable={true}
                    >
                      <Layer>
                        <ImageLayer image={mapImage} x={0} y={0} width={width} height={height} />
                        {line}
                        {lamps}
                      </Layer>
                    </Stage>
                  </div>
                </Col>
              </Row>
              <Row type="flex" justify="center" style={{ marginTop: '0.35rem' }}>
                <Col span={2}>
                  <Form.Item className={styles.button_type}>
                    <Button className={styles.form_btn}>确认</Button>
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

const HistoryAdd = Form.create<Props>({ name: 'history_add' })(historyAdd);

const mapState = ({ statisticsQuery }) => {
  const resp = statisticsQuery.history;
  // const { allDuties, allSecretLevel } = commonState;
  return {
    history: resp,
    historyRecord: statisticsQuery.historyRecord,
  };
};

export default connect(mapState)(HistoryAdd);

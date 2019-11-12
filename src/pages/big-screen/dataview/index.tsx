/**
 * title: 电子围栏
 */
import React, { Component } from 'react';
import { message, Row, Col, Icon, Progress } from 'antd';
import Konva from 'konva';
import { Stage, Layer, Image as ImageLayer, Line as LineLayer } from 'react-konva';
import Navigation from './navigation.tsx'

import styles from '../index.less';

interface State {
  mapImage: any | null;
  icon: any;
  iconRed: any;
  width: number;
  height: number;
  lamps: Lamp[];
  stageScale: number;
  stageX: number;
  stageY: number;
}
interface Props {
  [key: string]: any;
}
interface Lamp {
  x: number;
  y: number;
  id: string;
  code: number;
}
/**
 * 默认灯的位置以及灯的编号
 */
const defaultLamps = [
  { x: 1190, y: 435, id: '08', code: 0 },
  { x: 1190, y: 562, id: '07', code: 0 },
  { x: 1190, y: 698, id: '06', code: 1 },
  { x: 1190, y: 815, id: '05', code: 0 },
  { x: 1337, y: 435, id: '01', code: 0 },
  { x: 1337, y: 562, id: '02', code: 0 },
  { x: 1337, y: 688, id: '03', code: 0 },
  { x: 1337, y: 815, id: '04', code: 0 },
];

const scaleBy = 1.01;

export default class DataView extends React.Component<Props, State> {
  map: React.RefObject<HTMLDivElement>;
  ws: WebSocket;
  constructor(props) {
    super(props);
    this.map = React.createRef<HTMLDivElement>();
    this.state = {
      mapImage: null,
      icon: null,
      iconRed: null,
      width: 0,
      height: 0,
      lamps: [],
      stageScale: 1,
      stageX: 0,
      stageY: 0,
    };
  }
  //异步加载图片，保证渲染到canvas上时是已经OK的
  async componentDidMount() {
    const mapImage = await this.dynamicLoadMapImage();
    const iconImage = await this.dynamicLoadIconImage();
    const iconRedImage = await this.dynamicLoadIconRedImage();
    if (this.map.current) {
      const { clientWidth, clientHeight } = this.map.current;
      this.showLine();
      this.setState({
        mapImage,
        icon: iconImage,
        iconRed: iconRedImage,
        width: clientWidth,
        height: clientHeight,
      });
    }
  }
  showLine() {
    const { clientWidth, clientHeight } = this.map.current;
    let i = 0;
    let temp = [];
    const timer = setInterval(() => {
      if (i === 0) message.success('轨迹开始');
      if (i > 5) {
        message.success('轨迹结束');
        clearInterval(timer);
        return;
      }
      const lnglat = defaultLamps[i];
      const lamp = { x: +lnglat.x, y: +lnglat.y, id: lnglat.id, code: lnglat.code };
      if (lamp.code === 1) {
        message.warn('您已进入非法区域');
      }
      temp.push(lamp);
      const currentLamps = this.setupLampData(temp, clientWidth, clientHeight);

      this.setState({
        lamps: currentLamps,
      });
      i++;
    }, 3000);
  }
  setupLampData = (data, currentWidth, currentHeight) => {
    const defaultWidth = 1920;
    const defaultHeight = 1080;
    return data.map(item => ({
      x: (item.x / defaultWidth) * currentWidth,
      y: (item.y / defaultHeight) * currentHeight,
      id: item.id,
      code: item.code,
    }));
  };
  createLamps() {
    const lamps = this.state.lamps;
    return lamps.map((lamp, index) => (
      <ImageLayer
        image={lamp.code === 0 ? this.state.icon : this.state.iconRed}
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
    //TODO:不给自己找麻烦
    // return (
    //   <React.Fragment>
    //     {lamps.map((lamp, index) => {
    //       const len = lamps.length;
    //       if (index < len - 1) {
    //         const points = [lamp.x, lamp.y, lamps[index + 1].x, lamps[index + 1].y];
    //         return (
    //           <LineLayer
    //             points={points}
    //             stroke={lamp.code === 0 ? '#1296db' : '#d81e06'}
    //             strokeWidth={5}
    //             linecap="round"
    //             lineJoin="round"
    //           />
    //         );
    //       }
    //       return;
    //     })}
    //   </React.Fragment>
    // );
    return (
      <LineLayer points={line} stroke="#1296db" strokeWidth={5} linecap="round" lineJoin="round" />
    );
  };

  componentWillUnmount() {
    message.destroy();
  }
  dynamicLoadMapImage() {
    return new Promise(resolve => {
      const mapImage = new Image();
      mapImage.src = require('../assets/map.png');
      mapImage.onload = function() {
        resolve(mapImage);
      };
    });
  }
  dynamicLoadIconImage() {
    return new Promise(resolve => {
      const mapImage = new Image();
      mapImage.src = require('../assets/baoan.png');
      mapImage.onload = function() {
        resolve(mapImage);
      };
    });
  }
  dynamicLoadIconRedImage() {
    return new Promise(resolve => {
      const mapImage = new Image();
      mapImage.src = require('../assets/baoan.red.png');
      mapImage.onload = function() {
        resolve(mapImage);
      };
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

  render() {
    const { mapImage, width, height } = this.state;
    const lamps = this.createLamps();
    const line = this.createLampLines();
    return (
      <div className={styles.dataview_root_container}>
        <div className="header">
        <Navigation/>
        </div>
        <div className="content">
          <Row>
            <Col span={4} className="left_panel">
              <div className="top">
                <div className="title">当前在线人数</div>
                <div className="number">
                  <span>0</span>
                  <span>0</span>
                  <span>3</span>
                  <span>2</span>
                  <span>4</span>
                </div>
                <div className="today-data">
                  <Icon type="trademark-circle" theme="twoTone" style={{ fontSize: '20px' }} />
                  <span className="data-title">今日最高值</span>
                  <span className="data-number">324</span>
                </div>
                <div className="yesterday-data">
                  <Icon type="trademark-circle" theme="twoTone" style={{ fontSize: '20px' }} />
                  <span className="data-title">昨日最高值</span>
                  <span className="data-number">324</span>
                </div>
              </div>
              <div className="bottom">
                <div className="people-type">
                  <Icon type="trademark-circle" theme="twoTone" style={{ fontSize: '18px' }} />
                  <span>人员类型</span>
                </div>
                <div className="inner_or_outer">
                  <div className="left">
                    <Icon type="trademark-circle" theme="twoTone" />
                    <span className="text_span"> 内部</span>
                    <span className="number_span"> 316</span>
                  </div>
                  <div className="right">
                    <Icon type="trademark-circle" theme="twoTone" />
                    <span>外部</span>
                    <span>8</span>
                  </div>
                </div>
                <div>
                  <Icon type="trademark-circle" theme="twoTone" />
                  <span>保密级别人数占比</span>
                </div>
                <div>
                  <div>
                    <span>一级</span>
                    <span>84人</span>
                  </div>
                  <Progress percent={30} />
                  <div>42%</div>
                </div>
              </div>
            </Col>
            <Col span={16} className="middle_panel">
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
            <Col span={4} className="right_panel">
              右侧
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

import React from 'react';
import Konva from 'konva';
import { WEBSOCKET } from '../../config/constants';
import { Stage, Layer, Image as ImageLayer } from 'react-konva';
import { connect } from 'dva';

import styles from './index.less';

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
interface Props {
  [key: string]: any;
}
interface Lamp {
  x: number;
  y: number;
  id: string;
}
/**
 * 默认灯的位置以及灯的编号
 */
const defaultLamps = [
  { x: 1190, y: 435, id: '08' },
  { x: 1190, y: 562, id: '07' },
  { x: 1190, y: 698, id: '06' },
  { x: 1190, y: 815, id: '05' },
  { x: 1337, y: 435, id: '01' },
  { x: 1337, y: 562, id: '02' },
  { x: 1337, y: 688, id: '03' },
  { x: 1337, y: 815, id: '04' },
];
const scaleBy = 1.01;

class MapManager extends React.Component<Props, State> {
  map: React.RefObject<HTMLDivElement>;
  ws: WebSocket;
  checkUpdateTimer: any;
  constructor(props) {
    super(props);
    this.map = React.createRef<HTMLDivElement>();
    this.state = {
      mapImage: null,
      icon: null,
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
    if (!this.map.current) return;
    const { clientWidth } = this.map.current;
    const clientHeight = Math.floor((clientWidth * 1080) / 1920);

    // this.connectWs();
    this.setState({
      mapImage,
      icon: iconImage,
      width: clientWidth,
      height: clientHeight,
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { clientWidth } = this.map.current;
    const clientHeight = Math.floor((clientWidth * 1080) / 1920);
    let msgInfo = nextProps.wsInfo;
    if (msgInfo.msgType != '0') return;
    let msgText = msgInfo.msgTxt;
    // lastTime = new Date();
    // const msgText = message.msgTxt;
    msgText = msgText.map(item => ({
      x: +item.xcoordinate,
      y: +item.ycoordinate,
      id: item.key,
    }));
    // const lamp = { };
    const currentLamps = this.setupLampData(msgText, clientWidth, clientHeight);

    this.setState({
      lamps: currentLamps,
    });
  }
  connectWs() {
    const { clientWidth } = this.map.current;
    const clientHeight = Math.floor((clientWidth * 1080) / 1920);

    // this.ws = new WebSocket('ws://47.96.112.31:8084/jeecg-boot/websocket/1');
    // this.ws = new WebSocket('ws://47.96.112.31:8086/jeecg-boot/websocket/1');
    this.ws = new WebSocket(WEBSOCKET+'/jeecg-boot/websocket/1');



    this.ws.onopen = () => {};
    let lastTime = new Date();
    //5s不来新数据，则消失
    const maxDuraction = 5000;
    this.checkUpdateTimer = setInterval(() => {
      const currentTime = new Date().getTime();
      const duration = currentTime - lastTime.getTime();
      if (duration > maxDuraction) {
        this.setState({
          lamps: [],
        });
      }
    }, maxDuraction);
    this.ws.onmessage = evt => {
      // let msgText = JSON.parse(evt.data);
      // lastTime = new Date();
      // // const msgText = message.msgTxt;
      // msgText = msgText.map(item => ({
      //   x: +item.xcoordinate,
      //   y: +item.ycoordinate,
      //   id: item.key,
      // }));
      // // const lamp = { };
      // const currentLamps = this.setupLampData(msgText, clientWidth, clientHeight);
      // this.setState({
      //   lamps: currentLamps,
      // });
    };
    this.ws.onclose = () => {};
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
  componentWillUnmount() {
    // clearInterval(this.checkUpdateTimer);
    // this.ws && this.ws.close();
  }
  dynamicLoadMapImage() {
    return new Promise(resolve => {
      const mapImage = new Image();
      mapImage.src = require('../big-screen/assets/地图2.png');
      mapImage.onload = function() {
        resolve(mapImage);
      };
    });
  }
  dynamicLoadIconImage() {
    return new Promise(resolve => {
      const mapImage = new Image();
      mapImage.src = require('../big-screen/assets/baoan.png');
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
    return (
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
            {lamps}
          </Layer>
        </Stage>
      </div>
    );
  }
}

const mapState = ({ commonState }) => {
  return {
    wsInfo: commonState.wsInfo,
  };
};

export default connect(mapState)(MapManager);

import React from 'react';
import Konva from 'konva';
import { Stage, Layer, Image as ImageLayer } from 'react-konva';

import styles from './index.less';

interface State {
  mapImage: any | null;
  icon: any;
  width: number;
  height: number;
  lamps: Lamp[];
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

export default class MapManager extends React.Component<Props, State> {
  map: React.RefObject<HTMLDivElement>;
  ws: WebSocket;
  constructor(props) {
    super(props);
    this.map = React.createRef<HTMLDivElement>();
    this.state = {
      mapImage: null,
      icon: null,
      width: 0,
      height: 0,
      lamps: [],
    };
  }
  //异步加载图片，保证渲染到canvas上时是已经OK的
  async componentDidMount() {
    const mapImage = await this.dynamicLoadMapImage();
    const iconImage = await this.dynamicLoadIconImage();
    const { clientWidth, clientHeight } = this.map.current;
    this.connectWs();
    this.setState({
      mapImage,
      icon: iconImage,
      width: clientWidth,
      height: clientHeight,
    });
  }
  connectWs() {
    const { clientWidth, clientHeight } = this.map.current;
    this.ws = new WebSocket('ws://47.96.112.31:8084/jeecg-boot/websocket/1');
    this.ws.onopen = () => {};

    this.ws.onmessage = evt => {
      const message = JSON.parse(evt.data);
      const msgText = message.msgTxt;
      const lamp = { x: +msgText.xCoordinate, y: +msgText.yCoordinate, id: msgText.lampNumber };
      const currentLamps = this.setupLampData([lamp], clientWidth, clientHeight);

      this.setState({
        lamps: currentLamps,
      });
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
  componentWillUnmount() {}
  dynamicLoadMapImage() {
    return new Promise(resolve => {
      const mapImage = new Image();
      mapImage.src = require('./assets/map.png');
      mapImage.onload = function() {
        resolve(mapImage);
      };
    });
  }
  dynamicLoadIconImage() {
    return new Promise(resolve => {
      const mapImage = new Image();
      mapImage.src = require('./assets/baoan.png');
      mapImage.onload = function() {
        resolve(mapImage);
      };
    });
  }
  render() {
    const { mapImage, width, height } = this.state;
    const lamps = this.createLamps();
    return (
      <div className={styles.map_manager} ref={this.map}>
        <Stage width={width} height={height}>
          <Layer>
            <ImageLayer image={mapImage} x={0} y={0} width={width} height={height} />
            {lamps}
          </Layer>
        </Stage>
      </div>
    );
  }
}

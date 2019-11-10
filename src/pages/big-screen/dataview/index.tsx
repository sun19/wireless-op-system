/**
 * title: 电子围栏
 */
import React, { Component } from 'react';
import { message } from 'antd';
import Konva from 'konva';
import { Stage, Layer, Image as ImageLayer, Line as LineLayer } from 'react-konva';

import styles from '../index.less';

interface State {
  mapImage: any | null;
  icon: any;
  iconRed: any;
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
      if (i > 5) {
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

  componentWillUnmount() {}
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

  render() {
    const { mapImage, width, height } = this.state;
    const lamps = this.createLamps();
    const line = this.createLampLines();
    return (
      <div className={styles.map_manager} ref={this.map}>
        <Stage width={width} height={height}>
          <Layer>
            <ImageLayer image={mapImage} x={0} y={0} width={width} height={height} />
            {line}
            {lamps}
          </Layer>
        </Stage>
      </div>
    );
  }
}

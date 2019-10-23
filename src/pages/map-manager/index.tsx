import React from 'react';
import Konva from 'konva';
import { Stage, Layer, Image as ImageLayer, Rect } from 'react-konva';

import styles from './index.less';

interface State {
  mapImage: any | null;
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
}

const defaultLamps = [
  { x: 1190, y: 435 },
  { x: 1190, y: 562 },
  { x: 1190, y: 698 },
  { x: 1190, y: 815 },
  { x: 1337, y: 435 },
  { x: 1337, y: 562 },
  { x: 1337, y: 688 },
  { x: 1337, y: 815 },
];

export default class MapManager extends React.Component<Props, State> {
  map: React.RefObject<HTMLDivElement>;
  constructor(props) {
    super(props);
    this.map = React.createRef<HTMLDivElement>();
    this.state = {
      mapImage: null,
      width: 0,
      height: 0,
      lamps: defaultLamps,
    };
  }

  //异步加载图片，保证渲染到canvas上时是已经OK的
  async componentDidMount() {
    const mapImage = await this.dynamicLoadImage('./assets/map.png');
    const iconImage = await this.dynamicLoadImage('./assets/baoan.svg');
    const { clientWidth, clientHeight } = this.map.current;
    const currentLamps = this.setupLampData(this.state.lamps, clientWidth, clientHeight);
    this.setState({
      mapImage,
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

  createLamps() {
    const lamps = this.state.lamps;
    return lamps.map((lamp, index) => (
      <Rect x={lamp.x - 25} y={lamp.y - 25} width={50} height={50} fill={'red'} key={index} />
    ));
  }

  componentWillUnmount() {}

  dynamicLoadImage(path) {
    return new Promise(resolve => {
      const mapImage = new Image();
      mapImage.src = require(path);
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

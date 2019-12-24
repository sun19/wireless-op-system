import React, { Component } from 'react';
import Konva from 'konva';
import {
  Stage,
  Layer,
  Image as ImageLayer,
  Line as LineLayer,
  Circle as CircleLayer,
} from 'react-konva';

interface CircleOption {
  show: boolean;
  x?: number;
  y?: number;
  radius?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  draggable?: boolean;
  onDragStart?: () => void;
  onDragMove?: () => void;
  onDragEnd?: () => void;
}

interface Props {
  circleOptions?: CircleOption;
  onClick?: (e) => void;
}
interface State {
  mapImage: any;
  width: number;
  height: number;
}
export default class Map extends Component<Props, State> {
  map: React.RefObject<HTMLDivElement>;
  constructor(props) {
    super(props);
    this.map = React.createRef<HTMLDivElement>();
    this.state = {
      mapImage: null,
      width: 0,
      height: 0,
    };
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
  onMapClick = e => {
    const evt = e.evt;
    const { x, y } = evt;
  };
  setupCircle = () => {
    const { circleOptions } = this.props;
    if (!circleOptions || circleOptions.show === false) return null;
    const {
      x,
      y,
      radius,
      fill,
      stroke,
      strokeWidth,
      draggable,
      onDragStart,
      onDragMove,
      onDragEnd,
    } = circleOptions;
    return (
      <CircleLayer
        x={x}
        y={y}
        radius={radius}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        draggable={draggable}
        listening={true}
        onDragEnd={onDragEnd}
        // absolutePosition = { this.circleAbsolutePosition }
      />
    );
  };
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
  }
  render() {
    const { mapImage, width, height } = this.state;

    return (
      <div style={{ width: '100%', height: '100%' }} ref={this.map}>
        <Stage width={width} height={height} draggable={false} onClick={this.onMapClick}>
          <Layer>
            <ImageLayer image={mapImage} x={0} y={0} width={width} height={height} />
            {this.setupCircle()}
          </Layer>
        </Stage>
      </div>
    );
  }
}

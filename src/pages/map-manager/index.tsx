import React from 'react';
import ReactDOM from 'react-dom';
import Konva from 'konva';
import h337 from 'heatmap.js';
import * as _ from 'lodash';
import {
  Stage,
  Layer,
  Image as ImageLayer,
  Text as TextLayer,
  Circle as CircleLayer,
  Line as LineLayer,
} from 'react-konva';
import { connect } from 'dva';
import { Tabs, Card, Icon, List, Badge } from 'antd';

import { getLampList, getRegionList, getInfoCardDetail, getHistoryRoutes } from './services';
import { WEBSOCKET } from '../../config/constants';
import HeatMap from '@/components/HeatMap';

import styles from './index.less';

const { TabPane } = Tabs;

interface State {
  mapImage: any | null;
  icon: any;
  width: number;
  height: number;
  infoCards: InfoCard[];
  heatmaps: any[];
  stageScale: number;
  stageX: number;
  stageY: number;
  areaText: any[];
  lamps: Lamp[];
  receiveWsInfo: boolean;
  infoDetail: object;
  mode: 'realtime' | 'history' | 'all';
  historyLine?: number[];
  historyPoints?: any[];
}
interface Props {
  [key: string]: any;
  showLamps: boolean;
}
interface InfoCard {
  x: number;
  y: number;
  id: string;
  color: string;
  information: string;
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
//间隔时间
//相隔`MAX_SHOW_DURATION`时间后仍无数据推送，清除信息牌。
const MAX_SHOW_DURATION = 5000;

class MapManager extends React.Component<Props, State> {
  map: React.RefObject<HTMLDivElement>;
  ws: WebSocket;
  timer?: any;
  heatmapTimer?: any;
  // heatmap: any;
  checkUpdateTimer: any;
  oldScale: any;
  stage: any;

  constructor(props) {
    super(props);
    this.map = React.createRef<HTMLDivElement>();
    this.state = {
      mapImage: null,
      icon: null,
      width: 0,
      height: 0,
      infoCards: [],
      stageScale: 1,
      stageX: 0,
      stageY: 0,
      areaText: [],
      lamps: [],
      heatmaps: [],
      receiveWsInfo: true,
      infoDetail: {},
      mode: 'all',
    };
    this.onInfoCardClick = this.onInfoCardClick.bind(this);
    this.enterHistoryMode = this.enterHistoryMode.bind(this);
  }
  //异步加载图片，保证渲染到canvas上时是已经OK的
  async componentDidMount() {
    const mapImage = await this.dynamicLoadMapImage();
    const iconImage = await this.dynamicLoadIconImage();
    if (!this.map.current) return;
    const { clientWidth } = this.map.current;
    const clientHeight = Math.floor((clientWidth * 1080) / 1920);

    //获取区域名称,区域坐标
    let areas = await getRegionList();
    let lamps = await getLampList();
    areas = (areas.result && areas.result) || [];
    lamps = (lamps.result && lamps.result.records) || [];
    lamps = lamps.map(item => ({
      x: +item.xcoordinate,
      y: +item.ycoordinate,
      id: item.key,
    }));
    areas = areas.map(item => ({
      ...item,
      x: +item.xcoordinate,
      y: +item.ycoordinate,
      id: item.id,
    }));
    lamps = this.setupLampData(lamps, clientWidth, clientHeight);
    areas = this.setupLampData(areas, clientWidth, clientHeight);
    this.setState({
      mapImage,
      icon: iconImage,
      width: clientWidth,
      height: clientHeight,
      areaText: areas,
      lamps: lamps,
    });
  }
  // 数据格式
  // {
  //   msgType: "0",
  //   msgId: "M0001",
  //   cmd: "topic",
  //   msgTxt: [
  //     {
  //       ycoordinate: ["435.1", "435.2"],
  //       color: ["#ab0c14", "#ab0c14"],
  //       information: ["11", "12"],
  //       value: "011112_1576571349846",
  //       key: "01",
  //       xcoordinate: ["1337.1", "1337.2"]
  //     },
  //     {
  //       ycoordinate: ["562.1", "562.2"],
  //       color: ["#b15454", "#b15454"],
  //       information: ["13", "14"],
  //       value: "021314_1576571360382",
  //       key: "02",
  //       xcoordinate: ["1337.1", "1337.2"]
  //     }
  //   ]
  // };
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { receiveWsInfo } = this.state;
    if (!receiveWsInfo) return;
    const { clientWidth } = this.map.current;
    const clientHeight = Math.floor((clientWidth * 1080) / 1920);
    let msgInfo = nextProps.wsInfo;
    if (msgInfo.msgType != '0') return;

    if (this.timer) {
      clearTimeout(this.timer);
    }
    let msgText = msgInfo.msgTxt || [];

    msgText = this.serializeInfoCard(msgText);

    //接受全量模式
    if (this.state.mode === 'all') {
      //实时追踪模式
    } else if (this.state.mode === 'realtime') {
      const { infoDetail } = this.state;
      const infoCardCode = (infoDetail as any).name;
      //只取当前订阅的信息牌
      msgText = msgText.filter(item => item.information === infoCardCode);
      //历史轨迹模式
    } else if (this.state.mode === 'history') {
      this.setState({
        infoCards: [],
        heatmaps: [],
      });
      return;
    }
    const infoCards = this.setupInfoCardData(msgText, clientWidth, clientHeight);

    let data = [];
    if (!this.stage) {
      data = infoCards.map(v => ({
        x: Math.floor(v.x),
        y: Math.floor(v.y),
        value: Math.floor(100),
        radius: Math.floor(100),
      }));
      this.setState({
        heatmaps: data,
      });
    }
    this.setState({
      infoCards: infoCards,
    });
    this.forceUpdate(() => {
      if (this.stage) {
        const layers = this.stage.children && this.stage.children[1];
        if (!layers) return;
        const infoCardLayers = layers.children;
        if (!infoCardLayers) return;
        const data = infoCardLayers.map((layer, index) => {
          const _x = layer.absolutePosition().x;
          const _y = layer.absolutePosition().y;
          return {
            x: Math.floor(_x),
            y: Math.floor(_y),
            value: Math.floor(100),
            radius: Math.floor(100),
          };
        });
        this.setState({
          heatmaps: data,
        });
      }
    });
    //间隔`MAX_SHOW_DURATION`时间，仍无点位推送，清除信息牌
    this.timer = setTimeout(() => {
      this.setState({
        infoCards: [],
        heatmaps: [],
      });
    }, MAX_SHOW_DURATION);
  }
  /**
   * 序列化ws推送过来的信息牌数据，使其满足展示要求
   */
  serializeInfoCard = (msgText: any[]) => {
    let infoCards = [];
    if (msgText) {
      for (let i = 0; i < msgText.length; i++) {
        const lampWithInfoCards = msgText[i];
        const information = lampWithInfoCards.information;
        for (let j = 0; j < information.length; j++) {
          infoCards.push({
            ycoordinate: +lampWithInfoCards.ycoordinate[j],
            color: lampWithInfoCards.color[j],
            value: lampWithInfoCards.value,
            key: lampWithInfoCards.key,
            xcoordinate: +lampWithInfoCards.xcoordinate[j],
            information: lampWithInfoCards.information[j],
            id: lampWithInfoCards.information[j],
          });
        }
      }
      return infoCards;
    }
  };

  setupLampData = (data, currentWidth, currentHeight) => {
    const defaultWidth = 1920;
    const defaultHeight = 1080;
    return data.map(item => ({
      ...item,
      x: (item.x / defaultWidth) * currentWidth,
      y: (item.y / defaultHeight) * currentHeight,
    }));
  };
  setupInfoCardData = (data, currentWidth, currentHeight) => {
    const defaultWidth = 1920;
    const defaultHeight = 1080;
    return data.map(item => ({
      ...item,
      x: (item.xcoordinate / defaultWidth) * currentWidth,
      y: (item.ycoordinate / defaultHeight) * currentHeight,
      value: 1,
    }));
  };
  createInfoCards() {
    const infoCards = this.state.infoCards;
    return infoCards.map((infoCard, index) => {
      return (
        <CircleLayer
          x={Math.floor(infoCard.x - 16)}
          y={Math.floor(infoCard.y - 16)}
          radius={10}
          fill={infoCard.color == '' || !infoCard.color ? 'red' : infoCard.color}
          key={index}
          id={infoCard.information}
          onClick={this.onInfoCardClick}
        />
      );
    });
  }
  async onInfoCardClick(evt) {
    const target = evt.target;
    const attr = target.attrs;
    const { id } = attr;
    let info = await getInfoCardDetail({ number: id });
    info = info.result || {};
    this.setState({
      infoDetail: info,
    });
  }
  createAreaText() {
    const texts = this.state.areaText;
    return texts.map((text, index) => (
      <TextLayer
        text={text.regionName}
        x={Math.floor(text.x)}
        y={Math.floor(text.y)}
        fontSize={20}
        fill="white"
        key={index}
      />
    ));
  }
  createLamps() {
    const { showLamps } = this.props;
    if (!showLamps) return;
    const lamps = this.state.lamps;
    return lamps.map((lamp, index) => (
      <CircleLayer x={lamp.x - 4} y={lamp.y - 4} radius={8} fill="red" key={index} />
    ));
  }
  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (this.heatmapTimer) {
      clearTimeout(this.heatmapTimer);
    }
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
  onMapDragEnd = evt => {
    if (this.heatmapTimer) clearTimeout(this.heatmapTimer);
    evt.evt.preventDefault();
    const stage = evt.target.getStage();
    const oldScale = stage.scaleX();
    this.oldScale = oldScale;
    this.stage = stage;

    const layers = stage.children && stage.children[1];
    if (!layers) return;
    const infoCardLayers = layers.children;
    if (!infoCardLayers) return;
    const data = infoCardLayers.map((layer, index) => {
      const _x = layer.absolutePosition().x;
      const _y = layer.absolutePosition().y;
      return {
        x: Math.floor(_x),
        y: Math.floor(_y),
        value: Math.floor(100),
        radius: Math.floor(100),
      };
    });
    this.setState({
      heatmaps: data,
    });
  };
  onWheel = evt => {
    if (this.heatmapTimer) clearTimeout(this.heatmapTimer);
    evt.evt.preventDefault();
    const stage = evt.target.getStage();
    const oldScale = stage.scaleX();
    this.oldScale = oldScale;
    this.stage = stage;

    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    const newScale = evt.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    stage.scale({ x: newScale, y: newScale });

    const layers = stage.children && stage.children[1];
    if (!layers) return;
    const infoCardLayers = layers.children;
    if (!infoCardLayers) return;
    this.heatmapTimer = setTimeout(() => {
      const data = infoCardLayers.map((layer, index) => {
        const _x = layer.absolutePosition().x;
        const _y = layer.absolutePosition().y;
        return {
          x: Math.floor(_x),
          y: Math.floor(_y),
          value: Math.floor(100),
          radius: Math.floor(100),
        };
      });
      this.setState({
        heatmaps: data,
      });
    }, 400);
    this.setState({
      stageScale: newScale,
      stageX: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      stageY: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    });
  };
  //点击地图，切换回`all`模式
  onMapClick = () => {
    this.setState({
      infoDetail: {},
      mode: 'all',
    });
  };
  enterRealTimeMode = () => {
    this.setState({
      mode: 'realtime',
    });
  };
  async enterHistoryMode() {
    const { clientWidth } = this.map.current;
    const clientHeight = Math.floor((clientWidth * 1080) / 1920);
    const { infoDetail } = this.state;
    const infoCardCode = (infoDetail as any).name;
    const resp = await getHistoryRoutes({
      informationBoardName: infoCardCode,
    });
    let points = (resp.result && resp.result.records) || [];
    points = this.setupInfoCardData(points, clientWidth, clientHeight);
    const lines = points.reduce((p, n) => {
      p.push(+n.xcoordinate);
      p.push(+n.ycoordinate);
      return p;
    }, []);
    this.setState({
      mode: 'history',
      historyLine: lines,
      historyPoints: points,
    });
  }

  renderInfoItem = item => {
    return (
      <List.Item>
        <List.Item.Meta title={item.title} description={this.state.infoDetail[item.name]} />
      </List.Item>
    );
  };
  render() {
    const { mapImage, width, height } = this.state;
    const infoCards = this.createInfoCards();
    const areaText = this.createAreaText();
    const lamps = this.createLamps();

    const config = {
      radius: 90,
      maxOpacity: 0.5,
      minOpacity: 0,
      blur: 0.75,
    };
    let max = 0;
    //实时轨迹的线
    const realtimeLine = this.state.infoCards.reduce((p, n) => {
      p.push(n.x);
      p.push(n.y);
      return p;
    }, []);
    return (
      <React.Fragment>
        {this.props.showHeatMap ? (
          <HeatMap configObject={config} max={max} data={this.state.heatmaps}>
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
                onDragEnd={this.onMapDragEnd}
                onClick={this.onMapClick}
              >
                <Layer>
                  <ImageLayer image={mapImage} x={0} y={0} width={width} height={height} />
                  {lamps}
                  {areaText}
                </Layer>
                <Layer>{infoCards}</Layer>
              </Stage>
            </div>
          </HeatMap>
        ) : (
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
              onDragEnd={this.onMapDragEnd}
              onClick={this.onMapClick}
            >
              <Layer>
                <ImageLayer image={mapImage} x={0} y={0} width={width} height={height} />
                {lamps}
                {areaText}
              </Layer>
              <Layer>{infoCards}</Layer>
              {this.state.mode === 'realtime' && (
                <Layer>
                  <LineLayer
                    points={realtimeLine}
                    stroke="#1296db"
                    strokeWidth={5}
                    linecap="round"
                    lineJoin="round"
                  />
                </Layer>
              )}
              {this.state.mode === 'history' && (
                <Layer>
                  <LineLayer
                    points={this.state.historyLine}
                    stroke="#1296db"
                    strokeWidth={5}
                    linecap="round"
                    lineJoin="round"
                  />
                  {this.state.historyPoints.map((item, index) => (
                    <CircleLayer
                      x={Math.floor(item.x - 4)}
                      y={Math.floor(item.y - 4)}
                      radius={8}
                      fill="red"
                      key={index}
                    />
                  ))}
                </Layer>
              )}
            </Stage>
          </div>
        )}

        {_.isEmpty(this.state.infoDetail) ? null : (
          <span className={styles.card_panel}>
            <Card
              title="详细信息"
              actions={[
                <span key="setting" onClick={this.enterRealTimeMode}>
                  {/* <Icon type="setting" key="setting" /> */}
                  实时追踪
                </span>,
                <span key="edit" onClick={this.enterHistoryMode}>
                  {/* <Icon type="edit" key="edit" /> */}
                  运动轨迹
                </span>,
              ]}
              style={{ width: 300 }}
            >
              <List
                itemLayout="horizontal"
                dataSource={[
                  {
                    title: '信息牌编号',
                    name: 'name',
                  },
                  {
                    title: '姓名',
                    name: 'userName',
                  },
                  {
                    title: '部门',
                    name: 'departmentName',
                  },
                  {
                    title: '人员类型',
                    name: 'type',
                  },
                  {
                    title: '保密等级',
                    name: 'securityLevelName',
                  },
                ]}
                renderItem={this.renderInfoItem}
              />
            </Card>
          </span>
        )}
        {/* <span>
          <Badge color="#f50" text="#f50" />
          <Badge color="#2db7f5" text="#2db7f5" />
          <Badge color="#87d068" text="#87d068" />
          <Badge color="#108ee9" text="#108ee9" />
        </span> */}
      </React.Fragment>
    );
  }
}

const mapState = ({ commonState }) => {
  return {
    wsInfo: commonState.wsInfo,
  };
};

export default connect(mapState)(MapManager);

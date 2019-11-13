/**
 * title: 电子围栏
 */
import React, { Component } from 'react';
import { message, Row, Col, Icon, Progress } from 'antd';
import Konva from 'konva';
import ReactEcharts from 'echarts-for-react';
import { Stage, Layer, Image as ImageLayer, Line as LineLayer } from 'react-konva';
// import MainContent from '../components/MainContent';
import Title from '../components/Title';

import Navigation from '../components/navigation';

import styles from './index.less';

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
  showPeopleInfo: boolean;
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
      showPeopleInfo: true,
    };
    this.connectWs = this.connectWs.bind(this);
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
    this.connectWs();
  }

  connectWs() {
    const { clientWidth, clientHeight } = this.map.current;
    this.ws = new WebSocket('ws://47.96.112.31:8086/jeecg-boot/websocket/1');
    this.ws.onopen = () => {};

    this.ws.onmessage = evt => {
      const message = JSON.parse(evt.data);
      // const msgText = message.msgTxt;
      // console.log(message, 'xx');
      // const lamp = { x: +msgText.xCoordinate, y: +msgText.yCoordinate, id: msgText.lampNumber };
      // const currentLamps = this.setupLampData([lamp], clientWidth, clientHeight);

      // this.setState({
      //   lamps: currentLamps,
      // });
    };
    this.ws.onclose = () => {};
  }

  selectShow = () => {
    // this.setState({ showPeopleInfo: !this.showPeopleInfo });
  };
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
  createPositionNumberGraph = () => {
    var dataStyle = {
      normal: {
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        // shadowBlur: 15,
        // shadowColor: 'white',
      },
    };
    var placeHolderStyle = {
      normal: {
        color: 'rgba(0,0,0,0)',
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
      },
      emphasis: {
        color: 'rgba(0,0,0,0)',
      },
    };
    const option = {
      // backgroundColor: '#0b214a',
      color: ['#3DD1F9', '#01E17E', '#FFAD05', '#ADFF4D'],
      tooltip: {
        show: true,
        formatter: '{b} : {c}',
      },

      legend: {
        //  top: '15%',
        // x: 'right',
        width: 12,
        height: 13,
        lineHeight: 16,
        right: '2%',
        itemHeight: 5, //图例标记的图形宽度。
        itemWidth: 5, //图例标记的图形gao度。
        orient: 'vertical', //图例列表的布局朝向。
        data: ['作战人员', '主官', '首长'],
        itemGap: 38,
        textStyle: {
          color: '#A3E2F4',
          align: 'right',
          x: 'right',
          textAlign: 'right',
        },
        selectedMode: true,
      },
      series: [
        {
          name: 'Line 3',
          type: 'pie',
          clockWise: false,
          radius: ['50%', '60%'],
          itemStyle: dataStyle,
          hoverAnimation: false,
          data: [
            {
              value: 5632,
              name: '作战人员',
            },
            {
              value: 2212,
              name: '总数',
              tooltip: {
                show: false,
              },
              itemStyle: placeHolderStyle,
            },
          ],
        },
        {
          name: 'Line 2',
          type: 'pie',
          clockWise: false,
          hoverAnimation: false,
          radius: ['35%', '45%'],
          itemStyle: dataStyle,

          data: [
            {
              value: 1523,
              name: '主官',
            },
            {
              value: 1812,
              name: '总数',
              tooltip: {
                show: false,
              },
              itemStyle: placeHolderStyle,
            },
          ],
        },
        {
          name: 'Line 1',
          type: 'pie',
          clockWise: false,

          radius: ['20%', '30%'],
          itemStyle: dataStyle,
          hoverAnimation: false,

          data: [
            {
              value: 842,
              name: '首长',
            },
            {
              value: 1912,
              name: '总数',
              tooltip: {
                show: false,
              },
              itemStyle: placeHolderStyle,
            },
          ],
        },
      ],
    };
    return <ReactEcharts option={option} style={{ height: '100%', width: '100%' }} />;
  };
  createStayTimeAnalyzeGraph = () => {
    const option = {
      color: ['#EAEA26', '#906BF9', '#FE5656', '#01E17E', '#3DD1F9', '#FFAD05'],

      grid: {
        left: -100,
        top: 50,
        bottom: 10,
        right: 10,
        containLabel: true,
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'horizontal',
        bottom: '0',
        left: '0',
        itemWidth: 16,
        itemHeight: 8,
        itemGap: 16,
        textStyle: {
          color: '#A3E2F4',
          fontSize: 12,
          fontWeight: 0,
        },
        data: ['<=1h', '1~2h', '2~3h', '3~4h'],
      },
      polar: {},
      angleAxis: {
        interval: 1,
        type: 'category',
        data: [],
        z: 10,
        axisLine: {
          show: false,
          lineStyle: {
            color: '#0B4A6B',
            width: 1,
            type: 'solid',
          },
        },
        axisLabel: {
          interval: 0,
          show: true,
          color: '#0B4A6B',
          margin: 8,
          fontSize: 16,
        },
      },
      radiusAxis: {
        min: 40,
        max: 120,
        interval: 20,
        axisLine: {
          show: false,
          lineStyle: {
            color: '#0B3E5E',
            width: 1,
            type: 'solid',
          },
        },
        axisLabel: {
          formatter: '{value} %',
          show: false,
          padding: [0, 0, 20, 0],
          color: '#0B3E5E',
          fontSize: 16,
        },
        splitLine: {
          lineStyle: {
            color: '#0B3E5E',
            width: 2,
            type: 'solid',
          },
        },
      },
      calculable: true,
      series: [
        {
          type: 'pie',
          radius: ['5%', '10%'],
          hoverAnimation: false,
          labelLine: {
            show: false,
            normal: {
              show: false,
              length: 30,
              length2: 55,
            },
            emphasis: {
              show: false,
            },
          },
          data: [
            {
              name: '',
              value: 0,
              itemStyle: {
                normal: {
                  color: '#0B4A6B',
                },
              },
            },
          ],
        },
        {
          type: 'pie',
          radius: ['90%', '95%'],
          hoverAnimation: false,
          labelLine: {
            normal: {
              show: false,
              length: 30,
              length2: 55,
            },
            emphasis: {
              show: false,
            },
          },
          name: '',
          data: [
            {
              name: '',
              value: 0,
              itemStyle: {
                normal: {
                  color: '#0B4A6B',
                },
              },
            },
          ],
        },
        {
          stack: 'a',
          type: 'pie',
          radius: ['20%', '80%'],
          roseType: 'area',
          zlevel: 10,
          label: {
            normal: {
              show: false,
              formatter: '{c}',
              textStyle: {
                fontSize: 12,
              },
              position: 'outside',
            },
            emphasis: {
              show: true,
            },
          },
          labelLine: {
            normal: {
              show: true,
              length: 20,
              length2: 55,
            },
            emphasis: {
              show: false,
            },
          },
          data: [
            {
              value: 10,
              name: '<=1h',
            },
            {
              value: 5,
              name: '1~2h',
            },
            {
              value: 15,
              name: '2~3h',
            },
            {
              value: 25,
              name: '3~4h',
            },
          ],
        },
      ],
    };
    return <ReactEcharts option={option} style={{ height: '100%', width: '100%' }} />;
  };
  createPoliceType = () => {
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'line', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      legend: {
        data: ['闯入告警', '闯出告警', '聚集告警', '超员告警', '脱岗告警'],
      },

      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        max: 100,
        axisLine: {
          lineStyle: {
            color: '#7AB2E2',
          },
        },
        axisLabel: {
          inside: false,
          textStyle: {
            // color: '#fff', // x轴颜色
            fontWeight: 'normal',
            fontSize: '10',
            lineHeight: 15,
          },
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(36,54,113,1)',
          },
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisLine: {
          lineStyle: {
            color: '#7AB2E2',
          },
          splitLine: {
            show: false,
          },
        },
        axisLabel: {
          formatter: '{value}',
          // color: '#fff',
          fontSize: 10,
        },
        axisTick: {
          show: false,
        },
      },
      series: [
        {
          name: 'A级门店',
          type: 'bar',
          stack: '总量',
          barWidth: 6,
          itemStyle: {
            normal: {
              color: 'rgba(9,120,242,1)',
              barBorderRadius: [20, 20, 20, 20],
            },
          },
          label: {
            normal: {
              show: true,
              position: 'insideRight',
            },
          },
          z: 10,
          data: [32, 30, 30, 33, 39, 33, 32],
        },
        {
          name: 'B级门店',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            normal: {
              color: 'rgba(77,253,184,1)',
              shadowBlur: [0, 0, 0, 10],
              shadowColor: '#ebe806',
              barBorderRadius: [20, 20, 20, 20],
              shadowOffsetX: -20,
            },
          },
          label: {
            normal: {
              show: true,
              position: 'insideRight',
            },
          },
          z: 5,
          data: [12, 13, 10, 13, 9, 23, 21],
        },
        {
          name: 'C级门店',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            normal: {
              barBorderRadius: [20, 20, 20, 20],
              color: 'rgba(255,180,0,1)',
              shadowBlur: [0, 0, 0, 10],
              shadowColor: 'rgba(255,180,0,1)',
              shadowOffsetX: -20,
            },
          },
          label: {
            normal: {
              show: true,
              position: 'insideRight',
            },
          },
          data: [22, 18, 19, 23, 29, 33, 31],
        },
      ],
    };
    return <ReactEcharts option={option} style={{ width: '100%', height: '100%' }} />;
  };
  render() {
    const { mapImage, width, height } = this.state;
    const lamps = this.createLamps();
    const line = this.createLampLines();

    return (
      <div className={styles.homepage_root_container}>
        <div className="header">
          <Navigation />
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
                {/* </div> */}
                <div className="people_type">
                  <div className="people_type_title">
                    <Icon type="trademark-circle" theme="twoTone" style={{ fontSize: '18px' }} />
                    <span>人员类型</span>
                  </div>
                  <div className="inner_or_outer">
                    <span className="left">
                      <Icon type="trademark-circle" theme="twoTone" />
                      <span className="text_span"> 内部</span>
                      <span className="number_span"> 316</span>
                    </span>
                    <span className="right">
                      <Icon type="trademark-circle" theme="twoTone" />
                      <span className="text_span">外部</span>
                      <span className="number_span">8</span>
                    </span>
                  </div>
                </div>
                <div className="people-secret">
                  <div className="people-type">
                    <Icon type="trademark-circle" theme="twoTone" />
                    <span>保密级别人数占比</span>
                  </div>
                  <div className="people_progress people_progress_first">
                    <div>
                      <span>一级</span>
                      <span className="people-number">84人</span>
                    </div>
                    <Progress percent={30} />
                    <div className="people_progress_num">42%</div>
                  </div>
                  <div className="people_progress people_progress_second">
                    <div>
                      <span>二级</span>
                      <span className="people-number">84人</span>
                    </div>
                    <Progress percent={30} />
                    <div className="people_progress_num">42%</div>
                  </div>
                  <div className="people_progress people_progress_third">
                    <div>
                      <span>三级</span>
                      <span className="people-number">84人</span>
                    </div>
                    <Progress percent={30} />
                    <div className="people_progress_num">42%</div>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={16} className="middle_panel">
              <div className="middle_text">
                <div className="text_panel" onClick={this.selectShow}>
                  人员信息
                </div>
                <div className="text_panel" onClick={this.selectShow}>
                  灯具显示
                </div>
              </div>
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
              {this.state.showPeopleInfo == true ? (
                <div>
                  <div className="right_top_panel">
                    <div>
                      <div>
                        <Icon
                          type="trademark-circle"
                          theme="twoTone"
                          style={{ fontSize: '20px' }}
                        />
                        <span>职位占比人数</span>
                      </div>
                      <div className="echarts">
                        <div className="graph" style={{ height: '180px', width: '100%' }}>
                          {this.createPositionNumberGraph()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="right_middle_panel">
                    <div>
                      <div>
                        <Title title="停留时长分析" />
                        {/* <Icon
                          type="trademark-circle"
                          theme="twoTone"
                          style={{ fontSize: '20px' }}
                        />
                        <span>停留时长分析</span> */}
                      </div>
                      <div className="echarts">
                        <div className="graph" style={{ height: '180px', width: '100%' }}>
                          {this.createStayTimeAnalyzeGraph()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="right_bottom_panel">
                    <div>
                      <div>
                        <Icon
                          type="trademark-circle"
                          theme="twoTone"
                          style={{ fontSize: '20px' }}
                        />
                        <span>告警类型统计</span>
                      </div>
                      <div className="echarts">
                        <div className="graph" style={{ height: '200px', width: '100%' }}>
                          {this.createPoliceType()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="right_ele_panel">
                    <div>
                      <div className="ele_text">
                        <Icon
                          type="trademark-circle"
                          theme="twoTone"
                          style={{ fontSize: '20px' }}
                        />
                        <span>电子围栏</span>
                      </div>
                      <div className="ele_from">
                        <div className="flex_out">
                          <div className="flex_outer">
                            <div className="ele_title_top">
                              <div className="ele_title"> 办公室</div>
                              <div className="ele_title"> 闯入电子围栏</div>
                            </div>
                            <div className="ele_img" />
                          </div>
                          <div className="flex_outer">
                            <div className="ele_title_top">
                              <div className="ele_title"> 办公室</div>
                              <div className="ele_title"> 闯入电子围栏</div>
                            </div>
                            <div className="ele_img" />
                          </div>
                        </div>
                        <div className="flex_out">
                          <div className="flex_outer">
                            <div className="ele_title_top">
                              <div className="ele_title"> 办公室</div>
                              <div className="ele_title"> 闯入电子围栏</div>
                            </div>
                            <div className="ele_img" />
                          </div>
                          <div className="flex_outer">
                            <div className="ele_title_top">
                              <div className="ele_title"> 办公室</div>
                              <div className="ele_title"> 闯入电子围栏</div>
                            </div>
                            <div className="ele_img" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="right_wraning_panel">
                    <div className="ele_text">
                      <Icon type="trademark-circle" theme="twoTone" style={{ fontSize: '20px' }} />
                      <span>警告信息</span>
                    </div>
                    <div className="ele_from">{/* <MainContent /> */}</div>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

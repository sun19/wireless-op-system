/**
 * title: 电子围栏
 */
import React, { Component } from 'react';
import { message, Row, Col, Tooltip, Icon, Progress, Breadcrumb, Table } from 'antd';
import Konva from 'konva';
import ReactEcharts from 'echarts-for-react';
import { Stage, Layer, Image as ImageLayer, Line as LineLayer } from 'react-konva';
import { connect } from 'dva';
import * as _ from 'lodash';
import moment from 'moment';
import { BASE_API_URL } from '../../../config/constants';
import RealTime from '../../map-manager';
import Title from '../components/Title';
import Navigation from '../components/navigation';
import { UmiComponentProps } from '@/common/type';
import {
  getBigScreenPeopleCount,
  getBigScreenDepartmentPeopleCount,
  getBigScreenPositionPeopleCount,
  getInnerOrOuterPeopleCount,
  getRealTimePeopleInfo,
  getRoutingData,
  getSecretLevelPeopleCount,
  getWarnTypeByTime,
  getInnerStayTime,
} from '../services';
import { warningHistorySearch } from '../../warning-manager/services';
import { queryFencingArea } from '../../map-manager/services';
import { getAllFencingTypes } from '../../login/login.service';
import request from '@/utils/request';

import styles from './index.less';

interface State {
  // mapImage: any | null;
  icon: any;
  iconRed: any;
  width: number;
  height: number;
  lamps: Lamp[];
  ajaxLamps: any[];
  stageScale: number;
  stageX: number;
  stageY: number;
  showPeopleInfo: boolean;
  currentIndex: boolean;
  showLamps: boolean;
  showHeatMap: boolean;
  dataStr?: string;
}
type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps;

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

class Realtime extends React.Component<Props, State> {
  map: React.RefObject<HTMLDivElement>;
  constructor(props) {
    super(props);
    this.map = React.createRef<HTMLDivElement>();
    this.state = {
      // mapImage: null,
      icon: null,
      iconRed: null,
      width: 0,
      height: 0,
      lamps: [],
      stageScale: 1,
      stageX: 0,
      stageY: 0,
      showPeopleInfo: false,
      currentIndex: true,
      ajaxLamps: [],
      dataStr: '2019-11-15',
      showLamps: false,
      showHeatMap: false,
    };
  }
  //异步加载图片，保证渲染到canvas上时是已经OK的
  async componentDidMount() {
    // const mapImage = await this.dynamicLoadMapImage();
    const iconImage = await this.dynamicLoadIconImage();
    const iconRedImage = await this.dynamicLoadIconRedImage();
    // if (this.map.current) {
    //   const { clientWidth } = this.map.current;
    //   const clientHeight = Math.floor((clientWidth * 1080) / 1920);

    // this.showLine();
    this.setState({
      // mapImage,
      icon: iconImage,
      iconRed: iconRedImage,
      // width: clientWidth,
      // height: clientHeight,
    });
    // }
    let lamps = await request.get(
      BASE_API_URL + '/jeecg-boot/intf/location/listByHistoryTrajectory',
      {
        params: {
          pageSize: 999999,
          pageNo: 1,
        },
      },
    );
    lamps = (lamps.result && lamps.result.records) || [];
    this.setState({
      ajaxLamps: lamps,
    });
    this.initRequest();
  }

  async initRequest() {
    const peopleCount = await getBigScreenPeopleCount();
    const secretLevel = await getSecretLevelPeopleCount();
    this.props.dispatch({
      type: 'bigScreen/update',
      payload: {
        bigScreenPeopleCount: peopleCount.result,
        secretLevelPeopleCount: secretLevel.result,
      },
    });
    const histroyWarnings = await warningHistorySearch({});
    this.props.dispatch({
      type: 'bigScreen/update',
      payload: {
        historyWarns: histroyWarnings,
      },
    });

    const positionPeople = await getBigScreenPositionPeopleCount();
    this.props.dispatch({
      type: 'bigScreen/update',
      payload: {
        positionPeopleCount: positionPeople.result,
      },
    });
    const warningType = await getWarnTypeByTime({ dataStr: this.state.dataStr });
    this.props.dispatch({
      type: 'bigScreen/update',
      payload: {
        warningTypeInfo: warningType.result,
      },
    });
    // 电子围栏
    const eleFence = await queryFencingArea({});
    this.props.dispatch({
      type: 'bigScreen/update',
      payload: {
        eleFenceInfo: eleFence.result,
      },
    });
    const eleType = await getAllFencingTypes();
    this.props.dispatch({
      type: 'bigScreen/update',
      payload: {
        eleTypeInfo: eleType.result,
      },
    });
    //获取大屏停留时长
    const stayTime = await getInnerStayTime();
    this.props.dispatch({
      type: 'bigScreen/update',
      payload: {
        stayTimeInfo: stayTime,
      },
    });
  }

  selectShowA = () => {
    this.setState({ showPeopleInfo: true, currentIndex: false, showLamps: true });
  };
  selectShow = () => {
    this.setState({ showPeopleInfo: false, currentIndex: true, showLamps: false });
  };

  showLine() {
    const { clientWidth } = this.map.current;
    const clientHeight = Math.floor((clientWidth * 1080) / 1920);

    let i = 0;
    let temp = [];
    const timer = setInterval(() => {
      const ajaxLamps = this.state.ajaxLamps;

      if (i === 0) message.success('轨迹开始');
      if (i > ajaxLamps.length - 1) {
        message.success('轨迹结束');
        clearInterval(timer);
        return;
      }
      const lnglat = ajaxLamps[i];
      const lamp = {
        x: +lnglat.xcoordinate,
        y: +lnglat.ycoordinate,
        id: lnglat.id,
        code: lnglat.abnormal,
      };
      if (lamp.code === 1) {
        message.warn('您已进入非法区域');
      }
      temp.push(lamp);
      const currentLamps = this.setupLampData(temp, clientWidth, clientHeight);

      this.setState({
        lamps: currentLamps,
      });
      i++;
    }, 1000);
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
    return (
      <LineLayer points={line} stroke="#1296db" strokeWidth={5} linecap="round" lineJoin="round" />
    );
  };

  componentWillUnmount() {
    message.destroy();
  }
  // dynamicLoadMapImage() {
  //   return new Promise(resolve => {
  //     const mapImage = new Image();
  //     mapImage.src = require('../assets/地图2.png');
  //     mapImage.onload = function () {
  //       resolve(mapImage);
  //     };
  //   });
  // }
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
  showHeatMap = () => {
    this.setState({
      showHeatMap: !this.state.showHeatMap,
    });
  };
  //电子围栏
  getEleFrom = () => {
    const { eleFenceInfo } = this.props;
    const { eleTypeInfo } = this.props;
    if (eleFenceInfo.length === 0) return null;
    const { records } = eleFenceInfo;
    // console.log(records)
    const data = records.map((item, index) => {
      const type = _.find(eleTypeInfo, { id: item.type });
      if (!type) {
        return null;
      }
      return (
        <div className="flex_outer" key={index}>
          <div className="ele_title_top">
            <div className="ele_title">{item.name}</div>
          </div>
          <div className="ele_bag">
            {!!item.lampCode
              ? item.lampCode.split(',').map((num, index) => {
                  return (
                    <span key={index} className="ele_bag_round">
                      {num}
                    </span>
                  );
                })
              : ''}
          </div>
        </div>
      );
    });
    if (data.indexOf(null) != -1)
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            textAlign: 'center',
            top: '40%',
            position: 'relative',
            fontSize: '30px',
          }}
        >
          没有电子围栏
        </div>
      );
    return data;
  };
  // 职位占比人数
  createPositionNumberGraph = () => {
    const { positionPeopleCount } = this.props;
    if (positionPeopleCount.length === 0) return null;
    var dataStyle = {
      normal: {
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
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
    const legendData = positionPeopleCount.map(item => item.name);
    const total = positionPeopleCount.reduce((p, n) => {
      return p + Number(n.num);
    }, 0);
    const series = positionPeopleCount.map((item, index) => {
      let radius = [];
      switch (index) {
        case 0:
          radius = ['20%', '30%'];
          break;
        case 1:
          radius = ['35%', '45%'];
          break;
        case 2:
          radius = ['50%', '60%'];
          break;
        case 3:
          radius = ['65%', '75%'];
          break;
        default:
          break;
      }
      return {
        name: `Line ${index}`,
        type: 'pie',
        clockWise: false,
        radius,
        itemStyle: dataStyle,
        hoverAnimation: false,
        center: ['50%', '55%'],
        data: [
          {
            value: Number(item.num),
            name: item.name,
          },
          {
            value: total,
            name: '总数',
            tooltip: {
              show: false,
            },
            itemStyle: placeHolderStyle,
          },
        ],
      };
    });
    const option = {
      // backgroundColor: '#0b214a',
      color: ['#3DD1F9', '#01E17E', '#FFAD05', '#ADFF4D'],
      tooltip: {
        show: true,
        formatter: '{b} : {c} ({d}%)',
      },

      legend: {
        top: 0,
        height: 12,
        lineHeight: 16,
        left: 10,
        padding: 0,
        align: 'left',
        itemGap: 2,
        itemHeight: 15, //图例标记的图形宽度。
        itemWidth: 15, //图例标记的图形gao度。
        // orient: 'vertical', //图例列表的布局朝向。
        data: legendData,
        // itemGap: 38,
        textStyle: {
          color: '#A3E2F4',
          fontSize: 17,
          align: 'right',
          x: 'right',
          textAlign: 'right',
        },
        selectedMode: true,
      },
      series: series,
    };
    return <ReactEcharts option={option} style={{ height: '100%', width: '100%' }} />;
  };
  // 停留时长分析

  createStayTimeAnalyzeGraph = () => {
    const { stayTimeInfo } = this.props;
    if (stayTimeInfo.length === 0) return null;
    const dataFormat = stayTimeInfo.map(item => ({
      value: item.num,
      name: item.name,
    }));
    const dataEg = stayTimeInfo.map(item => item.name);
    const option = {
      color: ['#EAEA26', '#906BF9', '#FE5656', '#01E17E', '#3DD1F9', '#FFAD05'],

      grid: {
        left: 0,
        top: 20,
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
        itemGap: 0,
        textStyle: {
          color: '#A3E2F4',
          fontSize: 18,
          fontWeight: 0,
        },
        data: dataEg,
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
          stack: 'a',
          type: 'pie',
          radius: ['20%', '65%'],
          roseType: 'area',
          zlevel: 5,
          label: {
            normal: {
              show: false,
              formatter: '{c}',
              textStyle: {
                fontSize: 12,
              },
            },
            emphasis: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false,
              length: 20,
              length2: 35,
            },
            emphasis: {
              show: false,
            },
          },
          data: dataFormat,
        },
      ],
    };
    return <ReactEcharts option={option} style={{ height: '100%', width: '100%' }} />;
  };
  createPoliceType = () => {
    const { warningTypeInfo } = this.props;
    if (warningTypeInfo.length === 0) return null;
    const data =
      warningTypeInfo &&
      warningTypeInfo.map((warnType, dataIndex) => {
        let info = warnType.warnTypeNumList.map(res => res.num);
        return {
          name: warnType.warnTypeName,
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight',
              formatter: function(params) {
                if (params.value > 0) {
                  return params.value;
                } else {
                  return '';
                }
              },
            },
          },
          itemStyle: {
            normal: {
              color: [
                'rgba(9,120,242,1)',
                'rgba(77,253,184,1)',
                'rgba(255,180,0,1)',
                'rgba(241,126,60,1)',
                'rgba(73,86,227,1)',
              ][dataIndex],
            },
          },
          data: info,
        };
      });
    const legendData =
      warningTypeInfo && warningTypeInfo.map((warnType, index) => warnType.warnTypeName);
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'line', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      legend: {
        textStyle: {
          color: '#A3E2F4',
          fontSize: 17,
          align: 'right',
          x: 'right',
          textAlign: 'right',
        },
        orient: 'horizontal',
        itemHeight: 15, //图例标记的图形宽度。
        itemWidth: 15, //图例标记的图形gao度。
        data: legendData,
      },

      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#7AB2E2',
          },
        },
        axisLabel: {
          inside: false,
          textStyle: {
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
      series: data,
    };
    return <ReactEcharts option={option} style={{ width: '100%', height: '100%' }} />;
  };
  createRouteCheckData = () => {
    const columns = [
      // {
      //   title: '序号',
      //   dataIndex: 'id',
      //   editable: true,
      //   ellipsis: true,
      // },
      {
        title: '告警信息',
        dataIndex: 'warnName',
        editable: true,
        ellipsis: true,
        render: (name, record) => {
          return (
            <div>
              <span>{name}</span>
              {record.processResult == '1' ? (
                <span style={{ marginLeft: '10px' }} className={styles.notResolved}>
                  未处理
                </span>
              ) : (
                <span style={{ marginLeft: '10px' }} className={styles.resolveed}>
                  已处理
                </span>
              )}
            </div>
          );
        },
      },
      {
        title: '处理时间',
        dataIndex: 'processTime',
        editable: true,
        ellipsis: true,
        onCell: () => {
          return {
            style: {
              // maxWidth: 150,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              cursor: 'pointer',
            },
          };
        },
        render: item => (
          <Tooltip
            className="tooltips"
            placement="topLeft"
            title={item ? moment(item).format('MM-DD HH:mm') : ''}
          >
            {item ? moment(item).format('MM-DD HH:mm') : ''}
          </Tooltip>
        ),
      },
    ];
    let historyWarns = this.props.historyWarns;
    if (_.isEmpty(historyWarns)) {
      historyWarns = {
        records: [],
        total: 0,
      };
    }
    let { records } = historyWarns;

    if (records.length === 0) {
      return <Table columns={columns} dataSource={[]} />;
    }
    return (
      <Table
        columns={columns}
        dataSource={records}
        pagination={false}
        scroll={{ y: 240 }}
        size="small"
      />
    );
  };
  setupLeftPanel = () => {
    let { bigScreenPeopleCount, secretLevelPeopleCount = [] } = this.props;
    const allSecretLevel = secretLevelPeopleCount.reduce((prev, next) => {
      return prev + Number(next.num);
    }, 0);
    const setupSecretLevels = secretLevelPeopleCount.map(item => {
      if (allSecretLevel == 0) return { ...item, percent: 0 };
      return { ...item, percent: ((+item.num / allSecretLevel) * 100).toFixed(2) };
    });
    let { outPeople, onlinePeople, inPeople, yesHigh, toHigh } = bigScreenPeopleCount;

    onlinePeople = _.padStart(onlinePeople, 5, '0');
    return (
      <div className="top">
        <div className="statics">
          <div className="people_type_title">
            <span className="icon" />
            <span className="titlename">流量统计</span>
          </div>
          <div className="title">当前在线人数</div>
          <div className="number">
            {_.map(_.split(`${onlinePeople}`, ''), item => (
              <span>{item}</span>
            ))}
          </div>
          <div className="today-data">
            <span className="icon" />

            <span className="data-title">今日最高值</span>
            <span className="data-number">{toHigh}</span>
          </div>
          <div className="yesterday-data">
            <span className="icon" />
            <span className="data-title">昨日最高值</span>
            <span className="data-number">{yesHigh}</span>
          </div>
        </div>
        <div className="people_type">
          <div className="people_type_title">
            <span className="icon" />
            <span className="titlename">人员类型</span>
          </div>
          <div className="inner_or_outer">
            <span className="left">
              {/* <span className="icon">内</span> */}
              <span className="text_span"> 内部</span>
              <span className="number_span"> {inPeople}</span>
            </span>
            <span className="right">
              {/* <span className="icon">外</span> */}
              <span className="text_span">外部</span>
              <span className="number_span">{outPeople}</span>
            </span>
          </div>
        </div>
        <div className="people-secret">
          <div className="people-type">
            <span className="icon" />
            <span className="titlename">保密级别人数占比</span>
          </div>
          {setupSecretLevels.map((item, index) => (
            <div className={`people_progress people_progress_${index}`}>
              <div>
                <span>{item.securityLevel}</span>
                <span className="people-number"> {item.num}人</span>
              </div>
              <Progress percent={item.percent} />
              <div className="people_progress_num">{item.percent}%</div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  render() {
    // const { mapImage, width, height } = this.state;
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
              {this.setupLeftPanel()}
            </Col>
            <Col span={16} className="middle_panel">
              <div className={styles.map_manager} ref={this.map}>
                <RealTime showLamps={this.state.showLamps} showHeatMap={this.state.showHeatMap} />
              </div>
            </Col>
            <Col span={4} className="right_panel">
              {this.state.showPeopleInfo == true ? (
                <div>
                  <div className="right_top_panel">
                    <div>
                      <div>
                        <Title title="职位占比人数" />
                      </div>
                      <div className="echarts">
                        <div className="graph" style={{ height: '200px', width: '100%' }}>
                          {this.createPositionNumberGraph()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="right_middle_panel">
                    <div>
                      <div>
                        <Title title="停留时长分析" />
                      </div>
                      <div className="echarts">
                        <div className="graph" style={{ height: '200px', width: '100%' }}>
                          {this.createStayTimeAnalyzeGraph()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="right_bottom_panel">
                    <div>
                      <div>
                        <Title title="告警类型统计" />
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
                        <Title title="电子围栏" />
                      </div>
                      <div className="ele_from"> {this.getEleFrom()} </div>
                    </div>
                  </div>

                  <div className="right_wraning_panel">
                    <div className="ele_text">
                      <Title title="告警信息" />
                    </div>
                    <div className="ele_from">{this.createRouteCheckData()}</div>
                  </div>
                </div>
              )}
              <div className="middle_text">
                <Breadcrumb>
                  <Breadcrumb.Item>
                    {' '}
                    <div
                      className={['text_panel', this.state.showHeatMap ? 'active' : null].join(' ')}
                      onClick={this.showHeatMap}
                    >
                      {/* className={styles.heatmapBtn} */}
                      热力图
                    </div>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    {' '}
                    <div
                      className={['text_panel', this.state.currentIndex ? 'active' : null].join(
                        ' ',
                      )}
                      onClick={this.selectShow}
                    >
                      人员信息
                    </div>
                  </Breadcrumb.Item>

                  <Breadcrumb.Item>
                    {' '}
                    <div
                      className={['text_panel', !this.state.currentIndex ? 'active' : null].join(
                        ' ',
                      )}
                      onClick={this.selectShowA}
                    >
                      灯具显示
                    </div>
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </Col>
            }
          </Row>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  const { bigScreen } = state;
  return {
    ...bigScreen,
  };
};

export default connect(mapState)(Realtime);

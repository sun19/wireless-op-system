/**
 * title: 实时轨迹
 */
import React, { Component } from 'react';
import { Row, Col, Icon, Table, Progress, Tooltip } from 'antd';
import ReactEcharts from 'echarts-for-react';
import request, { format } from '@/utils/request';
import { connect } from 'dva';
import moment from 'moment';

import { BASE_API_URL } from '../../../config/constants';
import Navigation from '../components/navigation';
import Title from '../components/Title';
import {
  getBigScreenPeopleCount,
  getBigScreenPositionPeopleCount,
  getSecretLevelPeopleCount,
  getInnerOrOuterPeopleCount,
  getWarnTypeByTime,
  getInnerStayTime,
} from '../services';
import styles from './index.less';
interface State {
  routeData: any[];
  realInfo: any[];
  dataStr?: string;
}
class DataView extends Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      routeData: [],
      realInfo: [],
      dataStr: '2019-11-15',
    };
  }
  async componentDidMount() {
    const realInfo = await request.get(BASE_API_URL + '/jeecg-boot/intf/location/listByUserInfo');
    const routeData = await request.get(
      BASE_API_URL + '/jeecg-boot/intf/location/findbyInspectionReports',
    );
    this.setState({
      routeData,
      realInfo,
    });
    this.initRequest();
  }
  async initRequest() {
    const peopleCount = await getBigScreenPeopleCount();
    this.props.dispatch({
      type: 'bigScreen/update',
      payload: {
        bigScreenPeopleCount: peopleCount.result,
      },
    });
    const positionPeople = await getBigScreenPositionPeopleCount();
    this.props.dispatch({
      type: 'bigScreen/update',
      payload: {
        positionPeopleCount: positionPeople.result,
      },
    });
    const secretLevel = await getSecretLevelPeopleCount();
    this.props.dispatch({
      type: 'bigScreen/update',
      payload: {
        secretLevelPeopleCount: secretLevel.result,
      },
    });

    const innerOuterPeople = await getInnerOrOuterPeopleCount();
    this.props.dispatch({
      type: 'bigScreen/update',
      payload: {
        innerOuterPeople: innerOuterPeople.result,
      },
    });
    const warningType = await getWarnTypeByTime({ dataStr: this.state.dataStr });
    this.props.dispatch({
      type: 'bigScreen/update',
      payload: {
        warningTypeInfo: warningType.result,
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
  // 职位占比人数
  createPositionNumberGraph = () => {
    let { positionPeopleCount } = this.props;
    positionPeopleCount = positionPeopleCount;
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
            // name: '总数',
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
        bottom: 0,
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
        itemWidth: 8,
        itemHeight: 8,
        itemGap: 16,
        textStyle: {
          color: '#A3E2F4',
          fontSize: 18,
          width: 12,
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
          formatter: '{c}',
          show: false,
          padding: [0, 0, 10, 0],
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
          // center: ['50%', '40%'],
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
  createWeeklyPersonCount = () => {
    const { peopleType } = this.props.innerOuterPeople;
    if (!peopleType || (Array.isArray(peopleType) && peopleType.length === 0)) return null;
    //数据
    var XName = peopleType.map(item => item.time);
    var data1 = [
      // [123, 154, 234, 321, 120, 390, 634],
      peopleType.map(item => item.inner),
      // [63, 194, 234, 321, 278, 110, 534],
      peopleType.map(item => item.outer),
    ];
    var Line = ['内部人员', '外部人员'];
    var img = [
      'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABRCAYAAABFTSEIAAAACXBIWXMAAAsSAAALEgHS3X78AAAEp0lEQVR42u3cz4sjRRTA8W9Vd3Vn8mMmjj9WQWSRZQ+CsH+B7MnDIgiCd0E8CYJ/gOAIelo8ehUP/gF6WLw5/gMueFP2sIcF0dHd2Z1kknR11fOQZJJJMtlZd03H7HtQpNOTnpn+8Lrm1etmjIig8e/DKoECKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIqoAJudKTr+osZMNPvBUQBHwHsPF9fB9R0DeHMOQ6T6WOrhEzXBM4swDOL0M6CrArRVoq3t2dGUIb9fTvatg8ZZup1PDBgzPmy98mey6qfzjLz2WaWjEUZKEvGyi9nWyneMOvGIyFQo2Sbg4MUSChpU9IeTTUpJdsEajPZOJeJG5uBZj7rLLduWS5dGm6XNLEELOFUFj54ACJCaychkpDSASK3bwsXL0YgVpWJKwM0iy9Zy8HdGru7jvt3Pbu7w0wES7drTwAbjTHMGCsQcIAnYTC1/wRx0wEnl27JNgZI8HQ6Kc1mQq83RNzaMjPzXqDbjTQaJRFLxIyyMSxAXEkWrhrQzAAmo5HOjCQf7jflILxOkohL+aUPgV4vEGNJo+E5PAy02+UIMEwBxo0CPDP7Dg5SnEtpt1PA0e87XO25FOoh8IYIH2Y5b45RzGAQBiIltZoHxqMcjbksXAVgdc2EQMYzzzdotyeZWKuleULXJtwT4SODfC2QCWR+IF9KnjuX1Xbo99Op7LVE8iXlz0YBTk5SyLEEjo5OLuccEoFUvHfO+reuUPx4zftXAIcx1hdcF+/TvFab4A0Bs0VwqyhpVnkJT89/Q4DDQ0e77YCMwIUsFMeFZD856699URRvX4nxE4A/jbnxXp7v4Zw3ReGNSDHI8wFQjIafuoyn58L/fB6sth/Ybg9fez2TRC6QZcZYvgHsazF+MP7YCyLXcM7gvSXLDGBqYDg+NhwdmSpPoTrAkub0W+f4FSB1fDucIunMHSLpO8WAH0rSy8u+19MBCHB4OHzd2pI+CEUhpigEiN+l6WcdY252jLn5s7Wf472ImPcN8pUl/tEHoV4XWq1Ke4KrLmPsTA3oODpytFoOyJKSyzHyMSIxteWngMW5cSEdDJQUhTdZVgxOz3/+jFJm4+bA2e5JpNU6WZ4Fw99JwnWMKccwpeddP+B7GZTNUPKqybJy0O+Hs1YfMz9swwvpB8fbGDG0GuGkkK7V0hxSmZQpABI8l2z0v3sJf50qpAMJCd2qCulql3LD1lRGQjm7lEsDz0rkxTQOfiPPxUBcuJTbbhss/Y1eyi3NwsmKInmkZsKk5gtPUzNhvp11507CSy/X6XYStpvFudpZw1ZWIOF4Cq6SdtbKbioJyAhRTu3u9yMJXerN+ugvaQQsjcZ8Q3VnZwxlSDhe1lB9GjrSw5b+1avT8+Jw+979nNaOI6U3KpTrWAosxVQmygK4ld8X0ZtK/7eViExD7O1NQPb3T7fsl4/4sBpwYzPwjFbTo95Yl9l9Vd1YN1X/147HebSjary1AHyc5qc+XLQEQx9ve8Kg6xr6hKoCKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIq4JrHP8fEWV8FMTmOAAAAAElFTkSuQmCC',
      'image://data:image/png;base64,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',
    ];
    var color = ['#00f8ff', '#00f15a', '#0696f9', '#dcf776'];

    //数据处理
    var datas = [];
    Line.map((item, index) => {
      datas.push({
        symbolSize: 150,
        symbol: img[index],
        name: item,
        type: 'line',
        yAxisIndex: 1,
        data: data1[index],
        itemStyle: {
          normal: {
            borderWidth: 5,
            color: color[index],
          },
        },
      });
    });

    const option = {
      grid: {
        left: '8%',
        top: '5%',
        bottom: '12%',
        right: '5%',
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        top: '0',
        right: '10',
        data: Line,
        itemWidth: 18,
        itemHeight: 12,
        textStyle: {
          color: 'rgba(122,178,226,1)',
          fontSize: 20,
        },
      },
      yAxis: [
        {
          type: 'value',
          position: 'right',
          splitLine: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
          },
          nameTextStyle: {
            color: 'rgba(122,178,226,1)',
          },
        },
        {
          type: 'value',
          position: 'left',
          nameTextStyle: {
            color: 'rgba(122,178,226,1)',
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: 'rgba(135,140,147,0.8)',
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            formatter: '{value}',
            color: '#fff',
            fontSize: 24,
          },
        },
      ],
      xAxis: [
        {
          type: 'category',
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#6A989E',
            },
          },
          axisLabel: {
            inside: false,
            textStyle: {
              color: '#fff', // x轴颜色
              fontWeight: 'normal',
              fontSize: '24',
              lineHeight: 22,
            },
          },
          data: XName,
        },
        {
          type: 'category',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitArea: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          //-----
          data: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7'],
        },
      ],
      series: datas,
    };
    return <ReactEcharts option={option} style={{ width: '100%', height: '100%' }} />;
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
  createSecretLevel = () => {
    // let { secretLevelPeopleCount = [] } = this.props;

    // const allSecretLevel = secretLevelPeopleCount.reduce((prev, next) => {
    //   return prev + Number(next.num);
    // }, 0);

    // const setupSecretLevels = secretLevelPeopleCount.map(item => {
    //   return { ...item, percent: ((+item.num / allSecretLevel) * 100).toFixed(2) };
    // });
    // var valdata = secretLevelPeopleCount.map(item => +item.num);
    // var titlename = secretLevelPeopleCount.map(item => item.securityLevel);
    // var data = setupSecretLevels.map(item => item.percent);

    // var myColor = ['#3434DB', '#FF9C00', '#006CFF'];
    // const option = {
    //   xAxis: {
    //     show: false,
    //     max: 100,
    //     type: 'value',
    //   },
    //   grid: {
    //     left: '5%',
    //     right: '3%',
    //     bottom: '3%',
    //     containLabel: true,
    //   },
    //   yAxis: [
    //     {
    //       show: true,
    //       data: titlename,
    //       inverse: true,
    //       axisLine: {
    //         show: false,
    //       },
    //       splitLine: {
    //         show: false,
    //       },
    //       axisTick: {
    //         show: false,
    //       },
    //       axisLabel: {
    //         textStyle: {
    //           color: 'rgba(255,255,255,1)',
    //           fontSize: 20,

    //         },
    //         formatter: function (value, index) {
    //           return ['{title|' + value + '} '].join('\n');
    //         },
    //         rich: {},
    //       },
    //     },
    //     {
    //       show: true,
    //       inverse: true,
    //       data: valdata,
    //       axisLabel: {
    //         textStyle: {
    //           color: 'rgba(255,255,255,1)',
    //           fontSize: 20,
    //         },
    //         formatter: function (value, index) {
    //           return value + '人';
    //         },
    //       },
    //       axisLine: {
    //         show: false,
    //       },
    //       splitLine: {
    //         show: false,
    //       },
    //       axisTick: {
    //         show: false,
    //       },
    //     },
    //   ],
    //   series: [
    //     {
    //       // name: '条',
    //       type: 'bar',
    //       yAxisIndex: 0,
    //       data: data,
    //       barWidth: 20,
    //       itemStyle: {
    //         normal: {
    //           barBorderRadius: 2,
    //           color: function (params) {
    //             var num = myColor.length;
    //             return myColor[params.dataIndex % num];
    //           },
    //         },
    //       },
    //       label: {
    //         normal: {
    //           show: true,
    //           fontSize: 20,
    //           position: 'bottom',
    //           formatter: '{c}%',
    //         },
    //       },
    //     },
    //   ],
    // };
    // return <ReactEcharts option={option} style={{ width: '100%', height: '100%' }} />;
    let { secretLevelPeopleCount = [] } = this.props;
    const allSecretLevel = secretLevelPeopleCount.reduce((prev, next) => {
      return prev + Number(next.num);
    }, 0);
    const setupSecretLevels = secretLevelPeopleCount.map(item => {
      return { ...item, percent: ((+item.num / allSecretLevel) * 100).toFixed(2) };
    });
    return setupSecretLevels.map((item, index) => (
      <div className={`people_progress people_progress_${index}`}>
        <div>
          <span>{item.securityLevel}</span>
          <span className="people-number"> {item.num}人</span>
        </div>
        <Progress percent={item.percent} />
        <div className="people_progress_num">{item.percent}%</div>
      </div>
    ));
  };
  createRouteCheckData = () => {
    const columns = [
      {
        title: '开始时间',
        dataIndex: 'inspectionTime',
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
        render: text => (
          <Tooltip
            className="tooltips"
            placement="topLeft"
            title={moment(text).format('MM-DD HH:mm')}
          >
            {moment(text).format('MM-DD HH:mm')}
          </Tooltip>
        ),
      },
      {
        title: '结束时间',
        dataIndex: 'endTime',
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
        render: text => (
          <Tooltip
            className="tooltips"
            placement="topLeft"
            title={moment(text).format('MM-DD HH:mm')}
          >
            {moment(text).format('MM-DD HH:mm')}
          </Tooltip>
        ),
      },
      {
        title: '巡检人员',
        dataIndex: 'inspectionName',
        editable: true,
        ellipsis: true,
      },
      {
        title: '巡检路线',
        dataIndex: 'routeName',
        editable: true,
        ellipsis: true,
      },
      {
        title: '完成状态',
        dataIndex: 'isComplete',
        editable: true,
        ellipsis: true,
        className: 'select_text',

        render: tag => {
          const className = tag === '1' ? 'complete_ok' : 'complete_no';
          return <span className={className} />;
        },
      },
    ];
    let records = this.state.routeData;
    // records = records.map((item, index) => Object.assign(records, { key: item }));

    if (records.length === 0) {
      return <Table columns={columns} dataSource={[]} />;
    }
    return (
      <Table
        columns={columns}
        // dataSource={[]}
        dataSource={records}
        pagination={false}
        scroll={{ y: 240 }}
        size="small"
      />
    );
  };
  createRealInfoOfPeopleInArea = () => {
    const columns = [
      {
        title: '信息牌',
        dataIndex: 'information_board_id',
        editable: true,
      },
      {
        title: '姓名',
        dataIndex: 'name',
        editable: true,
      },
      {
        title: '职位',
        dataIndex: 'position_id',
        editable: true,
      },
    ];
    let records = this.state.realInfo;
    // records = records.map((item, index) => Object.assign(records, { key: item }));
    if (records.length === 0) {
      return <Table columns={columns} dataSource={[]} />;
    }
    return (
      <Table
        columns={columns}
        dataSource={records.result || []}
        size="small"
        pagination={false}
        fixed={true}
        scroll={{ y: 240 }}
      />
    );
  };
  render() {
    let { bigScreenPeopleCount } = this.props;
    let { outPeople = 0, inPeople = 0 } = bigScreenPeopleCount;

    return (
      <div className={styles.dataview_root_container}>
        <div className="header">
          <Navigation />
        </div>
        <div className="content">
          <Row>
            <Col span={4}>
              <div className="inner_border">
                <Title title="人员类型" />
                <Row>
                  <Col span={17} offset={4}>
                    <div className="ver-middle">
                      {/* <span className="icon icon-nei" /> */}
                      <span className="icon-name">内部人员</span>
                      <span className="icon-number"> {outPeople} </span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={17} offset={4}>
                    <div className="ver-middle">
                      {/* <span className="icon icon-wai " /> */}
                      <span className="icon-name">外部人员</span>
                      <span className="icon-number">{inPeople}</span>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={4}>
              <div className="inner_border">
                <Title title="职位人数占比" />
                <div className="graph">{this.createPositionNumberGraph()}</div>
              </div>
            </Col>
            <Col span={4}>
              <div className="inner_border">
                <Title title="保密级别人数占比" />
                <div className="graph">{this.createSecretLevel()}</div>
              </div>
            </Col>
            <Col span={4}>
              <div className="inner_border">
                <Title title="停留时长分析" />
                <div className="graph">{this.createStayTimeAnalyzeGraph()}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="inner_border">
                <Title title="巡检数据" />
                <div className="graph">{this.createRouteCheckData()}</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <div className="inner_border">
                <Title title="内、外部一周人数统计" />
                <div className="graph">{this.createWeeklyPersonCount()}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="inner_border">
                <Title title="告警类型统计" />
                <div className="graph">{this.createPoliceType()}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="inner_border">
                <Title title="区域内实时人员信息" />
                <div className="graph">{this.createRealInfoOfPeopleInArea()}</div>
              </div>
            </Col>
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

export default connect(mapState)(DataView);

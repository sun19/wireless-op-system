/**
 * title: 实时轨迹
 */
import React, { Component } from 'react';
import { Row, Col, Icon, Table } from 'antd';
import ReactEcharts from 'echarts-for-react';
import request from 'umi-request';

import Navigation from '../components/navigation';
import RealTimeTrack from '../../map-manager';
import MainContent from '../components/MainContent';
import Title from '../components/Title';

import styles from '../index.less';

interface State {
  routeData: any[];
  realInfo: any[];
}

export default class HomePage extends Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      routeData: [],
      realInfo: [],
    };
  }
  async componentDidMount() {
    const realInfo = await request.get(
      'http://47.96.112.31:8086/jeecg-boot/intf/location/listByUserInfo',
    );
    const routeData = await request.get(
      'http://47.96.112.31:8086/jeecg-boot/intf/location/findbyInspectionReports',
    );
    this.setState({
      routeData,
      realInfo,
    });
  }
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
      color: ['#4DFFE3', '#4DE0FF', '#4DFF8F', '#ADFF4D'],
      tooltip: {
        show: true,
        formatter: '{b} : {c}',
      },

      legend: {
        top: '13.5%',
        x: 'right',
        left: '42%',
        itemWidth: 0,
        itemHeight: 0,
        data: ['作战人员', '主官', '首长'],
        itemGap: 38,
        textStyle: {
          color: '#fff',
          align: 'right',
          x: 'right',
          textAlign: 'right',
        },

        selectedMode: true,
        orient: 'vertical',
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
              value: 2632321,
              name: '作战人员',
            },
            {
              value: 2212343,
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
              value: 1823323,
              name: '主官',
            },
            {
              value: 1812343,
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
              value: 1342221,
              name: '首长',
            },
            {
              value: 1912343,
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
      backgroundColor: '#0B1837',
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
  createWeeklyPersonCount = () => {
    //数据
    var XName = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7'];
    var data1 = [
      [123, 154, 234, 321, 120, 390, 634],
      [63, 194, 234, 321, 278, 110, 534],
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
        top: '10%',
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
          fontSize: 12,
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
            fontSize: 14,
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
              fontSize: '14',
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
        textStyle: {
          color: '#7AB2E2',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        max: 120,
        axisLine: {
          lineStyle: {
            color: '#7AB2E2',
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
        axisTick: {
          show: false,
        },
      },
      series: [
        {
          name: '闯入告警',
          type: 'bar',
          stack: '总量',
          barWidth: 10,
          itemStyle: {
            normal: {
              color: 'rgba(9,120,242,1)',
              barBorderRadius: [0, 0, 0, 0],
            },
          },
          label: {
            normal: {
              show: false,
              position: 'insideRight',
            },
          },
          z: 10,
          data: [32, 30, 30, 33, 39, 33, 32],
        },
        {
          name: '闯出告警',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            normal: {
              color: 'rgba(77,253,184,1)',
              barBorderRadius: [0, 0, 0, 0],
            },
          },
          label: {
            normal: {
              show: false,
              position: 'insideRight',
            },
          },
          z: 5,
          data: [12, 13, 10, 13, 9, 23, 21],
        },
        {
          name: '聚集告警',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            normal: {
              barBorderRadius: [0, 0, 0, 0],
              color: 'rgba(255,180,0,1)',
            },
          },
          label: {
            normal: {
              show: false,
              position: 'insideRight',
            },
          },
          data: [12, 8, 9, 23, 9, 13, 21],
        },
        {
          name: '超员告警',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            normal: {
              barBorderRadius: [0, 0, 0, 0],
              color: 'rgba(241,126,60,1)',
            },
          },
          label: {
            normal: {
              show: false,
              position: 'insideRight',
            },
          },
          data: [12, 18, 15, 23, 19, 23, 21],
        },
        {
          name: '脱岗告警',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            normal: {
              barBorderRadius: [0, 20, 20, 0],
              color: 'rgba(73,86,227,1)',
            },
          },
          label: {
            normal: {
              show: true,
              position: 'insideRight',
            },
          },
          data: [10, 12, 13, 15, 14, 19, 20],
        },
      ],
    };
    return <ReactEcharts option={option} style={{ width: '100%', height: '100%' }} />;
  };
  createSecretLevel = () => {
    var data = [84, 70, 46];
    var titlename = ['一级', '二级', '三级'];
    var valdata = [683, 234, 234];
    var myColor = ['#3434DB', '#FF9C00', '#006CFF'];
    const option = {
      xAxis: {
        show: false,
      },
      grid: {
        left: '5%',
        right: '3%',
        bottom: '3%',
        containLabel: true,
      },
      yAxis: [
        {
          show: true,
          data: titlename,
          inverse: true,
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,1)',
            },
            formatter: function(value, index) {
              return ['{title|' + value + '} '].join('\n');
            },
            rich: {},
          },
        },
        {
          show: true,
          inverse: true,
          data: valdata,
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,1)',
            },
            formatter: function(value, index) {
              return value + '人';
            },
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: '条',
          type: 'bar',
          yAxisIndex: 0,
          data: data,
          barWidth: 10,
          itemStyle: {
            normal: {
              barBorderRadius: 30,
              color: function(params) {
                var num = myColor.length;
                return myColor[params.dataIndex % num];
              },
            },
          },
          label: {
            normal: {
              show: true,
              position: 'inside',
              formatter: '{c}%',
            },
          },
        },
      ],
    };
    return <ReactEcharts option={option} style={{ width: '100%', height: '100%' }} />;
  };
  createRouteCheckData = () => {
    const columns = [
      {
        title: '开始时间',
        dataIndex: 'inspectionTime',
        editable: true,
        ellipsis: true,
      },
      {
        title: '结束时间',
        dataIndex: 'endTime',
        editable: true,
        ellipsis: true,
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
        dataSource={records}
        size="small"
        pagination={false}
        fixed={true}
        scroll={{ y: 240 }}
      />
    );
  };
  render() {
    // return <RealTimeTrack />;
    return (
      <div className={styles.homepage_root_container}>
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
                      <span className="icon icon-nei" />
                      <span className="icon-name">内部人员</span>
                      <span className="icon-number">316</span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={17} offset={4}>
                    <div className="ver-middle">
                      <span className="icon icon-wai " />
                      <span className="icon-name">外部人员</span>
                      <span className="icon-number">8</span>
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

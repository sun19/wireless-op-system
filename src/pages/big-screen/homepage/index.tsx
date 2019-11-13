/**
 * title: 实时轨迹
 */
import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import ReactEcharts from 'echarts-for-react';

import Navigation from '../components/navigation';
import RealTimeTrack from '../../map-manager';
import Title from '../components/Title';

import styles from '../index.less';

export default class HomePage extends Component {
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
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <div className="inner_border">
                <Title title="内、外部一周人数统计" />
              </div>
            </Col>
            <Col span={8}>
              <div className="inner_border">
                <Title title="告警类型统计" />
              </div>
            </Col>
            <Col span={8}>
              <div className="inner_border">
                <Title title="区域内实时人员信息" />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

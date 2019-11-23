/**
 * title: 添加
 */
import React from 'react';
import { Form, Row, Col, Button, Input, Select, DatePicker, Cascader } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import Konva from 'konva';
import { Stage, Layer, Image as ImageLayer, Line as LineLayer } from 'react-konva';
import router from 'umi/router';

import ContentBorder from '../../../components/ContentBorder';
import { UmiComponentProps } from '@/common/type';
import {
  getAllMap,
  getAllFencingTypes,
  getAllUserInfo,
  getAllLevels,
  getAllArea,
} from '@/pages/login/login.service';
import { addMapFencingArea } from '../services';

import styles from './index.less';

const { TextArea } = Input;
const { Option } = Select;

interface State {
  mapImage: any;
  width: number;
  height: number;
}

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormComponentProps;

class FencingSetting extends React.Component<Props, State> {
  map: React.RefObject<HTMLDivElement>;
  constructor(props) {
    super(props);
    this.map = React.createRef<HTMLDivElement>();
    this.state = {
      mapImage: null,
      width: 0,
      height: 0,
    };
    this.initRequest = this.initRequest.bind(this);
  }
  async componentDidMount() {
    const mapImage = await this.dynamicLoadMapImage();
    if (this.map.current) {
      const { clientWidth, clientHeight } = this.map.current;

      this.setState({
        mapImage,
        width: clientWidth,
        height: clientHeight,
      });
    }
    this.initRequest();
  }

  async initRequest() {
    const maps = await getAllMap();
    const fencingTypes = await getAllFencingTypes();
    let usersResp = await getAllUserInfo();
    let users = [];
    for (let i = 0; i < usersResp.result.length; i++) {
      const dept = usersResp.result[i];
      for (let j = 0; j < dept.relatePeopleResponses.length; j++) {
        const item = dept.relatePeopleResponses[j];
        users.push(item);
      }
    }
    const levels = await getAllLevels();
    const areas = await getAllArea();
    this.props.dispatch({
      type: 'mapManager/update',
      payload: {
        allMaps: maps.result,
        fencingTypes: fencingTypes.result,
        users: users,
        levels: levels.result,
        areas: areas.result,
      },
    });
  }

  dynamicLoadMapImage() {
    return new Promise(resolve => {
      const mapImage = new Image();
      mapImage.src = require('../../big-screen/assets/map.png');
      mapImage.onload = function() {
        resolve(mapImage);
      };
    });
  }

  setupRelationPeople = () => {
    const { users } = this.props;
    const { getFieldDecorator } = this.props.form;

    return getFieldDecorator('userId', {
      rules: [],
    })(
      <Select mode="multiple" placeholder="请选择关联人员" style={{ width: '100%' }}>
        {users.map(user => (
          <Option key={user.id} value={user.id}>
            {user.name}
          </Option>
        ))}
      </Select>,
    );
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      const { effectiveTime, failureTime, userId, ...props } = values;
      const data = {
        ...props,
        effectiveTime: values.effectiveTime
          ? values.effectiveTime.format('YYYY-MM-DD HH:mm:ss').toString()
          : '',
        failureTime: values.failureTime
          ? values.failureTime.format('YYYY-MM-DD HH:mm:ss').toString()
          : '',
        userId: userId.join(','),
      };

      await addMapFencingArea(data);
      router.push('/map-manager/fence-setting');
      // this.getRouteInspectList(data);
    });
  };

  onBack = () => {
    router.push('/map-manager/fence-setting');
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { mapImage, width, height } = this.state;
    const { maps, fencingTypes, users, levels, areas } = this.props;
    return (
      <ContentBorder className={styles.auth_root}>
        <Form
          layout="inline"
          labelAlign="right"
          style={{ marginTop: '0.57rem' }}
          onSubmit={this.onSubmit}
        >
          <div className="auth__inner--container">
            <div className={styles.input_body}>
              <Row type="flex" justify="space-between">
                <Col span={24}>
                  <Form.Item label="地图名称">
                    {getFieldDecorator('mapName', {
                      rules: [
                        {
                          message: '请选择地图名称',
                        },
                      ],
                    })(
                      <Select placeholder="请选择地图名称">
                        {maps.map(item => (
                          <Option value={item.name} key={item.name}>
                            {item.name}
                          </Option>
                        ))}
                      </Select>,
                    )}
                  </Form.Item>
                  <Form.Item label="围栏名称">
                    {getFieldDecorator('name', {
                      rules: [
                        {
                          message: '请输入围栏名称',
                        },
                      ],
                    })(<Input placeholder="请输入围栏名称" />)}
                  </Form.Item>
                  <Form.Item label="围栏类型">
                    {getFieldDecorator('type', {
                      rules: [
                        {
                          message: '请选择围栏类型',
                        },
                      ],
                    })(
                      <Select placeholder="请选择围栏类型">
                        {fencingTypes.map(item => (
                          <Option value={item.name} key={item.name}>
                            {item.name}
                          </Option>
                        ))}
                      </Select>,
                    )}
                  </Form.Item>
                  <Form.Item label="是否永久">
                    {getFieldDecorator('isForever', {
                      rules: [
                        {
                          message: '请选择是否永久',
                        },
                      ],
                    })(
                      <Select placeholder="请选择是否永久">
                        <Option value="是">是</Option>
                        <Option value="否">否</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Row type="flex" justify="space-between">
                <Col span={24}>
                  <Form.Item label="生效时间">
                    {getFieldDecorator('effectiveTime', {
                      rules: [],
                    })(
                      <DatePicker
                        showTime={true}
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="请选择开始时间"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item label="失效时间">
                    {getFieldDecorator('failureTime', {
                      rules: [],
                    })(
                      <DatePicker
                        showTime={true}
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="请选择失效时间"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item label="级别">
                    {getFieldDecorator('level', {
                      rules: [
                        {
                          message: '请选择级别',
                        },
                      ],
                    })(
                      <Select placeholder="请选择级别">
                        {levels.map(item => (
                          <Option value={item.name} key={item.name}>
                            {item.name}
                          </Option>
                        ))}
                      </Select>,
                    )}
                  </Form.Item>
                  <Form.Item label="最大人员数量">
                    {getFieldDecorator('maxUser', {
                      rules: [
                        {
                          message: '请输入最大人员数量',
                        },
                      ],
                    })(<Input placeholder="请输入最大人员数量" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row type="flex" justify="space-between">
                <Col span={24}>
                  <Form.Item label="关联人员">{this.setupRelationPeople()}</Form.Item>

                  <Form.Item className={styles.area_style} label="区域">
                    {getFieldDecorator('regionalName', {
                      rules: [
                        {
                          message: '请选择区域',
                        },
                      ],
                    })(
                      <Select
                        placeholder="请选择区域"
                        style={{ width: '5.25rem', backgroundSize: '5.25rem 0.4rem' }}
                      >
                        {areas.map(item => (
                          <Option key={item.name} value={item.name}>
                            {item.name}
                          </Option>
                        ))}
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Row className={styles.line_style}>
                <Col className={styles.line_type} span={11} />
                <Col span={2}>地图</Col>
                <Col className={styles.line_type} span={11} />
              </Row>
              <Row className={styles.line_style}>
                <Col className={styles.img_type} span={24}>
                  <div className={styles.map_manager} ref={this.map}>
                    <Stage width={width} height={height} draggable={false}>
                      <Layer>
                        <ImageLayer image={mapImage} x={0} y={0} width={width} height={height} />
                      </Layer>
                    </Stage>
                  </div>
                </Col>
              </Row>
              <Row type="flex" justify="center" style={{ marginTop: '0.35rem' }}>
                <Col span={2}>
                  <Form.Item className={styles.button_type}>
                    <Button className={styles.form_btn} htmlType="submit">
                      确认
                    </Button>
                  </Form.Item>
                </Col>
                <Col span={2} className={styles.select_padding_left}>
                  <Form.Item>
                    <Button className={styles.form_btn} onClick={this.onBack}>
                      返回
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>
        </Form>
      </ContentBorder>
    );
  }
}

const FencingSettingHOC = Form.create<Props>({ name: 'fencing_setting_add' })(FencingSetting);

const mapState = ({ mapManager }) => {
  const { allMaps, fencingTypes, users, levels, areas } = mapManager;
  return {
    mapFencing: mapManager.mapFencing,
    maps: allMaps,
    fencingTypes,
    users,
    levels,
    areas,
  };
};

export default connect(mapState)(FencingSettingHOC);

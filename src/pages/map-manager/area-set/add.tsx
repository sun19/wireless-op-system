/**
 * title: 添加
 */
import React from 'react';
import { Form, Row, Col, Button, Input, Select, DatePicker, message, Cascader } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import Konva from 'konva';
import { Stage, Layer, Image as ImageLayer, Line as LineLayer } from 'react-konva';
import router from 'umi/router';
import moment from 'moment';

import ContentBorder from '../../../components/ContentBorder';
import { UmiComponentProps } from '@/common/type';
import {
  getAllMap,
  getAllFencingTypes,
  getAllUserInfo,
  getAllLevels,
  getAllArea,
} from '@/pages/login/login.service';
import { addMapArea } from '../services';

import styles from './index.less';
import publicStyles from '../index.less';

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
    // const mapImage = await this.dynamicLoadMapImage();
    // if (this.map.current) {
    //   const { clientWidth, clientHeight } = this.map.current;

    //   this.setState({
    //     mapImage,
    //     width: clientWidth,
    //     height: clientHeight,
    //   });
    // }
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

  // dynamicLoadMapImage() {
  //   return new Promise(resolve => {
  //     const mapImage = new Image();
  //     mapImage.src = require('../../big-screen/assets/map.png');
  //     mapImage.onload = function() {
  //       resolve(mapImage);
  //     };
  //   });
  // }

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      const { ...props } = values;
      const data = {
        operatTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        ...props,
      };

      const isSuccessed =  await addMapArea(data);
       if (isSuccessed) {
        // message.success('添加成功!', 1000);
         setTimeout(() => router.push('/map-manager/area-set'), 1000);
      }
     
    });
  };

  onBack = () => {
    router.push('/map-manager/area-set');
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { mapImage, width, height } = this.state;
    const { maps, fencingTypes, users, levels, areas } = this.props;
    return (
      <ContentBorder className={styles.auth_root}>
        <Form layout="inline" style={{ marginTop: '0.57rem' }} onSubmit={this.onSubmit}>
          <Row type="flex" justify="center" align="middle" className={styles.add}>
            <Col span={12}>
              {/* <Col span={12}> */}
              <div className="add__inner--container">
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="区域名称">
                      {getFieldDecorator('regionName', {
                        rules: [
                          {
                            message: '请输入区域名称',
                          },
                        ],
                      })(<Input placeholder="请输入区域名称" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="地图名称">
                      {getFieldDecorator('mapId', {
                        rules: [
                          {
                            message: '请选择地图名称',
                          },
                        ],
                      })(
                        <Select placeholder="请选择地图名称">
                          {maps.map(item => (
                            <Option value={item.id} key={item.name}>
                              {item.name}
                            </Option>
                          ))}
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="区域级别">
                      {getFieldDecorator('regionalLevelId', {
                        rules: [
                          {
                            message: '请选择区域级别',
                          },
                        ],
                      })(
                        <Select placeholder="请选择区域级别">
                          {levels.map(item => (
                            <Option value={item.id} key={item.name}>
                              {item.name}
                            </Option>
                          ))}
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between" className={styles.remark_area}>
                  <Col span={23} className={styles.text_areas}>
                    <Form.Item label="备注">
                      {getFieldDecorator('remark')(
                        <TextArea
                          className={publicStyles.text_area}
                          autoSize={{ minRows: 6, maxRows: 8 }}
                          style={{ width: '90%' }}
                        />,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="center" style={{ marginTop: '0.35rem' }}>
                  <Col span={6}>
                    <Form.Item>
                      <Button className={styles.form_btn} htmlType="submit">
                        确认
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col span={6} className={styles.select_padding_left}>
                    <Form.Item>
                      <Button className={styles.form_btn} onClick={this.onBack}>
                        返回
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
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

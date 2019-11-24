/**
 * title: 添加
 */
import React from 'react';
import { Form, Row, Col, Button, Input, Select, message, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Stage, Layer, Image as ImageLayer, Line as LineLayer } from 'react-konva';
import { connect } from 'dva';
import router from 'umi/router';

import ContentBorder from '../../../components/ContentBorder';
import { addPollingPoint } from '../services';
import { getAllMap } from '@/pages/login/login.service';
import { UmiComponentProps } from '@/common/type';

// import { InputText, TreeNodeMenu } from '../components';

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
// interface Props extends FormComponentProps {}
interface State {}
class AddPollingPoint extends React.Component<Props, State> {
  map: React.RefObject<HTMLDivElement>;
  constructor(props) {
    super(props);
    this.map = React.createRef<HTMLDivElement>();
    this.state = {
      mapImage: null,
      width: 0,
      height: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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
  dynamicLoadMapImage() {
    return new Promise(resolve => {
      const mapImage = new Image();
      mapImage.src = require('../../big-screen/assets/map.png');
      mapImage.onload = function() {
        resolve(mapImage);
      };
    });
  }
  async initRequest() {
    let maps = await getAllMap();

    this.props.dispatch({
      type: 'mapManager/update',
      payload: {
        allMaps: maps.result,
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        // console.error(err, values, 'err');
        message.error('填写信息有误 ', values);
        return;
      }
      const isSuccessed = await addPollingPoint(values);
      if (isSuccessed) {
        setTimeout(() => router.push('/map-manager/polling-point'), 1000);
      }
    });
  }

  back = () => {
    router.goBack();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { mapImage, width, height } = this.state;
    const { maps } = this.props;

    return (
      <ContentBorder className={styles.auth_root}>
        <Form
          layout="inline"
          labelAlign="right"
          style={{ marginTop: '0.57rem' }}
          onSubmit={this.handleSubmit}
        >
          <div className="auth__inner--container">
            <div className={styles.input_body}>
              <Row type="flex" justify="space-between">
                <Col span={24}>
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
                  <Form.Item label="巡检点名称">
                    {getFieldDecorator('name', {
                      rules: [
                        {
                          message: '请输入巡检点名称',
                        },
                      ],
                    })(<Input placeholder="请输入巡检点名称" />)}
                  </Form.Item>
                  <Form.Item label="巡检点位置">
                    {getFieldDecorator('address', {
                      rules: [
                        {
                          message: '请输入巡检点位置',
                        },
                      ],
                    })(<Input placeholder="请输入巡检点位置" />)}
                  </Form.Item>
                  <Form.Item label="横坐标" className={styles.small_style}>
                    {getFieldDecorator('xCoordinate', {
                      rules: [
                        {
                          message: '横坐标',
                        },
                      ],
                    })(
                      <Input
                        style={{ width: '1rem', backgroundSize: '1rem 0.4rem' }}
                        placeholder="横坐标"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item label="纵坐标" className={styles.small_style}>
                    {getFieldDecorator('yCoordinate', {
                      rules: [
                        {
                          message: '纵坐标',
                        },
                      ],
                    })(
                      <Input
                        style={{ width: '1rem', backgroundSize: '1rem 0.4rem' }}
                        placeholder="纵坐标"
                      />,
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Row type="flex" justify="space-between">
                <Col span={24}>
                  <Form.Item label="开始时间">
                    {getFieldDecorator('startTime', {
                      rules: [],
                    })(
                      <DatePicker
                        showTime={true}
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="请选择开始时间"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item label="结束时间">
                    {getFieldDecorator('endTime', {
                      rules: [],
                    })(
                      <DatePicker
                        showTime={true}
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="请选择结束时间"
                      />,
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Row type="flex" justify="space-between">
                <Col span={24}>
                  <Form.Item className={styles.area_style} label="备注">
                    {getFieldDecorator('remark', {
                      rules: [
                        {
                          message: '请输入备注',
                        },
                      ],
                    })(
                      <Input
                        placeholder="请输入备注"
                        style={{ width: '12.3rem', backgroundSize: '12.3rem 0.4rem' }}
                      />,
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
                    <Button className={styles.form_btn} onClick={this.back}>
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

const AddPollingPointHOC = Form.create<Props>({ name: 'fencing_setting_add' })(AddPollingPoint);

const mapState = ({ mapManager }) => {
  const { allMaps } = mapManager;
  return {
    maps: allMaps,
  };
};

export default connect(mapState)(AddPollingPointHOC);

// export default Form.create<Props>({ name: 'add_polling_point' })(AddPollingPoint);

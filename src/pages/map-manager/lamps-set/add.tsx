/**
 * title: 修改
 */
import React from 'react';
import { Form, Row, Col, Button, Input, Select } from 'antd';
import { connect } from 'dva';
import Konva from 'konva';
import { Stage, Layer, Image as ImageLayer, Line as LineLayer } from 'react-konva';
import router from 'umi/router';
import { FormComponentProps } from 'antd/lib/form';

import { UmiComponentProps } from '@/common/type';
import ContentBorder from '../../../components/ContentBorder';
import Map from '../components/Map';

import styles from './index.less';

const { TextArea } = Input;
const { Option } = Select;
interface State {
  mapImage: any;
  width: number;
  height: number;
  circleX: number;
  circleY: number;
}
interface FormProps extends FormComponentProps {}

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormProps;

// const UserAuth: React.FC<Props> = (props: Props) => {
class halmpAdd extends React.Component<Props, State> {
  map: React.RefObject<HTMLDivElement>;
  constructor(props) {
    super(props);
    this.map = React.createRef<HTMLDivElement>();
    this.state = {
      mapImage: null,
      width: 0,
      height: 0,
      circleX: -100,
      circleY: -100,
    };
  }
  goBack = () => {
    this.props.form.resetFields();
    router.push('/map-manager/lamps-set');
  };

  dynamicLoadMapImage() {
    return new Promise(resolve => {
      const mapImage = new Image();
      mapImage.src = require('../../big-screen/assets/map.png');
      mapImage.onload = function() {
        resolve(mapImage);
      };
    });
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
  }
  onMapClick = (e: any) => {
    const evt = e.evt;
    const { x, y } = evt;
    this.setState({
      circleX: x,
      circleY: y,
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { circleX, circleY } = this.state;
    return (
      <ContentBorder className={styles.auth_root}>
        <Form layout="inline" labelAlign="right" style={{ marginTop: '0.57rem' }}>
          <div className="auth__inner--container">
            <div className={styles.input_body}>
              <Row type="flex" justify="space-between">
                <Col span={24}>
                  <Form.Item label="编号">
                    {getFieldDecorator('lampCode', {
                      rules: [
                        {
                          message: '请输入编号',
                        },
                      ],
                    })(<Input placeholder="请输入编号" />)}
                  </Form.Item>
                  <Form.Item label="型号">
                    {getFieldDecorator('model', {
                      rules: [
                        {
                          message: '请输入型号',
                        },
                      ],
                    })(<Input placeholder="请输入型号" />)}
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
                        disabled={true}
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
                        disabled={true}
                      />,
                    )}
                  </Form.Item>
                  <Form.Item label="区域">
                    {getFieldDecorator('regionalName', {
                      rules: [
                        {
                          message: '请输入区域',
                        },
                      ],
                    })(<Input placeholder="请输入区域" />)}
                  </Form.Item>
                </Col>
              </Row>

              <Row type="flex" justify="space-between">
                <Col span={24}>
                  <Form.Item label="出入口" className={styles.area_style}>
                    {getFieldDecorator('entranceExit', {
                      rules: [
                        {
                          message: '出入口',
                        },
                      ],
                    })(
                      <Select placeholder="请选择出入口">
                        <Option value="0">出口</Option>
                        <Option value="1">入口</Option>
                      </Select>,
                    )}
                  </Form.Item>
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
                        style={{ width: '8.6rem', backgroundSize: '8.6rem 0.4rem' }}
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
                  {/* <div style={{ width: '100%', height: '100%' }} ref={this.map}>
                    <Stage width={width} height={height} draggable={false}>
                      <Layer>
                        <ImageLayer image={mapImage} x={0} y={0} width={width} height={height} />
                      </Layer>
                    </Stage>
                  </div> */}
                  <Map
                    circleOptions={{
                      show: true,
                      x: circleX,
                      y: circleY,
                      radius: 10,
                      fill: 'red',
                      draggable: true,
                    }}
                    onClick={this.onMapClick}
                  />
                </Col>
              </Row>
              <Row type="flex" justify="center" style={{ marginTop: '0.35rem' }}>
                <Col span={2}>
                  <Form.Item className={styles.button_type}>
                    <Button className={styles.form_btn}>确认</Button>
                  </Form.Item>
                </Col>
                <Col span={2} className={styles.select_padding_left}>
                  <Form.Item>
                    <Button className={styles.form_btn} onClick={this.goBack}>
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
const HalmpAdd = Form.create<Props>({ name: 'halmp_add' })(halmpAdd);

const mapState = ({ mapManager }) => {
  const resp = mapManager.lamps;
  return {
    lamps: resp,
  };
};

export default connect(mapState)(HalmpAdd);

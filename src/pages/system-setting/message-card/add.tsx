/**
 * title: 添加方式
 */
import React from 'react';
import { Form, Row, Col, Button, Input, Select, message, Upload, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import * as _ from 'lodash';
import router from 'umi/router';

import { WEBSOCKET, BASE_API_URL } from '../../../config/constants';
import ContentBorder from '../../../components/ContentBorder';
import { UmiComponentProps } from '@/common/type';
import { getAllPosition, getAllSecretLevels, getAllDepartment } from '@/pages/login/login.service';
import { addDepartment } from '../services';
import request from '@/utils/request';

import styles from './index.less';

const { Option } = Select;

interface FormProps extends FormComponentProps {}

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormProps;

interface State {
  name?: string;
  cardNo?: string;
  realTimeData?: any;
  loading?: any;
  imageUrl?: any;
}
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class AddDepa extends React.Component<Props, State> {
  ws: WebSocket;
  constructor(props) {
    super(props);
    this.state = {
      realTimeData: {},
      loading: false,
      imageUrl: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  goBack = () => {
    this.props.form.resetFields();
    router.push('/system-setting/message-card');
  };

  async componentDidMount() {
    const dutiesResp = await getAllPosition();
    const secretsLevelsResp = await getAllSecretLevels();
    const allPositions = await getAllDepartment();
    this.props.dispatch({
      type: 'commonState/update',
      payload: {
        allDuties: dutiesResp.result,
        allPosition: allPositions,
        allSecretLevel: secretsLevelsResp.result,
      },
    });
    request.get('http://139.129.229.99:8086/jeecg-boot/intf/location/executeUserCard?status=true');
    // this.connectWs();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    let msgText = nextProps.wsInfo;
    //身份证只接受`msgType`为1的数据
    if (msgText.msgType != '1') return;
    msgText = msgText.msgTxt;
    msgText = {
      name: msgText.name,
      sex: msgText.sex,
      address: msgText.address,
      cardNo: msgText.idnum,
    };
    this.setState({
      realTimeData: msgText,
    });
  }

  componentWillUnmount() {
    this.ws && this.ws.close();
    request.get('http://139.129.229.99:8086/jeecg-boot/intf/location/executeUserCard?status=false');
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        // console.error(err, values, 'err');
        message.error('填写信息有误 ', values);
        return;
      }
      let data = {
        ...values,
      };
      // console.log(this.state.imageUrl)

      const isSuccessed = await addDepartment(data);
      if (isSuccessed) {
        setTimeout(() => router.push('/system-setting/message-card'), 1000);
      }
    });
  }

  render() {
    const props = this.props;
    const { getFieldDecorator } = props.form;
    const { allPosition } = this.props;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传照片</div>
      </div>
    );
    const { imageUrl } = this.state;
    // if (_.isEmpty(props.allDuties) || _.isEmpty(props.allSecretLevel)) return null;
    return (
      <ContentBorder className={styles.auth_root}>
        <Form
          layout="inline"
          labelAlign="right"
          style={{ marginTop: '0.57rem' }}
          onSubmit={this.handleSubmit}
        >
          <Row type="flex" justify="center" align="middle" className={styles.add}>
            <Col span={20}>
              <div className="auth__inner--container">
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="部门名称">
                      {getFieldDecorator('name', {
                        rules: [
                          {
                            message: '请输入部门名称',
                          },
                        ],
                        initialValue: this.state.realTimeData.name,
                      })(<Input placeholder="请输入部门名称" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="部门编码">
                      {getFieldDecorator('deptCode', {
                        rules: [
                          {
                            message: '请输入部门编码',
                          },
                        ],
                        initialValue: this.state.realTimeData.cardNo,
                      })(<Input placeholder="请输入部门编码" />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="备注">
                      {getFieldDecorator('remark', {
                        rules: [
                          {
                            message: '请输入备注',
                          },
                        ],
                        initialValue: this.state.realTimeData.name,
                      })(<Input placeholder="请输入备注" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="排序">
                      {getFieldDecorator('sort', {
                        rules: [
                          {
                            message: '请输入排序',
                          },
                        ],
                        initialValue: this.state.realTimeData.cardNo,
                      })(<Input placeholder="请输入排序" />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="center" style={{ marginTop: '0.35rem' }}>
                  <Col span={6}>
                    <Form.Item className={styles.button_type}>
                      <Button className={styles.form_btn} htmlType="submit">
                        确认
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col span={6} className={styles.select_padding_left}>
                    <Form.Item>
                      <Button className={styles.form_btn} onClick={this.goBack}>
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

const AddDepartmentForm = Form.create<Props>({ name: 'add_depa' })(AddDepa);

const mapState = ({ userManager, commonState }) => {
  // const resp = userManager.innerUserList;
  const { allDuties, allSecretLevel, allPosition } = commonState;
  return {
    // innerUserList: resp,
    allDuties: allDuties,
    allSecretLevel: allSecretLevel,
    allPosition: allPosition,
    wsInfo: commonState.wsInfo,
  };
};

export default connect(mapState)(AddDepartmentForm);

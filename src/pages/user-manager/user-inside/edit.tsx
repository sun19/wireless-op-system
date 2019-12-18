/**
 * title: 添加方式
 */
import React from 'react';
import { Form, Row, Col, Button, Input, Select, message, Upload, Icon} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import * as _ from 'lodash';
import router from 'umi/router';

import ContentBorder from '../../../components/ContentBorder';
import { UmiComponentProps } from '@/common/type';
import { getAllPosition, getAllSecretLevels, getAllDepartment } from '@/pages/login/login.service';
import { updateUser } from '../services';

import styles from './index.less';

const { Option } = Select;

interface FormProps extends FormComponentProps {}

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormProps;

interface State {
  name?: string;
  cardNo?: string;
  fileList?:any;
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

class EditAuth extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
    
       loading: false,
      imageUrl:'',
    }
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
    router.push('/user-manager/user-inside');
  };
  setupDuties = () => {
    const { allDuties, userInside } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form.Item label="职务">
        {getFieldDecorator('positionId', {
          rules: [
            {
              message: '请选择职务',
            },
          ],
          initialValue: userInside.positionId ? userInside.positionId : '',
        })(
          <Select placeholder="请选择职务">
            {allDuties &&
              allDuties.map((duty, index) => (
                <Option value={duty.id} key={index}>
                  {duty.name}
                </Option>
              ))}
          </Select>,
        )}
      </Form.Item>
    );
  };

  setupAllSecretLevel = () => {
    const { allSecretLevel, userInside } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form.Item label="保密等级">
        {getFieldDecorator('securityLevelId', {
          rules: [
            {
              message: '请选择保密等级',
            },
          ],
          initialValue: userInside.securityLevelId ? userInside.securityLevelId : '',
        })(
          <Select placeholder="请选择保密等级">
            {allSecretLevel &&
              allSecretLevel.map((level, index) => (
                <Option value={level.id} key={index}>
                  {level.name}
                </Option>
              ))}
          </Select>,
        )}
      </Form.Item>
    );
  };

  async componentDidMount() {
    const { userInside, allPosition } = this.props;
    this.setState({ imageUrl: userInside.imageUrl}) 
    const dutiesResp = await getAllPosition();
    const secretsLevelsResp = await getAllSecretLevels();
    const allPositions = await getAllDepartment();

    this.props.dispatch({
      type: 'commonState/update',
      payload: {
        allDuties: dutiesResp.result,
        allSecretLevel: secretsLevelsResp.result,
        allPosition: allPositions,
      },
    });

  }

  handleSubmit(e) {
    e.preventDefault();
    const { userInside } = this.props;
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        message.error('填写信息有误 ', values);
        return;
      }
      values.deptUserCode !== 'undefined'? delete values.depaCode: ''
      const data = {
        isIn: '0',
        id: userInside.id,
        imageUrl: this.state.imageUrl,
        ...values,
      };
      const isSuccessed = await updateUser(data);
      if (isSuccessed) {
        setTimeout(() => router.push('/user-manager/user-inside'), 1000);
      }
    });
  }

  render() {
    const props = this.props;
    const { getFieldDecorator } = props.form;
    const { userInside, allPosition } = this.props;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传照片</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <ContentBorder className={styles.auth_root}>
        <Form
          layout="inline"
          labelAlign="right"
          style={{ marginTop: '0.57rem' }}
          onSubmit={this.handleSubmit}
        >
          <Row type="flex" justify="center" align="middle" className={styles.add}>
            <Col span={12}>
              <div className="auth__inner--container">
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="姓名">
                      {getFieldDecorator('name', {
                        rules: [
                          {
                            message: '请输入姓名',
                          },
                        ],
                        initialValue: userInside.name,
                      })(<Input placeholder="请输入姓名" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="身份证号">
                      {getFieldDecorator('cardNo', {
                        rules: [
                          {
                            message: '请输入身份证号',
                          },
                        ],
                        initialValue: userInside.cardNo,
                      })(<Input placeholder="请输入身份证号" />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="性别">
                      {getFieldDecorator('sex', {
                        rules: [
                          {
                            message: '请选择性别',
                          },
                        ],
                        initialValue: userInside.sex,
                      })(
                        <Select placeholder="请选择性别">
                          <Option value="0">男</Option>
                          <Option value="1">女</Option>
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="家庭住址">
                      {getFieldDecorator('address', {
                        rules: [
                          {
                            message: '请输入家庭住址',
                          },
                        ],
                        initialValue: userInside.address,
                      })(<Input placeholder="请输入家庭住址" />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="联系方式">
                      {getFieldDecorator('phone', {
                        rules: [
                          {
                            message: '请选输入联系方式',
                          },
                        ],
                        initialValue: userInside.phone,
                      })(<Input placeholder="请输入联系方式" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="部门">
                      {getFieldDecorator('departmentId', {
                        rules: [
                          {
                            required: true,
                            message: '请选择部门',
                          },
                        ],
                        initialValue: userInside.departmentId ? userInside.departmentId : '',
                      })(
                        <Select placeholder="请选择部门">
                          {allPosition &&
                            allPosition.map(option => (
                              <Option value={option.id} key={option.key}>
                                {option.name}
                              </Option>
                            ))}
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between" align="middle">
                  <Col span={12}>
                    <Form.Item label="部门编号">
                      {getFieldDecorator('depaCode', {
                        rules: [
                          {
                            message: '请输入部门编号',
                          },
                        ],
                        initialValue: userInside.deptUserCode,
                      })(<Input placeholder="请输入部门编号" readOnly={true}/>)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="人员编号">
                      {getFieldDecorator('userCode', {
                        rules: [
                          {
                            message: '请输入人员编号',
                          },
                        ],
                        initialValue: userInside.userCode,
                      })(<Input placeholder="请输入人员编号" />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span={12}>{this.setupDuties()}</Col>
                  <Col span={12}>
                    <Form.Item label="在职状态">
                      {getFieldDecorator('type', {
                        rules: [
                          {
                            message: '请选择在职状态',
                          },
                        ],
                        initialValue: userInside.type,
                      })(
                        <Select placeholder="请选择在职状态">
                          <Option value="0">在职</Option>
                          <Option value="1">离职</Option>
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span={12}>{this.setupAllSecretLevel()}</Col>
                  <Col span={12}>
                    <Form.Item label="上传照片">
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                      >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                      </Upload>
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

const AddUserForm = Form.create<Props>({ name: 'auth_user' })(EditAuth);

const mapState = ({ userManager, commonState }) => {
  const resp = userManager.innerUserList;
  const { allDuties, allSecretLevel, allPosition } = commonState;
  return {
    innerUserList: resp,
    allDuties: allDuties,
    allSecretLevel: allSecretLevel,
    userInside: userManager.userInside,
    allPosition: allPosition,
  };
};

export default connect(mapState)(AddUserForm);

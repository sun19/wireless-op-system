import React from 'react';
import { Form, Row, Col, Button, Input, message, Select, Tree } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import router from 'umi/router';

import ContentBorder from '../../../components/ContentBorder';
import { InputText, TreeNodeMenu } from '../components';
import { ChromePicker } from 'react-color';
import { updateUserType, updateSuperAdmin } from '../services';

import styles from './index.less';
import { LEFT_MENUS } from '../../../config/menus';

const { TreeNode } = Tree;
const { Option } = Select;
const { TextArea } = Input;

const defaultMenuNodes = LEFT_MENUS;

// interface Props extends FormComponentProps {}
type Props = FormComponentProps & ReturnType<typeof mapState>;

interface UserType {
  key?: string;
  value?: string;
  roleId: string;
}
interface colorInfo {
  color?: string;
  id?: string;
  key?: string;
  name?: string;
}
interface State {
  userTypes: UserType[];
  expandedKeys: any;
  colorInfo: colorInfo;
  displayColorPicker: boolean;
  selectedKeys: any;
  checkedKeys: any;
  // autoExpandParent:boolean;
}

class EditSuperAdmin extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.state = {
      userTypes: [],
      expandedKeys: [],
      displayColorPicker: false,
      colorInfo: {},
      selectedKeys: [],
      checkedKeys: [],
    };
  }
  goBack = () => {
    this.props.form.resetFields();
    router.push('/system-setting/info-card-background');
  };

  onSubmit(e) {
    e.preventDefault();
    const { superAdminRecord } = this.props;

    this.props.form.validateFields(async (err, values) => {
      if (err) {
        message.error('填写信息有误', values);
        return;
      }

      var dic = {};
      dic['dictName'] = this.state.colorInfo.color;
      dic['id'] = superAdminRecord.id;
      const isSuccessed = await updateSuperAdmin(dic);
      if (isSuccessed) {
        setTimeout(() => router.push('/system-setting/info-card-background'), 1000);
      }
    });
  }

  onCancel() {
    router.push('/system-setting/info-card-background');
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };
  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };
  handleChangeComplete = e => {
    const colorInfo = Object.assign({}, this.state.colorInfo);
    colorInfo.color = e.hex;
    this.setState({
      colorInfo,
    });
  };
  componentDidMount() {
    const { superAdminRecord } = this.props;
    this.state.colorInfo.color = superAdminRecord.dictName ? superAdminRecord.dictName : '#5eb4fe';
  }

  render() {
    const { superAdminRecord } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <ContentBorder className={styles.auth_root}>
        <Form layout="inline" style={{ marginTop: '0.57rem' }} onSubmit={this.onSubmit}>
          <Row type="flex" justify="center" align="middle" className={styles.add}>
            <Col span={20}>
              <div className="auth__inner--container">
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    {/* <Form.Item label="信息牌背景">
                      {getFieldDecorator('dictName', {
                        rules: [],
                        initialValue: superAdminRecord.dictName,
                      })(<Input placeholder="请输入信息牌背景色" />)}
                    </Form.Item>
 */}

                    <Form.Item label="信息牌背景">
                      <div className={styles.color_pick}>
                        <div>
                          <div
                            onClick={this.handleClick}
                            className={styles.color_span}
                            style={{
                              background: this.state.colorInfo.color,
                            }}
                          />
                          {/* Pick Color</div> */}
                          {this.state.displayColorPicker ? (
                            <div>
                              <div
                                style={{
                                  position: 'fixed',
                                  top: '0px',
                                  right: '0px',
                                  bottom: '0px',
                                  left: '0px',
                                }}
                                onClick={this.handleClose}
                              />
                              <ChromePicker
                                style={{ width: '400px' }}
                                color={this.state.colorInfo.color}
                                onChangeComplete={this.handleChangeComplete}
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>
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

const EditSuperAdminHOC = Form.create<Props>({ name: 'edit_superadmin' })(EditSuperAdmin);

const mapState = ({ systemSetting }) => {
  const resp = systemSetting.superAdminRecord;
  return { superAdminRecord: resp };
};

export default connect(mapState)(EditSuperAdminHOC);

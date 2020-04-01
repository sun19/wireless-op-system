import React from 'react';
import { Form, Row, Col, Button, Input, message, Select, Tree } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import router from 'umi/router';
import request, { format } from '@/utils/request';
import { BASE_API_URL } from '@/config/constants';

import ContentBorder from '../../../components/ContentBorder';
import { InputText, TreeNodeMenu } from '../components';
import { ChromePicker } from 'react-color';
import { updateUserType, getCompanyNameList, updateSuperAdmin, updateSubmodel } from '../services';

import styles from './index.less';
import { LEFT_MENUS } from '../../../config/menus';
import type from '@/pages/warning-manager/type';

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
    const { superAdminRecord } = this.props;
    this.state.colorInfo.color = superAdminRecord.dictName ? superAdminRecord.dictName : '#148dd8';
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
      var reg = /^[0-9]*$/ 
      if(!reg.test(values.height) || !reg.test(values.width) || !reg.test(values.font)){
        message.error('只能填写数字哦~', values);
        return
      }
      var dic ={}
      dic['height'] = parseInt(values.height);
      dic['width'] = parseInt(values.width);
      dic['font'] = parseInt(values.font);
      dic['id'] = superAdminRecord.id;
      const isSuccessed = request.post( BASE_API_URL + '/jeecg-boot/intf/location/updateSubModel',
        {data: dic, headers: {"Content-Type":"application/json"}}
      )
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
  componentDidMount() {}

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
                  <Col span={20}>
                    <Form.Item label="宽">
                    {getFieldDecorator('width', {
                        rules: [],
                        initialValue: superAdminRecord.width,
                      })(<Input placeholder="请输入宽" />)}
                    </Form.Item>
                  </Col>
                  <Col span={20}>
                    <Form.Item label="高">
                    {getFieldDecorator('height', {
                        rules: [],
                        initialValue: superAdminRecord.height,
                      })(<Input placeholder="请输入高" />)}
                    </Form.Item>
                  </Col>
                  <Col span={20}>
                    <Form.Item label="字号">
                    {getFieldDecorator('font', {
                        rules: [],
                        initialValue: superAdminRecord.font,
                      })(<Input placeholder="请输入字号" />)}
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

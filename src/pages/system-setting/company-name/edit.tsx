import React from 'react';
import { Form, Row, Col, Button, Input, message, Select, Tree } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import router from 'umi/router';

import ContentBorder from '../../../components/ContentBorder';
import { setCompanyName } from '../services';

import styles from './index.less';
import { LEFT_MENUS } from '../../../config/menus';

const { TreeNode } = Tree;
const { Option } = Select;
type Props = FormComponentProps & ReturnType<typeof mapState>;

interface UserType {
  key?: string;
  value?: string;
  roleId: string;
}

interface State {
  userTypes: UserType[];
  expandedKeys: any;
  selectedKeys: any;
  checkedKeys: any;
}

class EditSuperAdmin extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.state = {
      userTypes: [],
      expandedKeys: [],
      selectedKeys: [],
      checkedKeys: [],
    };
  }
  async componentDidMount() {
  }
  goBack = () => {
    this.props.form.resetFields();
    router.push('/system-setting/company-name');
  };
  onSelect = (selectedKeys, info) => {
    this.setState({ selectedKeys });
  };
  onCheck = checkedKeys => {
    this.setState({ checkedKeys });
  };

  onSubmit(e) {

    e.preventDefault();
    const { companyNameRecord } = this.props;
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        message.error('填写信息有误', values);
        return;
      }
      const isSuccessed = await setCompanyName(values);
      if (isSuccessed.success) {
        setTimeout(() => router.push('/system-setting/company-name'), 1000);
      }
    });
  }

  onCancel() {
    router.push('/system-setting/company-name');
  }
  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.path} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.name} key={item.path} />;
    });
  render() {
    const { companyNameRecord } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <ContentBorder className={styles.auth_root}>
        <Form layout="inline" style={{ marginTop: '0.57rem' }} onSubmit={this.onSubmit}>
          <Row type="flex" justify="center" align="middle" className={styles.add}>
            <Col span={12}>
              <div className="auth__inner--container">
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="企业名称">
                      {getFieldDecorator('name', {
                        rules: [],
                        initialValue: companyNameRecord.name,
                      })(<Input placeholder="请输入企业名称" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="文字大小">
                      {getFieldDecorator('fontSize', {
                        rules: [],
                        initialValue: companyNameRecord.fontSize,
                      })(<Input placeholder="请输入文字大小" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="是否显示">
                      {getFieldDecorator('isShow', {
                        rules: [],
                        initialValue: companyNameRecord.isShow,
                      })( 
                        <Select   getPopupContainer={triggerNode => triggerNode.parentElement} style={{ width: '210px' }} className={styles.select_text}>
                          <Option value='0' key='0'>
                            显示
                          </Option>
                          <Option value='1' key='1'>
                            不显示
                          </Option>
                        </Select>,
                      )}
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
  const resp = systemSetting.companyNameRecord;
  return { companyNameRecord: resp };
};

export default connect(mapState)(EditSuperAdminHOC);

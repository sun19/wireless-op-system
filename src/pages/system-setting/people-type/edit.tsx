/**
 * title: 编辑
 */
import React from 'react';
import { Form, Row, Col, Button, Input, message, Select, Tree } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import router from 'umi/router';

import ContentBorder from '../../../components/ContentBorder';
import { InputText, TreeNodeMenu } from '../components';
import { updateUserType, getAllRoles } from '../services';

import styles from './index.less';

const { TreeNode } = Tree;
const { Option } = Select;
import { LEFT_MENUS } from '../../../config/menus';
const defaultMenuNodes = LEFT_MENUS;

// interface Props extends FormComponentProps {}
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
  // autoExpandParent:boolean;
}

class EditUserAuth extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.state = {
      userTypes: [],
      expandedKeys: [],
      selectedKeys: [],
      // autoExpandParent: true,
      checkedKeys: [],
    };
  }
  async componentDidMount() {
    let userTypes = await getAllRoles();
    userTypes = userTypes.map(item => ({
      key: item.id,
      value: item.roleName,
      selectValue: item.roleCode,
    }));
    this.setState({ userTypes });
    const { peopleTypeRecord } = this.props;
    // console.log(peopleTypeRecord)
    this.setState({
      expandedKeys: peopleTypeRecord.roleId ? peopleTypeRecord.roleId : [],
      selectedKeys: peopleTypeRecord.roleId ? peopleTypeRecord.roleId : [],
      // autoExpandParent: true,
      checkedKeys: peopleTypeRecord.roleId ? peopleTypeRecord.roleId : [],
    });
  }
  goBack = () => {
    this.props.form.resetFields();
    router.push('/system-setting/people-type');
  };
  onSelect = (selectedKeys, info) => {
    // console.log('onSelect', info);
    this.setState({ selectedKeys });
  };
  onCheck = checkedKeys => {
    // console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };

  onSubmit(e) {
    e.preventDefault();
    const { peopleTypeRecord } = this.props;
    this.props.form.validateFields(async (err, values) => {
      const { rolePath, ...props } = values;
      let data = {
        ...props,
        rolePath: this.state.checkedKeys,
      };
      if (err) {
        message.error('填写信息有误', data);
        return;
      }
      const isSuccessed = await updateUserType(Object.assign(peopleTypeRecord, data));
      if (isSuccessed) {
        setTimeout(() => router.push('/system-setting/people-type'), 1000);
      }
    });
  }

  onCancel() {
    router.push('/system-setting/people-type');
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
    const { peopleTypeRecord } = this.props;
    // console.log(peopleTypeRecord)
    const { getFieldDecorator } = this.props.form;
    if (this.state.userTypes.length === 0) return null;

    return (
      <ContentBorder className={styles.auth_root}>
        <Form layout="inline" style={{ marginTop: '0.57rem' }} onSubmit={this.onSubmit}>
          <Row type="flex" justify="center" align="middle" className={styles.add}>
            <Col span={12}>
              <div className="auth__inner--container">
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="角色名称">
                      {getFieldDecorator('roleName', {
                        rules: [],
                        initialValue: peopleTypeRecord.roleName,
                      })(<Input placeholder="请输入角色名称" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="英文名称">
                      {getFieldDecorator('roleCode', {
                        rules: [
                          {
                            // required: true,
                            message: '请输入英文名称',
                          },
                        ],
                        initialValue: peopleTypeRecord.roleCode,
                      })(<Input placeholder="请输入英文名称" />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span={23}>
                    <Form.Item label="人员权限">
                      {getFieldDecorator('rolePath')(
                        <Tree
                          checkable={true}
                          defaultExpandedKeys={this.state.expandedKeys}
                          defaultSelectedKeys={this.state.expandedKeys}
                          defaultCheckedKeys={this.state.expandedKeys}
                          onSelect={this.onSelect}
                          onCheck={this.onCheck}
                        >
                          {this.renderTreeNodes(defaultMenuNodes)}
                        </Tree>,
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

const EditUserHOC = Form.create<Props>({ name: 'edit_user' })(EditUserAuth);

const mapState = ({ systemSetting }) => {
  const resp = systemSetting.peopleTypeRecord;
  return { peopleTypeRecord: resp };
};

export default connect(mapState)(EditUserHOC);


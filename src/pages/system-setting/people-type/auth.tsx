/**
 * title: 授权
 */
import React from 'react';
import { Form, Row, Col, Button, Input, message, Select, Tree } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import router from 'umi/router';
import _ from 'lodash'
import { connect } from 'dva';


import ContentBorder from '../../../components/ContentBorder';
import { InputText, TreeNodeMenu } from '../components';
import { addUserType, getAllRoles } from '../services';

import styles from './index.less';

const { Option } = Select;
const { TreeNode } = Tree;
import {
  getAllMenues
} from '../../login/login.service';
// import { LEFT_MENUS } from '../../../config/menus';
// const defaultMenuNodes = LEFT_MENUS;

interface Props extends FormComponentProps { }
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
  dataTree: any;

  // autoExpandParent:boolean;
}

class AddUserAuth extends React.Component<Props, State> {
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
      dataTree: []
    };
  }
  async componentDidMount() {
    const data = await getAllMenues()
    this.setState({ dataTree: data.result })
    let userTypes = await getAllRoles();
    userTypes = userTypes.map(item => ({
      key: item.id,
      value: item.roleName,
      selectValue: item.roleCode,
    }));
    this.setState({ userTypes });
  }
  goBack = () => {
    this.props.form.resetFields();
    router.push('/system-setting/people-type');
  };
  onSelect = (selectedKeys, info) => {
    this.setState({ selectedKeys });
  };
  onCheck = (checkedKeys, info) => {
    let data=
    _.concat(checkedKeys, info.halfCheckedKeys)
    this.setState({ checkedKeys: data });
  };

  onSubmit(e) {
    e.preventDefault();
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
      const isSuccessed = await addUserType(data);
      if (isSuccessed) {
        setTimeout(() => router.push('/system-setting/people-type'), 1000);
      }
    });
  }
  onCancel() {
    router.push('/system-setting/people-type');
  }
  renderTreeNodes = (data) => {
   return data.map((item, index) => {
      if (item.child && item.child.length > 0) {
        let menuesType = item.child 
        return (
          <TreeNode title={item.name} key={item.id} >
            {this.renderTreeNodes(menuesType)}
          </TreeNode>
        );
      } else {
        return <TreeNode title={item.name} key={item.id} />;
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { menus } = this.props
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
                      })(
                        <Input placeholder="请输入角色名称" />,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="英文名称">
                      {getFieldDecorator('roleCode', {
                        rules: [],
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
                          // checkedKeys={this.state.expandedKeys}
                          onSelect={this.onSelect}
                          onCheck={this.onCheck}
                        >
                          {this.renderTreeNodes(menus)}
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
const AddUserForm = Form.create<Props>({ name: 'auth_user' })(AddUserAuth);

const mapState = ({ menu, router, }) => ({
  ...menu,
  router,
});
export default connect(mapState)(AddUserForm);
// export default Form.create<Props>
// ({ name: 'auth_user' })(AddUserAuth);

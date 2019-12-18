/**
 * title: 编辑
 */
import React from 'react';
import { Form, Row, Col, Button, Input, message, Select, Tree } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import router from 'umi/router';
import * as _ from 'lodash';
import ContentBorder from '../../../components/ContentBorder';
import { InputText, TreeNodeMenu } from '../components';
import { updateUserType, getAllRoles } from '../services';
import { getPeopleMenues, getLeftMenues,editMenues } from '../../login/login.service';

import styles from './index.less';

const { TreeNode } = Tree;
const { Option } = Select;
// import { LEFT_MENUS } from '../../../config/menus';
// const defaultMenuNodes = LEFT_MENUS;

// interface Props extends FormComponentProps {}
type Props = FormComponentProps & ReturnType<typeof mapState>;

interface UserType {
  key?: string;
  value?: string;
  roleId: string;
}

interface State {
  expandedKeys: any;
  selectedKeys: any;
  checkedKeys: any;
  dataTree: any;
  halfCheckedKeys: any;
  // autoExpandParent:boolean;
}

class EditUserAuth extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.state = {
      expandedKeys: [],
      selectedKeys: [],
      checkedKeys: [],
      dataTree: [],
      halfCheckedKeys: [],
    };
  }
  async componentDidMount() {


    // 获取当前用户菜单
    let user = {
      // roleId: localStorage.getItem('userMessage'),
      roleId:this.props.peopleTypeRecord.id
    };
    const data = await getLeftMenues(user);
    this.setState({ dataTree: data.result });

    // 获取权限菜单id
    const { peopleTypeRecord } = this.props;
    const userData = {
      roleId: peopleTypeRecord.id,
      // localStorage.getItem('userMessage'),
    };
    let userMenues = await getPeopleMenues(userData);
    const userMenueList = userMenues.result;
    const ids = userMenueList.map(item => item.id);
    // const ids = [];
    // getId(userMenueList);
    // function getId(list) {
    //   for (let i = 0; i < list.length; i++) {
    //     const item = list[i];
    //     if (item.child && item.child.length > 0) {
    //       getId(item.child);
    //     } else {
    //       ids.push(item.id);
    //     }
    //   }
    // }
    this.setState({
      expandedKeys: ids,
      selectedKeys: ids,
      checkedKeys: ids,
    });
  }
  goBack = () => {
    this.props.form.resetFields();
    router.push('/system-setting/people-type');
  };
  // onSelect = (selectedKeys, info) => {
  //   this.setState({ selectedKeys });
  // };
  onCheck = (checkedKeys, info) => {
    this.setState({ checkedKeys: checkedKeys, halfCheckedKeys: info.halfCheckedKeys });
  };

  onSubmit(e) {
    e.preventDefault();
    const { peopleTypeRecord } = this.props;
    this.props.form.validateFields(async (err, values) => {
      const { resourceIds, id, ...props } = values;
      let data = {
        ...props,
        roleId: peopleTypeRecord.id,
        // localStorage.getItem('userMessage'),
        //带上父级ID的
        // resourceIds: this.state.checkedKeys.concat(this.state.halfCheckedKeys).join(','),
        resourceIds: this.state.checkedKeys.join(','),
      };
      if (err) {
        message.error('填写信息有误', data);
        return;
      }
      const isSuccessed = await editMenues(data);
      // await updateUserType(Object.assign({}, peopleTypeRecord, data));
      if (isSuccessed.success) {
        // message.success('编辑成功!');
        setTimeout(() => router.push('/system-setting/people-type'), 1000);
      }
    });
  }

  onCancel() {
    router.push('/system-setting/people-type');
  }
  renderTreeNodes = data =>
    data&&data.map(item => {
      if (item.child) {
        return (
          <TreeNode title={item.name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.child)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.name} key={item.id} />;
    });
  render() {
    const { peopleTypeRecord } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <ContentBorder className={styles.auth_root}>
        <Form layout="inline" style={{ marginTop: '0.57rem' }} onSubmit={this.onSubmit}>
          <Row type="flex" justify="center" align="middle" className={styles.add}>
            <Col span={12}>
              <div className="auth__inner--container  auth_people">
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
                        rules: [],
                        initialValue: peopleTypeRecord.roleCode,
                      })(<Input placeholder="请输入英文名称" />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between" className={styles.treeStyle}>
                  <Col span={23}>
                    <Form.Item label="人员权限">
                      {getFieldDecorator(
                        'resourceIds',
                        {},
                      )(
                        <Tree
                          checkable={true}
                          // defaultExpandedKeys={this.state.expandedKeys}
                          // defaultSelectedKeys={this.state.selectedKeys}
                          // defaultCheckedKeys={this.state.checkedKeys}
                          // expandedKeys={this.state.expandedKeys}
                          // selectedKeys={this.state.expandedKeys}
                          checkedKeys={this.state.checkedKeys}
                          // onSelect={this.onSelect}

                          onCheck={this.onCheck}
                        >
                          {this.renderTreeNodes(this.state.dataTree)}
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

const mapState = ({ systemSetting, menu }) => {
  const resp = systemSetting.peopleTypeRecord;
  return { peopleTypeRecord: resp, menu: menu.menus || [] };
};

export default connect(mapState)(EditUserHOC);

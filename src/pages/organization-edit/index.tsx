import React from 'react';
import { Form, Input, InputNumber, Modal, Icon } from 'antd';
import OrgChart from 'react-orgchart';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/lib/form';
import { UmiComponentProps } from '@/common/type';
import { getDepartmentName, getDepartment, delDepartment, editDepartment, getFirstName, getsecondName } from '@/pages/login/login.service';
import { ICON_FONTS_URL } from '../../config/constants';
import { GET_DEPARTMENT } from '@/config/api';


// @/pages/system-setting/system-theme/index.tsx

import { getDictNameByType, updateDictNameByType } from '../system-setting/services';

const { confirm } = Modal;
const IconFont = Icon.createFromIconfontCN({ scriptUrl: ICON_FONTS_URL });

import 'react-orgchart/index.css';
import styles from './index.less';
interface State {
  allMenus?: any;
  visible?: boolean;
  editName?: boolean;
  fatherValue?: string;
  nameValue?: string;
  addDialog?: boolean;
  headVisible?: boolean;
  node?: any;
}
interface FormProps extends FormComponentProps { }
type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormProps;

class Organization extends React.Component<Props,
  State> {
  constructor(props) {
    super(props);
    this.state = {
      allMenus: '',
      visible: false,
      headVisible: false,
      addDialog: false,
      editName: false,
      fatherValue: '',
      nameValue: '',
      node: {}
    };
    // this.getData();
  }
  headOk = e => {


   

    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        let {
          name,
          children,
          ...props
        } = this.state.node;
 
       

        let data = {
          ...props,
          name: values.name
        };

        let param = {}
        if (data.deptCode == "cs0") {
          param={
            "name":data.name,
            "type":"organization_name"
          }
        }
        if (data.deptCode == "cs1") {
          param={
            "name":data.name,
            "type":"title_first"
          }
        }
        if (data.deptCode == "cs2") {
          param={
            "name":data.name,
            "type":"title_second"
          }
        }

        let resp = await updateDictNameByType(param);

        if (resp.success) {
          this.setState({ headVisible: false });
          this.getDataName();
        }
      }
    });
  }
  headCancel = e => {
    this.setState({ headVisible: false });
  };
  showHeadDialog = name => {
    this
      .props
      .form
      .setFieldsValue({ name: name.name});
    this.setState({ headVisible: true, node: name });
  };
  handleOk = e => {


    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        let {
          name,
          children,
          ...props
        } = this.state.node;
        let data = {
          ...props,
          name: values.name
        };
        let resp = await editDepartment(data);
        if (resp.success) {
          this.setState({ visible: false });
          this.getDataName();
        }
      }
    });
  };
  addOk = e => {
    e.preventDefault();
    this
      .props
      .form
      .validateFieldsAndScroll(async (err, values) => {
        // console.log(err)
        if (!err) {
          let {
            name,
            children,
            id,
            parentId,
            ...propsData
          } = this.state.node;
          let data = {
            ...propsData,
            parentId: id,
            name: values.nameOptions
          };
          // console.log(data)

          let resp = await editDepartment(data);
          // console.log(resp)
          if (resp.success) {
            this.setState({ addDialog: false });
            this.getDataName();
          }
        }
      });
  };
  handleCancel = e => {
    this.setState({ visible: false });
  };
  addCancel = e => {
    this.setState({ addDialog: false });
  };
  MyNodeComponent = ({ node }) => {
    if (node.parentId === '00000') {
      return (
        <div
          className={node.name === ''
            ? styles.initechNodeType
            : styles.initechNode}>
          <span>{node.name}</span>
        </div>
      );
    } else if (node.parentId === '000001') {
      return (
        <div className={styles.initechNode}>
          <span>{node.name}</span>
          <div>
            <span
              className={styles.edit_icon}
              onClick={this
                .showHeadDialog
                .bind(this, node)}>
              <IconFont type="icon-edit1" />
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.initechNode}>
          <span>{node.name}</span>
          <div>
            <span
              className={styles.edit_icon}
              onClick={this
                .delectSpan
                .bind(this, node)}>
              <IconFont type="icon-error1" />
            </span>
            <span
              className={styles.edit_icon}
              onClick={this
                .addDialog
                .bind(this, node)}>
              <IconFont type="icon-plus" />
            </span>
            <span
              className={styles.edit_icon}
              onClick={this
                .showDialog
                .bind(this, node)}>
              <IconFont type="icon-edit1" />
            </span>
          </div>
        </div>
      );
    }
  };
  addDialog = name => {
    this
      .props
      .form
      .setFieldsValue({ nameOptions: '' });
    this.setState({ addDialog: true, node: name });
  };
  delectSpan = name => {
    let self = this;
    confirm({
      title: '确定要删除这条信息吗？',
      content: '',
      okText: '取消',
      okType: 'danger',
      cancelText: '确定',
      onOk() { },
      async onCancel() {
        await delDepartment({ id: name.id });
        //  //重新请求数据重绘
        self.getDataName();
      }
    });
  };
  showDialog = name => {
    this
      .props
      .form
      .setFieldsValue({ name: name.name, sort: name.sort });
    this.setState({ visible: true, node: name });
  };
  async componentDidMount() {
    this.getDataName();
  }
  async getDataName() {
    let data = {
      type: 'organization_name'
    };
    let name = await getDepartmentName(data);
    this.getData(name);
  }
  async getData(name) {
    let menus = await getDepartment();
    menus = menus.result || [];
    let menusStr = JSON.stringify(menus);
    menusStr = menusStr.replace(/child/g, 'children');
    const resp = JSON.parse(menusStr);
    let firstName = await getFirstName()

    let secondName = await getsecondName()
    let data = {
      name: name,
      id: '00000',
      deptCode: 'cs0',
      parentId: '000001',
      sort: 1,
      children: [
        {
          name: firstName,
          id: '111111',
          deptCode: 'cs1',
          parentId: '000001',
          sort: 1
        }, {
          name: '',
          id: '0',
          deptCode: 'cs',
          parentId: '00000',
          sort: 1,
          children: []
        }, {
          name: secondName,
          id: '111112',
          deptCode: 'cs2',
          parentId: '000001',
          sort: 1
        }
      ]
    };
    resp.map(res => {
      data
        .children[1]
        .children
        .push(res);
    });
    this.setState({ allMenus: data });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 10
      },
      wrapperCol: {
        span: 18
      }
    };
    return (
      <div id={styles.initechOrgChart}>
        <OrgChart tree={this.state.allMenus} NodeComponent={this.MyNodeComponent} />
        <Modal
          title="编辑菜单"
          visible={this.state.headVisible}
          onOk={this.headOk}
          onCancel={this.headCancel}
          width={700}>
          <Form.Item {...formItemLayout} label="组织名称">
            {getFieldDecorator('name', { rules: [] })(<Input />)}
          </Form.Item>
        </Modal>
        <Modal
          title="编辑菜单"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={700}>
          <Form.Item {...formItemLayout} label="组织名称">
            {getFieldDecorator('name', { rules: [] })(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="排序">
            {getFieldDecorator('sort', { rules: [] })(<InputNumber size="large" min={0} />)}
          </Form.Item>
        </Modal>
        <Modal
          title="添加菜单"
          visible={this.state.addDialog}
          onOk={this.addOk}
          onCancel={this.addCancel}
          width={700}>
          <Form.Item {...formItemLayout} label="组织名称">
            {getFieldDecorator('nameOptions', { rules: [] })(<Input />)}
          </Form.Item>
        </Modal>
      </div>
    );
  }
}

const AddUserForm = Form.create<Props>({ name: 'add_user' })(Organization);
const mapState = ({ menu, router }) => ({
  ...menu,
  router
});

export default connect(mapState)(AddUserForm);

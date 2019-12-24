import React from 'react';
import { Table, Form, Input, message, Modal, Badge, Menu, Dropdown, Icon } from 'antd';
import OrgChart from 'react-orgchart';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/lib/form';
import { UmiComponentProps } from '@/common/type';
import { getLeftMenues } from '@/pages/login/login.service';

import 'react-orgchart/index.css';
import styles from './index.less';
const initechOrg = {
  name: 'Bill Lumbergh',
  actor: 'Gary Cole',
  children: [
    {
      name: 'Peter Gibbons',
      actor: 'Ron Livingston',
      children: [
        {
          name: 'And More!!',
          actor:
            'This is just to show how to build a complex tree with multiple levels of children. Enjoy!',
        },
      ],
    },
    {
      name: 'Milton Waddams',
      actor: 'Stephen Root',
    },
    {
      name: 'Bob Slydell',
      actor: 'John C. McGi...',
    },
  ],
};

interface State {
  allMenus: any[];
  visible?: boolean;
  editName?: boolean;
  fatherValue?: string;
  nameValue?: string;
}
interface FormProps extends FormComponentProps {}
type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormProps;

class Organization extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      allMenus: [],
      visible: false,
      editName: false,
      fatherValue: '',
      nameValue: '',
    };
  }
  handleOk = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({
          visible: false,
        });
      }
    });
  };
  handleCancel = e => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  };
  MyNodeComponent = ({ node }) => {
    return (
      <div className={styles.initechNode} onClick={this.showDialog.bind(this, node.name)}>
        {node.name}
      </div>
    );
  };
  showDialog = name => {
    this.props.form.setFieldsValue({
      name: name,
    });
    this.setState({
      visible: true,
    });
  };
  async componentDidMount() {
    this.getData();
  }
  async getData() {
    let user = {
      roleId: localStorage.getItem('userMessage'),
    };
    const menus = await getLeftMenues(user);
    this.setState({
      allMenus: menus.result,
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 18 },
    };
    return (
      <div id={styles.initechOrgChart}>
        <OrgChart tree={initechOrg} NodeComponent={this.MyNodeComponent} />
        <Modal
          title="添加下级菜单"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={700}
        >
          {/* <Form.Item {...formItemLayout} label="上级目录名称">
            {getFieldDecorator('name', {
              rules: [],
            })(<Input />)}
          </Form.Item> */}
          <Form.Item {...formItemLayout} label="组织名称">
            {getFieldDecorator('name', {
              rules: [],
            })(<Input />)}
          </Form.Item>
        </Modal>
      </div>
    );
  }
}

const AddUserForm = Form.create<Props>({ name: 'add_user' })(Organization);
const mapState = ({ menu, router }) => ({
  ...menu,
  router,
});

export default connect(mapState)(AddUserForm);

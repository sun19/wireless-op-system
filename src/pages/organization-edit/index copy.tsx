/**
 * title: 菜单编辑
 */
import React from 'react';
import { Table, Form, Input, message, Modal, Badge, Menu, Dropdown, Icon } from 'antd';
import request, { format } from '@/utils/request';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/lib/form';
import { UmiComponentProps } from '@/common/type';
import OrgChart from 'react-orgchart';
import 'react-orgchart/index.css';


import { BASE_API_URL } from '../../config/constants';
import { getLeftMenues } from '@/pages/login/login.service';
import MainContent from './components/MainContent';
import EditableTable from './components/EditorableTable';

import styles from './index.less';

import { LEFT_MENUS } from '../../config/menus';
const defaultMenuNodes = LEFT_MENUS;

const { confirm } = Modal;
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    editable: true,
    key: 'name',
  },
  // {
  //   title: '路径',
  //   dataIndex: 'path',
  //   editable: false,
  //   key: 'path',

  // },
  // {
  //   title: 'Action',
  //   dataIndex: '',
  //   key: 'x',
  //   render: () => <a>Delete</a>,
  // },
];
const initechOrg = {
  name: "Bill Lumbergh",
  actor: "Gary Cole",
  children: [
    {
      name: "Peter Gibbons",
      actor: "Ron Livingston",
      children: [
        {
          name: "And More!!",
          actor: "This is just to show how to build a complex tree with multiple levels of children. Enjoy!"
        }
      ]
    },
    {
      name: "Milton Waddams",
      actor: "Stephen Root"
    },
    {
      name: "Bob Slydell",
      actor: "John C. McGi..."
    },
  ]
};
interface State {
  allMenus: any[];
  visible?: boolean;
  editName?:boolean;
  fatherValue?: string;
  nameValue?: string;
}
interface FormProps extends FormComponentProps { }
type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormProps;


class MenuEdit extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      allMenus: [],
      visible: false,
      editName:false,
      fatherValue: '',
      nameValue:'',
    };
    this.updateData = this.updateData.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
    this.addColumn = this.addColumn.bind(this)
    this.editColumn = this.editColumn.bind(this)
    // this.cancel = this.cancel.bind(this)
  }
  addColumn(item) {

    this.props.form.setFieldsValue({
      name: item.name
    })
    this.setState({
      visible: true,
      // fatherValue: item.name
    });
  }
  editColumn(item) {
    // console.log(this.props.form)
    this.props.form.setFieldsValue({
      name: item.name
    })
    this.setState({
      editName: true,
      
    });
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
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
      }
    });
  }
  handleEditOk = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({
          editName: false,
        });
      }
    });

  };
  handleEditSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
      }
    });
  }
  handleEditCancel = e => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  };
  deleteColumn(item) {
    //TODO:修改人ID
    let self = this;
    confirm({
      title: '确定要删除这条信息吗？',
      content: '',
      okText: '取消',
      okType: 'danger',
      cancelText: '确定',
      onOk() { },
      async onCancel() {
        //  await deleteInfo({ id: item.id });
        //  //重新请求数据重绘
        //  self.getInfoListData();
      },
    });
  }
  async componentDidMount() {
    this.getData()
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
  async updateData(newData, newItem) {
    const isSuccessed = request.post(
      BASE_API_URL + '/jeecg-boot/intf/location/updateMenu',
      {
        data: format({
          id: newItem.id,
          name: newItem.name,
        }),
      },
    );
    if (isSuccessed) {
      this.getData()
      let user = {
        roleId: localStorage.getItem('userMessage'),
      };
      let data = await getLeftMenues(user);
      this.props.dispatch({
        type: 'menu/changeOpen',
        payload: {
          menus: data.result || [],
        },
      });
      // message.success('编辑成功')
    }
  }
  // expandedRowRender = (record, index, indent, expanded) => {
  //   const child = record.child;
  //   if (child && Array.isArray(child) && child.length > 0) {
  //     const columns = [
  //       {
  //         title: '菜单名',
  //         dataIndex: 'name',
  //         editable: true,
  //       },
  //       {
  //         title: '路径',
  //         dataIndex: 'path',
  //         editable: false,
  //       },
  //     ];
  //     return (
  //       <EditableTable
  //         columns={columns}
  //         data={child}
  //         pagination={false}
  //         cancel={this.cancel}
  //         expandedRowRender={this.expandedRowRender}
  //         showInlineEdit={true}
  //       />
  //     );
  //   }
  // };

  render() {
  const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 18 },
    };
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        // console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        // console.log(selected, selectedRows, changeRows);
      },
    };
    return (
      <div className={styles.menu_edit}>
        {/* <Table columns={columns} rowSelection={rowSelection} dataSource={this.state.allMenus} />, */}
        <EditableTable
          columns={columns}
          // expandedRowRender={this.expandedRowRender}
          data={this.state.allMenus}
      //  data=   {defaultMenuNodes}
          showInlineEdit={true}
          updateData={this.updateData}
          deleteColumn={this.deleteColumn}
          addColumn={this.addColumn}
          editColumn={this.editColumn}
        />
        <Modal
          title="修改名称"
          visible={this.state.editName}
          onOk={this.handleEditOk}
          onCancel={this.handleEditCancel}
          width={700}
        >
          <Form.Item {...formItemLayout} label="菜单名称">
            {getFieldDecorator('name', {
              rules: [],
            })(<Input  />)}
          </Form.Item>
        </Modal>

        <Modal
          title="添加下级菜单"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={700}
        >
            <Form.Item  {...formItemLayout} label="上级目录名称">
            {getFieldDecorator('name', {
              rules: [],
            })(<Input />)}
            </Form.Item>
          <Form.Item {...formItemLayout}  label="菜单名称">
            {getFieldDecorator('childrenName', {
              rules: [],
            })(<Input />)}
            </Form.Item>
        </Modal>
      
      </div>
    );
  }
}

 

const AddUserForm = Form.create<Props>({ name: 'add_user' })(MenuEdit);
const mapState = ({ menu, router }) => ({
  ...menu,
  router,
});

export default connect(mapState)(AddUserForm);


 

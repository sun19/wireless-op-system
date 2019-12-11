/**
 * title: 菜单编辑
 */
import React from 'react';
import { Table, message, Badge, Menu, Dropdown, Icon } from 'antd';
import request, { format } from '@/utils/request';
import { connect } from 'dva';


import { getAllMenues, getLeftMenues } from '@/pages/login/login.service';
import MainContent from './components/MainContent';
import EditableTable from './components/EditorableTable';

import styles from './index.less';

const columns = [
  {
    title: '菜单名',
    dataIndex: 'name',
    editable: true,
  },
  {
    title: '路径',
    dataIndex: 'path',
    editable: false,
  },
];

interface State {
  allMenus: any[];
}

 class MenuEdit extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      allMenus: [],
    };
    this.updateData = this.updateData.bind(this);
    this.cancel = this.cancel.bind(this)
  }
  async componentDidMount() {
  this.getData()
  }
  async getData(){
    const menus = await getAllMenues();
    this.setState({
      allMenus: menus.result,
    });
  }
  async updateData(newData, newItem) {
    const isSuccessed = request.post(
      'http://47.96.112.31:8086/jeecg-boot/intf/location/updateMenu',
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
  expandedRowRender = (record, index, indent, expanded) => {
    const child = record.child;
    if (child && Array.isArray(child) && child.length > 0) {
      const columns = [
        {
          title: '菜单名',
          dataIndex: 'name',
          editable: true,
        },
        {
          title: '路径',
          dataIndex: 'path',
          editable: false,
        },
      ];
      return (
        <EditableTable
          columns={columns}
          data={child}
          pagination={false}
          cancel={this.cancel}
          expandedRowRender={this.expandedRowRender}
          showInlineEdit={true}
        />
      );
    }
  };
   cancel(){
   }
  render() {
    return (
      <div className={styles.menu_edit}>
        <EditableTable
          columns={columns}
          expandedRowRender={this.expandedRowRender}
          data={this.state.allMenus}
          showInlineEdit={true}
          cancel={this.cancel}
          updateData={this.updateData}
        />
      </div>
    );
  }
}

const mapState = ({ menu, router }) => ({
  ...menu,
  router,
});

export default connect(mapState)(MenuEdit);

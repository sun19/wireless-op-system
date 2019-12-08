/**
 * title: 设置 > 高级管理员设置 > 值班员设置 > 用户管理
 */
import React from 'react';
import { UmiComponentProps } from '@/common/type';
import { Layout, Modal, Form, Select, Input, Row, Col, Button, Icon } from 'antd';
import { connect } from 'dva';
import * as _ from 'lodash';
import router from 'umi/router';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '@/config/constants';
import { getUserList, updateUserInfo, deleteUser } from '../services';
import { DeleteUser } from '../services/index.interfaces';

import styles from './index.less';
import publicStyles from '../index.less';

const { Option } = Select;
const { confirm } = Modal;
const { Content } = Layout;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});
const FormItem = Form.Item;

type StateProps = ReturnType<typeof mapState>;

type Props = StateProps & UmiComponentProps;

const columns = [
  {
    title: '登录名',
    dataIndex: 'loginName',
    // width: '20%',
    editable: true,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    // width: '10%',
    editable: true,
  },
  {
    title: '人员类型',
    dataIndex: 'roleName',
    editable: true,
    className: 'select_text',
  },
  {
    title: '性别',
    dataIndex: 'sex',
    // width: '5%',
    className: 'select_text',
    editable: true,
    render: onlineStatus => {
      return ['男', '女'][onlineStatus];
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
    // width: '10%',
    editable: true,
    ellipsis: true,
  },
  {
    title: '最近一次登录时间',
    dataIndex: 'landingTime',
    width: '20%',
    editable: false,
  },
];

interface State {
  loginName: string;
  name: string;
}

class UserManager extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.updateData = this.updateData.bind(this);
    // this.deleteColumn = this.deleteColumn.bind(this);
    this.state = {
      loginName: '',
      name: '',
    };
  }

  onLoginNameChange = (e: any) => {
    this.setState({
      loginName: e.target.value,
    });
  };

  onNameChange = (e: any) => {
    this.setState({
      name: e.target.value,
    });
  };

  clearAllInput = () => {
    this.setState({
      loginName: '',
      name: '',
    });
    this.forceUpdate(() => {
      this.getUserListData();
    });
  };

  onSearch = () => {
    this.getUserListData();
  };

  addUser = () => {
    router.push('/system-setting/customer-manager-sub/add');
  };

  deleteColumn = (item: DeleteUser) => {
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
        let data = {
          id: item.id,
        };
        await deleteUser(data);
        //重新请求数据重绘
        self.getUserListData();
      },
   
    });
  };

  async componentDidMount() {
    this.getUserListData();
  }

  async getUserListData() {
    const { loginName, name } = this.state;
    const userList = await getUserList({ loginName, name, userType: '2' });
    this.props.dispatch({
      type: 'systemSetting/update',
      payload: { customManager: userList },
    });
  }

  async updateData(data, item) {
    this.props.dispatch({
      type: 'systemSetting/update',
      payload: {
        customManagerRecord: data,
      },
    });
    router.push('/system-setting/customer-manager-sub/edit');
  }

  render() {
    let { userList } = this.props;
    if (_.isEmpty(userList)) {
      userList = {
        records: [],
        total: 0,
      };
    }
    let { records, total } = userList;
    records = records.map(item => {
      return _.assign(item, { key: item.id, remark: item.remark ? item.remark : '-' });
    });
    return (
      <div className={`${publicStyles.public_hight} add__inner--container`}>
        <Content className={publicStyles.bg}>
          <div className={styles.public_hight_40}>
            <Form layout="inline">
              <Row justify="start" align="middle" style={{ paddingLeft: '39px' }} gutter={16}>
                <FormItem label="登录名">
                  <Input
                    className={publicStyles.input_text}
                    placeholder="请输入登录名"
                    onChange={this.onLoginNameChange}
                    value={this.state.loginName}
                  />
                </FormItem>
                <FormItem label="姓名">
                  <Input
                    className={publicStyles.input_text}
                    placeholder="请输入姓名"
                    onChange={this.onNameChange}
                    value={this.state.name}
                  />
                </FormItem>
                <span className={publicStyles.button_type}>
                  <Button className={publicStyles.form_btn} onClick={this.onSearch}>
                    查询
                  </Button>
                  <Button
                    className={publicStyles.form_btn}
                    style={{ marginLeft: 37 }}
                    onClick={this.clearAllInput}
                  >
                    清空
                  </Button>
                </span>
                <span
                  className={[`${publicStyles.form_btn_add}`, `${publicStyles.form_btns}`].join(
                    ' ',
                  )}
                  style={{ marginLeft: 37 }}
                  onClick={this.addUser}
                >
                  <IconFont type="icon-plus" />
                </span>
              </Row>
            </Form>
          </div>
          <MainContent
            data={records}
            columns={columns}
            updateData={this.updateData}
            deleteColumn={this.deleteColumn}
            total={total}
            showEdit={true}
          />
        </Content>
      </div>
    );
  }
}

const mapState = ({ systemSetting }) => {
  const resp = systemSetting.customManager;
  return { userList: resp };
};

export default connect(mapState)(UserManager);

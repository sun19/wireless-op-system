/**
 * title: 显示 > 用户列表—内部
 */
import React from 'react';
import { Layout, Modal, Form, Input, Row, Col, Select, Button, Icon, Tooltip, message } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import * as _ from 'lodash';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';
import { UmiComponentProps } from '@/common/type';
import {
  getUserList,
  updateUser,
  deleteUser,
  addCardNoInfo,
  importUser,
  exportUser,
} from '../services';
import styles from './index.less';
import publicStyles from '../index.less';

const { confirm } = Modal;
const { Content } = Layout;
const FormItem = Form.Item;
const { Option } = Select;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});

const columns = [
  // {
  //   title: '序号',
  //   dataIndex: 'id',
  //   width: '10%',
  //   editable: false,
  // },
  {
    title: '姓名',
    dataIndex: 'name',
    editable: true,
  },
  {
    title: '身份证号',
    dataIndex: 'cardNo',
    editable: true,
    ellipsis: true,
    onCell: () => {
      return {
        style: {
          // maxWidth: 150,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer'
        }
      }
    },
    render: (text) => <Tooltip className='tooltips' placement="topLeft" title={text}>{text}</Tooltip>,
  },
  // {
  //   title: '性别',
  //   dataIndex: 'sex',
  //   className: 'select_text',
  //   editable: true,
  //   render: onlineStatus => {
  //     return ['男', '女'][onlineStatus];
  //   },
  // },
  // {
  //   title: '家庭住址',
  //   dataIndex: 'address',
  //   editable: true,
  // },
  // {
  //   title: '联系方式',
  //   dataIndex: 'phone',
  //   editable: true,
  // },
  {
    title: '部门名称',
    dataIndex: 'departmentName',
    className: 'select_text',
    editable: true,
  },
  {
    title: '职务名称',
    dataIndex: 'positionName',
    className: 'select_text',
    editable: true,
  },

  {
    title: '保密等级',
    dataIndex: 'securityLevelName',
    editable: true,
    className: 'select_text',
  },
  // {
  //   title: '信息牌名称',
  //   dataIndex: 'informationBoardName',
  //   editable: true,
  // },
  {
    title: '录入时间',
    dataIndex: 'entryTime',
    editable: true,
    ellipsis:true,
    onCell: () => {
      return {
        style: {
          // maxWidth: 150,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer'
        }
      }
    },
    render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>,
  },
  // {
  //   title: '注销时间',
  //   dataIndex: 'logoutTime',
  //   width: '20%',
  //   editable: true,
  // },
];

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps;

interface State {
  name?: string;
  cardNo?: string;
  sex?: string;
  address?: string;
  phone?: string;
  departmentId?: string;
  departmentName?: string;
  positionId?: string;
  positionName?: string;
  securityLevelId?: string;
  securityLevelName?: string;
  informationBoardId?: string;
  informationBoardName?: string;
}

class UserInside extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.getUserList = this.getUserList.bind(this);
    this.updateData = this.updateData.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
    this.getCardNoInfo = this.getCardNoInfo.bind(this);
    this.state = {
      name: '',
      cardNo: '',
    };
    this.exportUser = this.exportUser.bind(this);
  }
  addUser = () => {
    router.push('/user-manager/user-inside/add');
  };

  onNameChange = e => {
    this.setState({ name: e.target.value });
  };
  onCardNoChange = e => {
    this.setState({
      cardNo: e.target.value,
    });
  };
  onSearch = () => {
    this.getUserList();
  };
  onClearResult = () => {
    this.setState({ name: '', cardNo: '' });
    this.forceUpdate(() => this.getUserList());
  };

  async getUserList() {
    const params = {
      isIn: '0',
    };
    const { name, cardNo } = this.state;
    if (name !== '') {
      params['name'] = name;
    }
    if (cardNo !== '') {
      params['cardNo'] = cardNo;
    }
    const userList = await getUserList(params);
    this.props.dispatch({
      type: 'userManager/update',
      payload: {
        innerUserList: userList.result,
      },
    });
  }

  async updateData(data, item) {
    // const resp = await updateUser(item);
    // if (resp) {
    //   this.props.dispatch({
    //     type: 'userManager/update',
    //     payload: { innerUserList: { records: data } },
    //   });
    // }
    this.props.dispatch({
      type: 'userManager/update',
      payload: {
        userInside: data,
      },
    });
    router.push('/user-manager/user-inside/edit');
  }

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
        await deleteUser({ id: item.id });
        //重新请求数据重绘
        self.getUserList();
      },
     
    });
  }

  async getCardNoInfo() {
    await addCardNoInfo();
  }

  async exportUser() {
    const isSuccessed = await exportUser();
  }

  componentDidMount() {
    this.getUserList();
  }

  componentWillUnmount() {
    message.destroy();
    this.props.dispatch({
      type: 'userManager/update',
      payload: {
        innerUserList:[],
      },
    });
  }


  render() {
    let { innerUserList } = this.props;
    const { name, cardNo } = this.state;
    if (_.isEmpty(innerUserList)) {
      innerUserList = {
        records: [],
        total: 0,
      };
    }
    let { records, total } = innerUserList;
    records = records.map(item => {
      return _.assign(item, { key: item.id });
    });

    return (
      <div className={publicStyles.public_hight}>
        <Content className={publicStyles.bg}>
          <div className={styles.public_hight_40}>
            <Form layout="inline">
              <Row
                // type="flex"
                justify="start"
                align="middle"
                style={{ paddingLeft: '39px' }}
                gutter={16}
              >
                <FormItem label="姓名">
                  <Input
                    className={publicStyles.input_text}
                    placeholder="请输入姓名"
                    value={name}
                    onChange={this.onNameChange}
                  />
                </FormItem>
                <FormItem label="身份证号">
                  <Input
                    className={publicStyles.input_text}
                    placeholder="请输入身份证号"
                    value={cardNo}
                    onChange={this.onCardNoChange}
                  />
                </FormItem>
                <span className={publicStyles.button_type}>
                  <Button className={publicStyles.form_btn} onClick={this.onSearch}>
                    查询
                  </Button>
                  <Button
                    className={publicStyles.form_btn}
                    style={{ marginLeft: 37 }}
                    onClick={this.onClearResult}
                  >
                    清空
                  </Button>
                </span>
                <span className={[`${publicStyles.form_btns}`].join(' ')}>
                  <span
                    className={[`${publicStyles.form_btn_add}`].join('')}
                    onClick={this.addUser}
                  >
                    <IconFont type="icon-plus" />
                  </span>
                  <span className={[`${publicStyles.form_btn_add}`].join('')}>
                    <IconFont type="icon-download-simple" onClick={this.exportUser} />
                  </span>
                  <span className={[`${publicStyles.form_btn_add}`].join('')}>
                    <IconFont type="icon-upload-light" onClick={this.getCardNoInfo} />
                  </span>
                </span>
              </Row>
            </Form>
          </div>
          <MainContent
            columns={columns}
            data={records}
            total={total}
            updateData={this.updateData}
            deleteColumn={this.deleteColumn}
            showEdit={true}
          />
        </Content>
      </div>
    );
  }
}

const mapState = ({ userManager }) => {
  const resp = userManager.innerUserList;
  return {
    innerUserList: resp,
  };
};

export default connect(mapState)(UserInside);

import React from 'react';
import { Layout, Form, Input, Row, Col, Select, Button, Icon, message } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import * as _ from 'lodash';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';
import { UmiComponentProps } from '@/common/type';
import { getUserList, updateUser, deleteUser, addCardNoInfo } from '../services';
import styles from './index.less';
import publicStyles from '../index.less';

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
  },
  {
    title: '性别',
    dataIndex: 'sex',
    editable: true,
  },
  {
    title: '家庭住址',
    dataIndex: 'address',
    editable: true,
  },
  {
    title: '联系方式',
    dataIndex: 'phone',
    editable: true,
  },
  {
    title: '部门名称',
    dataIndex: 'departmentName',
    editable: true,
  },
  {
    title: '职务名称',
    dataIndex: 'positionName',
    editable: true,
  },

  {
    title: '保密登记名称',
    dataIndex: 'securityLevelName',
    editable: true,
  },
  {
    title: '信息牌名称',
    dataIndex: 'informationBoardName',
    editable: true,
  },
  {
    title: '录入时间',
    dataIndex: 'entryTime',
    editable: true,
  },
  {
    title: '注销时间',
    dataIndex: 'logoutTime',
    editable: true,
  },
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
    const params = {};
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
    const resp = await updateUser(item);
    if (resp) {
      this.props.dispatch({
        type: 'userManager/update',
        payload: { innerUserList: { records: data } },
      });
    }
  }

  async deleteColumn(item) {
    //TODO:修改人ID
    await deleteUser({ id: item.id });
    //重新请求数据重绘
    this.getUserList();
  }

  async getCardNoInfo() {
    await addCardNoInfo();
  }

  exportUser = () => {
    message.success('人员导出成功');
  };

  componentDidMount() {
    this.getUserList();
  }

  componentWillUnmount() {
    message.destroy();
  }

  render() {
    const { innerUserList } = this.props;
    const { name, cardNo } = this.state;
    if (_.isEmpty(innerUserList)) return null;
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

import React from 'react';
import { Layout, Form, Input, Row, Col, Select, Button, Icon } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import * as _ from 'lodash';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';
import { UmiComponentProps } from '@/common/type';
import { getUserList, updateUser, deleteUser } from '../services';
import styles from './index.less';
import publicStyles from '../index.less';

const { Content } = Layout;
const FormItem = Form.Item;
const { Option } = Select;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    width: '10%',
    editable: false,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: '10%',
    editable: true,
  },
  {
    title: '身份证号',
    dataIndex: 'cardNo',
    width: '10%',
    editable: true,
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: '5%',
    editable: true,
  },
  {
    title: '家庭住址',
    dataIndex: 'address',
    width: '10%',
    editable: true,
  },
  {
    title: '联系方式',
    dataIndex: 'phone',
    width: '10%',
    editable: true,
  },
  {
    title: '部门名称',
    dataIndex: 'departmentName',
    width: '10%',
    editable: true,
  },
  {
    title: '职务名称',
    dataIndex: 'positionName',
    width: '5%',
    editable: true,
  },

  {
    title: '保密登记名称',
    dataIndex: 'securityLevelName',
    width: '5%',
    editable: true,
  },
  {
    title: '信息牌名称',
    dataIndex: 'informationBoardName',
    width: '5%',
    editable: true,
  },
  {
    title: '录入时间',
    dataIndex: 'entryTime',
    width: '10%',
    editable: true,
  },
  {
    title: '注销时间',
    dataIndex: 'logoutTime',
    width: '10%',
    editable: true,
  },
];

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps;

class UserInside extends React.Component<Props> {
  constructor(props: any) {
    super(props);
    this.getUserList = this.getUserList.bind(this);
    this.updateData = this.updateData.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
  }
  addUser = () => {
    router.push('/user-manager/user-inside/add');
  };

  async getUserList() {
    const userList = await getUserList({});
    this.props.dispatch({
      type: 'userManager/update',
      payload: {
        peopleType: userList.result,
      },
    });
  }

  async updateData(data, item) {
    const resp = await updateUser(item);
    if (resp) {
      this.props.dispatch({
        type: 'userManager/update',
        payload: { peopleType: { records: data } },
      });
    }
  }

  async deleteColumn(item) {
    //TODO:修改人ID
    await deleteUser({ id: item.id });
    //重新请求数据重绘
    this.getUserList();
  }

  componentDidMount() {
    this.getUserList();
  }

  render() {
    const { innerUserList } = this.props;
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
                  <Input className={publicStyles.input_text} placeholder="请输入姓名" />
                </FormItem>
                <FormItem label="身份证号">
                  <Input className={publicStyles.input_text} placeholder="请输入姓名" />
                </FormItem>
                <span className={publicStyles.button_type}>
                  <Button className={publicStyles.form_btn}>查询</Button>
                  <Button className={publicStyles.form_btn} style={{ marginLeft: 37 }}>
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
                    <IconFont type="icon-download-simple" />
                  </span>
                  <span className={[`${publicStyles.form_btn_add}`].join('')}>
                    <IconFont type="icon-upload-light" />
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

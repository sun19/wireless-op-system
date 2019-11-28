/**
 * title: 显示 > 人员类型
 */
import React from 'react';
import { Layout, Modal, Form, Input, Row, Col, Button, Icon } from 'antd';
import { connect } from 'dva';
import * as _ from 'lodash';
import router from 'umi/router';

import { ICON_FONTS_URL } from '../../../config/constants';
import MainContent from '../components/MainContent';
import { getUserTypes, updateUserType, deleteUserType } from '../services';
import styles from './index.less';
import publicStyles from '../index.less';
import { UmiComponentProps } from '@/common/type';

const { confirm } = Modal;
const { Content } = Layout;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});

const columns = [
  // {
  //   title: '序号',
  //   dataIndex: 'id',
  //   width: '30%',
  //   editable: false,
  // },
  {
    title: '人员类型',
    dataIndex: 'roleName',
    // width: '30%',
    className: 'select_text',
    editable: true,
  },
  {
    title: '英文名称',
    dataIndex: 'roleCode',
    // width: '40%',
    editable: true,
  },
];

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps;

class PeopelType extends React.Component<Props> {
  constructor(props: any) {
    super(props);
    this.getUserTypes = this.getUserTypes.bind(this);
    this.updateData = this.updateData.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
  }

  async getUserTypes() {
    const userTypes = await getUserTypes({});
    this.props.dispatch({
      type: 'systemSetting/update',
      payload: {
        peopleType: userTypes.result,
      },
    });
  }

  async updateData(data, item) {
    this.props.dispatch({
      type: 'systemSetting/update',
      payload: {
        peopleTypeRecord: data,
      },
    });
    router.push('/system-setting/people-type/edit');
  }
  deleteColumn(item) {
    //TODO:修改人ID
    let self = this;
    confirm({
      title: '确定要删除这条信息吗？',
      content: '',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        await deleteUserType({ id: item.id });
        //重新请求数据重绘
        self.getUserTypes();
      },
      onCancel() {},
    });
  }

  addUserType() {
    router.push('/system-setting/people-type/auth');
  }

  componentDidMount() {
    this.getUserTypes();
  }

  render() {
    let { userTypes } = this.props;
    if (_.isEmpty(userTypes)) {
      userTypes = {
        records: [],
        total: 0,
      };
    }
    let { records, total } = userTypes;
    records = records.map(item => {
      return _.assign(item, { key: item.id });
    });

    return (
      <div className={publicStyles.public_hight}>
        <Content className={publicStyles.bg}>
          <div className={styles.public_hight_40}>
            <div className={[`${publicStyles.btn}`].join(' ')}>
              <IconFont type="icon-plus" onClick={this.addUserType} />
            </div>
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

const mapState = ({ systemSetting }) => {
  const resp = systemSetting.peopleType;
  return {
    userTypes: resp,
  };
};

export default connect(mapState)(PeopelType);

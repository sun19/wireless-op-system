/**
 * title: 设置 > 高级管理员设置 > 基础数据设置 > 企业名称
 */
import React from 'react';
import { Layout, message } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import * as _ from 'lodash';

import MainContent from '../components/MainContent';
import { UmiComponentProps } from '@/common/type';
import {
  getCompanyNameList,
  updateSuperAdmin,

} from '../services';
import publicStyles from '../index.less';

const { Content } = Layout;


const columns = [
 
  {
    title: '企业名称',
    dataIndex: 'dictName',
    editable: true,
  },
];

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps;
interface State {
  type: string;
  remark: string;
}

class SuperAdmin extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      type: '',
      remark: '',
    };

    this.getSuperAdminList = this.getSuperAdminList.bind(this);
    this.updateData = this.updateData.bind(this);
  }


  async getSuperAdminList() {
    const superAdmins = await getCompanyNameList({type:"systemLogoTitle"});
    this.props.dispatch({
      type: 'systemSetting/update',
      payload: {
        superAdmin: superAdmins,
      },
    });
  }

  async updateData(data, item) {
    this.props.dispatch({
      type: 'systemSetting/update',
      payload: {
        superAdminRecord: data,
      },
    });
    router.push('/system-setting/company-name/edit');
  }

 

  // onRemarkChange = e => {
  //   this.setState({ remark: e.target.value });
  // };

  // onTypeChange = e => {
  //   this.setState({
  //     type: e.target.value,
  //   });
  // };

  // onUploadTemp = () => {
  //   uploadSuperAdmin();
  // };

 
  componentDidMount() {
    this.getSuperAdminList();
  }
  componentwillUnmount() {
    message.destroy();
  }


  render() {
    let { superAdmin } = this.props;
    if (_.isEmpty(superAdmin)) {
      superAdmin = {
        records: [],
        total: 0,
      };
    }
    let { records, total } = superAdmin;
    records = records.map(item => {
      return _.assign(item, { key: item.id });
    });

    return (
      <div className={publicStyles.public_hight}>
        <Content className={publicStyles.bg}>
          <MainContent
            columns={columns}
            data={records}
            total={total}
            updateData={this.updateData}
            showEdit={true}
            showDelete={false}
          />
        </Content>
      </div>
    );
  }
}

const mapState = ({ systemSetting }) => {
  const resp = systemSetting.superAdmin;
  return {
    superAdmin: resp,
  };
};

export default connect(mapState)(SuperAdmin);

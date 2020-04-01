/**
 * title: 设置 > 高级管理员设置 > 基础数据设置 > 信息牌背景设置
 */
import React from 'react';
import { Layout, message } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import * as _ from 'lodash';

import MainContent from '../components/MainContent';
import { UmiComponentProps } from '@/common/type';
import { getCompanyNameList, updateSuperAdmin, getSubModel } from '../services';
import publicStyles from '../index.less';

const { Content } = Layout;

const columns = [
  // {
  //   title: '信息牌背景',
  //   dataIndex: 'dictName',
  //   render: color => {
  //     if (color === null) {
  //       let nullData = '/';
  //       return nullData;
  //     } else {
  //       return (
  //         <span
  //           // className={publicStyles.color_span}
  //           style={{
  //             width: '40px',
  //             height: '20px',
  //             display: 'inline-block',
  //             background: color,
  //           }}
  //         />
  //       );
  //     }
  //   },
  // },{
   {
    title: '宽',
    dataIndex: 'width',
    className: 'select_text',
    editable: true,
  },{
    title: '高',
    dataIndex: 'height',
    className: 'select_text',
    editable: true,
  },{
    title: '字号',
    dataIndex: 'font',
    className: 'select_text',
    editable: true,
  }
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
    // const superAdmins = await getCompanyNameList({ type: 'boardBackground' });
    const superAdmins = await getSubModel();
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
    router.push('/system-setting/info-card-background/edit');
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
    let records = []
    records.push(superAdmin)
    return (
      <div className={publicStyles.public_hight}>
        <Content className={publicStyles.bg}>
          <MainContent className={publicStyles.tableStyle}
            columns={columns}
            data={records}
            total={records.length}
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

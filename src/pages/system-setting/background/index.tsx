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
import { getCompanyNameList, updateSuperAdmin, uploadImg } from '../services';
import publicStyles from '../index.less';

const { Content } = Layout;
type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps;
interface State {
  type: string;
  remark: string;
  fileData: string
}

class SuperAdmin extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      type: '',
      remark: '',
      fileData: ''
    };

    this.uploadImg = this.uploadImg.bind(this);
  }

  async uploadImg(){
    let fileData = this.state.fileData
    let data = {
      file: fileData,
    };
    const updateDictName = await uploadImg(data);
  }

  componentDidMount() {
  }
  componentwillUnmount() {
    message.destroy();
  }

  render() {
     return (
     <div className={publicStyles.public_hight} style={{color: '#fff'}}>
       <Content>
         <div style={{marginLeft: '80px'}} onClick={() => this.uploadImg()}>添加文件</div>
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

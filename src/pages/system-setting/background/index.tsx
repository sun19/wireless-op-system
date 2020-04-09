/**
 * title: 设置 > 高级管理员设置 > 基础数据设置 > 信息牌背景设置
 */
import React from 'react';
import { Layout, message, Button, Icon, Upload } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import * as _ from 'lodash';

import MainContent from '../components/MainContent';
import { UmiComponentProps } from '@/common/type';
import { getCompanyNameList, updateSuperAdmin, uploadImg } from '../services';
import publicStyles from '../index.less';
import backgroundStyles from './index.less';
import { UPLOAD_IMG } from '@/config/api';

const { Content } = Layout;
type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps;
interface State {
  type: string;
  remark: string;
  fileData: string;
  message: string;
}

const props = {};

class SuperAdmin extends React.Component<Props, State> {
  uploadProps: any;
  constructor(props: any) {
    super(props);
    this.state = {
      type: '',
      remark: '',
      fileData: '',
      message: '',
    };

    this.uploadImg = this.uploadImg.bind(this);
    this.uploadProps = {
      name: 'file',
      action: UPLOAD_IMG,
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          // console.log(info.file, info.fileList, 'uploading');
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          let resp = info.response || '{}';
          resp = JSON.parse(resp);
          const txt = resp.message || '';
          this.setState({
            message: txt,
          });
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
  }

  async uploadImg() {
    let fileData = this.state.fileData;
    let data = {
      file: fileData,
    };
    const updateDictName = await uploadImg(data);
  }

  componentDidMount() {}
  componentwillUnmount() {
    message.destroy();
  }

  render() {
    return (
      <div className={publicStyles.public_hight} style={{ color: '#fff' }}>
        <Content>
          <Upload {...this.uploadProps}>
            <div style={{ marginLeft: '100px', color: '#fff' }}>
              上传图片(仅支持jpg、bmp、png三种图片格式)
            </div>
          </Upload>
        </Content>
        <div>{this.state.message}</div>
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

/**
 * title: 设置 > 值班员设置 > 数据库备份
 */
import React from 'react';
import { Layout, Modal, Form, message, Row, Col, Select, Button, Icon } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import * as _ from 'lodash';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';
import { UmiComponentProps } from '@/common/type';
import styles from './index.less';
import publicStyles from '../index.less';

const { confirm } = Modal;
const { Content } = Layout;
const FormItem = Form.Item;
const { Option } = Select;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});


type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps;

interface State {
  pollingPointName: string;
}

class PollingLine extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
}
copyDatabase(){
  message.success('备份成功!', 1000);
}
  render() {    
    return (
      <div className={publicStyles.public_hight}>
        <Button className={publicStyles.form_btn} onClick={this.copyDatabase}>
           备份数据库
        </Button>
      </div>
    );
  }
}

const mapState = ({ mapManager }) => {
  const resp = mapManager.pollingLines;
  return {
    pollingLines: resp,
  };
};

export default connect(mapState)(PollingLine);

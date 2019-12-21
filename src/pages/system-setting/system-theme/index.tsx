/**
 * title: 设置 > 高级管理员设置 > 基础数据设置 > 信息牌背景设置
 */
import React from 'react';
import { Layout, message, Radio,Form, Button } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import * as _ from 'lodash';

import MainContent from '../components/MainContent';
import { UmiComponentProps } from '@/common/type';
import {
  getDictNameByType,
  updateDictNameByType,

} from '../services';
import publicStyles from '../index.less';

const { Content } = Layout;



type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps;
interface State {
  type: string;
  remark: string;
  value: number;
}

class SuperAdmin extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      type: '',
      remark: '',
      value: 1,
    };

    this.getSuperAdminList = this.getSuperAdminList.bind(this);
    this.updateData = this.updateData.bind(this);
  }


  async getSuperAdminList() {
    const themes = await getDictNameByType({ type: "theme" });
    this.setState({ value: themes })
  }

  async updateData() {
    let data = {
      type: "theme",
      name: this.state.value
    }
    const updateDictName = await updateDictNameByType(data);
    if (updateDictName.success) {
      message.success('修改成功!', 1000);
    }
  }

  componentDidMount() {
    this.getSuperAdminList();
  }
  componentwillUnmount() {
    message.destroy();
  }

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };
  render() {
    return (
      <div className={publicStyles.public_bg}>
        <Radio.Group name="radiogroup" onChange={this.onChange} value={this.state.value}>
          <Radio value={1}>   <div>
            <img className={publicStyles.radioBg} src={require('../../../assets/login/1.png')} />
          </div></Radio>
          <Radio value={2}> <div>
            <img className={publicStyles.radioBg} src={require('../../../assets/login/2.png')} />
          </div></Radio>
          <Radio value={3}> <div>
            <img className={publicStyles.radioBg} src={require('../../../assets/login/3.png')} />
          </div></Radio>
          <Radio value={4}> <div>
            <img className={publicStyles.radioBg} src={require('../../../assets/login/4.png')} />
          </div></Radio>
          <Radio value={5}>
            <div>
              <img className={publicStyles.radioBg} src={require('../../../assets/login/5.png')} />
            </div>
          </Radio>
        </Radio.Group>
        <Form.Item className={publicStyles.button_type}>
          <Button className={publicStyles.form_btn} onClick={this.updateData}>
            保存
                      </Button>
                      
        </Form.Item>
      
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

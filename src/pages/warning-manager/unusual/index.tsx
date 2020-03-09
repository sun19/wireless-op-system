/**
 * title: 显示 > 告警类型
 */
import React from 'react';
import { Layout, Modal, Form, Input, Row, Col, Select, Button, Icon } from 'antd';
import router from 'umi/router';
import * as _ from 'lodash';
import { connect } from 'dva';
import { UmiComponentProps } from '@/common/type';
import { FormComponentProps } from 'antd/lib/form';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';
import styles from './index.less';
import publicStyles from '../index.less';
import { unusualData, wraningTypeDel } from '../services';
import { WraningTypeDel } from '../services/index.interfaces';
import { string } from 'prop-types';

const { confirm } = Modal;
const { Content } = Layout;
const FormItem = Form.Item;
const { Option } = Select;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});

interface FormProps extends FormComponentProps {}
type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormProps;
const columns = [
  {
    title: '异常类型',
    dataIndex: 'type',
    editable: true,
    render(type) {
      return [
        '',
        '入口身份核实',
        '防止穿墙及瞬间移动',
        '呆滞时间原因分析',
        '轨迹点不连续分析',
        '异常消失分析',
      ][type];
      //
    },
  },
  {
    title: '异常发生时间',
    dataIndex: 'exceptionTime',
    editable: true,
  },
  {
    title: '异常位置',
    dataIndex: 'abnormalPosition',
    editable: true,
  },
  {
    title: '信息牌',
    dataIndex: 'boardNumber',
    editable: true,
  },
  {
    title: '用户姓名',
    width: '20%',
    dataIndex: 'userName',
  },
];

interface State {
  type?: string;
}

class WraningType extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    // this.updateData = this.updateData.bind(this);
    // this.deleteColumn = this.deleteColumn.bind(this);
    this.getwarningTypeList = this.getwarningTypeList.bind(this);
    this.state = {
      type: undefined,
    };
  }
  async componentDidMount() {
    const data = {
      type: '',
    };
    this.getwarningTypeList(data);
    this.props.form.validateFields();
  }

  async getwarningTypeList(data) {
    const taskList = await unusualData(data);
    this.props.dispatch({
      type: 'warningManager/update',
      payload: { unusual: taskList.result },
    });
  }

  // 查询
  search = e => {
    const data = {
      type: this.state.type,
    };
    this.getwarningTypeList(data);
  };
  handleReset = () => {
    // this.props.form.resetFields();
    this.setState({ type: '' });
    const data = {
      type: '',
    };
    this.getwarningTypeList(data);
  };
  selectChange = (e: any) => {
    this.setState({
      type: e,
    });
  };
  setupUserType = () => {
    return (
      <div style={{ marginTop: '-3px' }}>
        <Select
          getPopupContainer={triggerNode => triggerNode.parentElement}
          placeholder="请选择类型"
          className={publicStyles.select_text}
          onChange={this.selectChange}
          value={this.state.type}
        >
          <Option value="1">入口身份核实</Option>
          <Option value="2">防止穿墙及瞬间移动</Option>
          <Option value="3">呆滞时间原因分析</Option>
          <Option value="4">轨迹点不连续分析</Option>
          <Option value="5">异常消失分析</Option>
        </Select>
      </div>
    );
  };
  render() {
    let { taskList } = this.props;
    const { getFieldDecorator } = this.props.form;
    if (_.isEmpty(taskList)) {
      taskList = {
        records: [],
        total: 0,
      };
    }
    let { records, total } = taskList;
    records = records.map(item => {
      return _.assign(item, { key: item.id });
    });

    return (
      <div className={publicStyles.public_hight}>
        <Content className={publicStyles.bg}>
          <div className={styles.public_hight_40}>
            <Form layout="inline" onSubmit={this.search}>
              <Row justify="start" align="middle" style={{ paddingLeft: '39px' }} gutter={16}>
                {/* <FormItem label="告警名称">
                  {getFieldDecorator(
                    'name',
                    {},
                  )(<Input className={publicStyles.input_text} placeholder="请输入告警名称" />)}
                </FormItem> */}
                <FormItem label="类型">
                  {getFieldDecorator('type', {})(this.setupUserType())}
                </FormItem>

                <span className={publicStyles.button_type}>
                  <Button className={publicStyles.form_btn} htmlType="submit">
                    查询
                  </Button>
                  <Button
                    className={publicStyles.form_btn}
                    onClick={this.handleReset}
                    style={{ marginLeft: 37 }}
                  >
                    清空
                  </Button>
                </span>
              </Row>
            </Form>
          </div>
          <MainContent
            data={records}
            columns={columns}
            // updateData={this.updateData}
            // deleteColumn={this.deleteColumn}
            total={total}
            // showEdit={true}
          />
        </Content>
      </div>
    );
  }
}

const TaskPlanFrom = Form.create<Props>({ name: 'warn_manager_type' })(WraningType);
const mapState = ({ warningManager }) => {
  const resp = warningManager.unusual;
  return { taskList: resp };
};
export default connect(mapState)(TaskPlanFrom);

/**
 * title: 应用 > 告警信息
 */
import React from 'react';
import { Layout, Modal,Form, Input, Row, Col, TimePicker, Button, DatePicker,Icon } from 'antd';
import * as _ from 'lodash';
import router from 'umi/router';
import { connect } from 'dva';
import { UmiComponentProps } from '@/common/type';
import { FormComponentProps } from 'antd/lib/form';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';
import styles from './index.less';
import publicStyles from '../index.less';
import moment from 'moment';
import { warningInfoSearch } from '../services';
// import { DelTaskList } from '../services/index.interfaces';

const { confirm } = Modal;
const { Content } = Layout;
const FormItem = Form.Item;
interface FormProps extends FormComponentProps {}
type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormProps;

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});
const columns = [
  {
    title: '告警名称',
    dataIndex: 'name',
    editable: true,
  },
  {
    title: '所属地图',
    dataIndex: 'mapName',
    className: 'select_text',
    editable: true,
  },
  {
    title: '告警时间',
    dataIndex: 'alarmTime',
    editable: true,
  },
  {
    title: '相关信息牌',
    dataIndex: 'informationBoardName',
    editable: true,
  },
  {
    title: '告警方式',
    dataIndex: 'alarmTypeName',
    editable: true,
  },
];

interface State {
  name: string;
  alarmStartTime: string;
  alarmEndTime: string;
  pageNo?: number;
}
class WraningInfo extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.manage = this.manage.bind(this);
    // this.deleteColumn = this.deleteColumn.bind(this);
    this.state = {
      name: '',
      alarmStartTime: '',
      alarmEndTime: '',
      pageNo: 1,
    };
  }

  async componentDidMount() {
    this.getTaskListData();
    this.props.form.validateFields();
  }

  async getTaskListData(data?: State) {
    const taskList = await warningInfoSearch(data);
    this.props.dispatch({
      type: 'warningManager/update',
      payload: { info: taskList },
    });
  }
  manage(data, item) {
      this.props.dispatch({
        type: 'warningManager/update',
        payload: { dataSource: data },
      });
    router.push('/warning-manager/info/manage');

  }
  // // 删除
  // async deleteColumn(item: DelTaskList) {
  //   //TODO:修改人ID
  //   await delTaskList({ id: item.id });
  //   //重新请求数据重绘
  //   this.getTaskListData();
  // }
  // 查询
  search = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      const { alarmStartTime, alarmEndTime, ...props } = values
      const data = {
        ...props,
        alarmStartTime: values.alarmStartTime ? values.alarmStartTime.format('YYYY-MM-DD HH:mm:ss').toString() : '',
        alarmEndTime: values.alarmEndTime ? values.alarmEndTime.format('YYYY-MM-DD HH:mm:ss').toString() : ''
      }
      this.getTaskListData(data);
    });
  };
  handleReset = () => {
    this.props.form.resetFields();
    this.getTaskListData();
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
                <FormItem label="告警标签">
                  {getFieldDecorator(
                    'name',
                    {},
                  )(<Input className={publicStyles.input_text} placeholder="请输入告警标签" />)}
                </FormItem>
                <span className={publicStyles.authInner} style={{ paddingLeft: '39px' }}>
                  {/* <span className={publicStyles.timePicker}> */}
                    <FormItem label="开始时间">
                      {getFieldDecorator('alarmStartTime', {
                      })(
                        <DatePicker showTime={true} placeholder="请选择开始时间" />,
                      )}
                    </FormItem>
                    <FormItem label="结束时间">
                      {getFieldDecorator('alarmEndTime', {
                        // initialValue: moment('12:08:23', 'HH:mm:ss'),
                      })(
                        <DatePicker showTime={true} format="YYYY-MM-DD HH:mm:ss" placeholder="请选择结束时间" />,
                      )}
                    </FormItem>
                  {/* </span> */}
                </span>
                <span className={publicStyles.button_type}>
                  <Button
                    className={publicStyles.form_btn}
                    style={{ marginLeft: 30 }}
                    htmlType="submit"
                  >
                    查询
                  </Button>
                  <Button
                    className={publicStyles.form_btn}
                    style={{ marginLeft: 30 }}
                    onClick={this.handleReset}
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
            showManage={true}
            manage={this.manage}
            
          />
        </Content>
      </div>
    );
  }
}

const TaskPlanFrom = Form.create<Props>({ name: 'task_paln' })(WraningInfo);
const mapState = ({ warningManager }) => {
  const resp = warningManager.info;
  return { taskList: resp };
};
export default connect(mapState)(TaskPlanFrom);

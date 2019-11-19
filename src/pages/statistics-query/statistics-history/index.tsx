/**
 * title: 统计查询/历史轨迹
 */
import React from 'react';
import { Layout, Form, Input, Row, Col, Select, TimePicker, Button, Icon } from 'antd';
import * as _ from 'lodash';
import router from 'umi/router';
import { connect } from 'dva';
import { UmiComponentProps } from '@/common/type';
import { FormComponentProps } from 'antd/lib/form';


import SelectText from '../components/SelectText';
import { OptionValue } from '../components/SelectText';
import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';
import styles from './index.less';
import publicStyles from '../index.less';
import moment from 'moment';
import { getSatisticsHistory, getAllRoles } from '../services';
// import { DelTaskList } from '../services/index.interfaces';

const { Option } = Select;
const { Content } = Layout;
const FormItem = Form.Item;
interface FormProps extends FormComponentProps { }
type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormProps;

const columns = [
  {
    title: '信息牌编号',
    dataIndex: 'informationBoardId',
    editable: true,
  },
  {
    title: '状态',
    dataIndex: 'onlineStatus',
    editable: true,
  },
  {
    title: '定位',
    dataIndex: 'positionName',
    editable: true,
  },
  {
    title: '任务',
    dataIndex: 'taskName',
    editable: true,
  },
  {
    title: '进入时间',
    dataIndex: 'entryTime',
    editable: true,
  }, {
    title: '离开时间',
    dataIndex: 'leaveTime',
    editable: true,
  }, {
    title: '姓名',
    dataIndex: 'userName',
    editable: true,
  }, {
    title: '职务',
    dataIndex: 'alarmType4',
    editable: true,
  }, {
    title: '身份证号',
    dataIndex: 'cardNo',
    editable: true,
  }, {
    title: '人员类型',
    dataIndex: 'type',
    editable: true,
  },
];

interface UserType {
  key?: string;
  value?: string;
  roleId: string;
}
interface State {
  userTypes: UserType[];
  name: string;
  alarmStartTime: string;
  alarmEndTime: string;
  pageNo?: number;
  pageSize?: number;
}


const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});
class StatisticsHistory extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      userTypes: [],
      name: '',
      alarmStartTime: '',
      alarmEndTime: '',
      pageNo: 1,
      pageSize: 10,
    };
  }
  
  async componentDidMount() {
    this.getAllRole()
    this.getHistoryListData();
    this.props.form.validateFields();
  }
  addUser = () => {
    router.push('/statistics-query/statistics-history/add');
  };
  search = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      // console.log('1', values);
      // this.getHistoryListData(values);
    });
  };
  async getAllRole(data?: State) {
    let userTypes = await getAllRoles();
      userTypes = userTypes.map(item => ({
      key: item.id,
      value: item.roleName,
      roleId: item.id,
    }));
    this.setState({ userTypes})
    // this.props.dispatch({
    //   type: 'statisticsQuery/history',
    //   payload: { roles: userTypes },
    // });
  
  }
  async getHistoryListData(data?: State) {
    const taskList = await getSatisticsHistory(data);
    this.props.dispatch({
      type: 'statisticsQuery/history',
      payload: { history: taskList.result},
    });
  }
  render() {
    let { taskList} = this.props;
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
                <FormItem label="信息牌">
                  {getFieldDecorator(
                    'name',
                    {},
                  )(<Input className={publicStyles.input_text} placeholder="请输入信息牌" />)}
                </FormItem>
                <FormItem label="身份证号">
                  {getFieldDecorator(
                    'name',
                    {},
                  )(<Input className={publicStyles.input_text} placeholder="请输入身份证号" />)}
                </FormItem>
                <Form.Item label="人员类型">
                  {getFieldDecorator('roleId', {

                    rules: [
                      {
                        message: '请选择人员类型',
                      },
                    ],

                    initialValue:'1',
                  })(

                    <SelectText
                      options={this.state.userTypes as OptionValue[]}
                      style={{ width: '2rem' }}
                    />,
                  )}
                </Form.Item>
                <FormItem label="开始时间" className={publicStyles.authInner}>
                  {getFieldDecorator('startTime', {
                    // initialValue: moment('12:08:23', 'HH:mm:ss'),
                  })(
                    <span className={publicStyles.timePicker}>
                    <TimePicker placeholder="请选择开始时间" /></span>,
                    // <span className={publicStyles.timePicker}>
                    // </span>,
                  )}
                </FormItem>
                <FormItem label="结束时间" className={publicStyles.authInner}>
                  {getFieldDecorator('endTime', {
                    // initialValue: moment('12:08:23', 'HH:mm:ss'),
                  })(
                    <span className={publicStyles.timePicker}>
                      <TimePicker placeholder="请选择结束时间" /></span>,
                  )}
                </FormItem>

                <span className={publicStyles.button_type}>
                  <Button className={publicStyles.form_btn} style={{ marginLeft: 10 }}>
                    查询
                  </Button>
                  <Button className={publicStyles.form_btn} style={{ marginLeft: 10 }}>
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
          />
        </Content>
      </div>
    );
  }
}

const TaskPlanFrom = Form.create<Props>({ name: 'task_paln' })(StatisticsHistory);
const mapState = ({ statisticsQuery }) => {
  const resp = statisticsQuery.history;
  return { taskList: resp};
};
export default connect(mapState)(TaskPlanFrom);

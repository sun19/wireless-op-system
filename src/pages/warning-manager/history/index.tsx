import React from 'react';
import { Layout, Form, Input, Row, Col, TimePicker, Button, Icon } from 'antd';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';
import styles from './index.less';
import publicStyles from '../index.less';
import moment from 'moment';
import * as _ from 'lodash';
import { connect } from 'dva';
import { UmiComponentProps } from '@/common/type';
import { FormComponentProps } from 'antd/lib/form';

import { warningHistorySearch } from '../services';

const { Content } = Layout;
const FormItem = Form.Item;

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});
interface FormProps extends FormComponentProps {}
type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormProps;

const columns = [
  // {
  //   title: '序号',
  //   dataIndex: 'id',
  //   editable: true,
  // },
  {
    title: '告警名称',
    dataIndex: 'informationBoardName',
    editable: true,
  },
  {
    title: '所属地图',
    dataIndex: 'task',
    editable: true,
  },
  {
    title: '相关信息牌',
    dataIndex: 'startTime',
    editable: true,
  },
  {
    title: '告警方式',
    dataIndex: 'endTime',
    editable: true,
  },
  {
    title: '告警处理人',
    dataIndex: 'remark1',
    editable: true,
  },
  {
    title: '告警处理结果',
    dataIndex: 'remark2',
    editable: true,
  },
  {
    title: '告警处理时间',
    dataIndex: 'remark3',
    editable: true,
  },
];

interface State {
  pageNo?: number;
  pageSize?: number;
  warnModeName: string;
  alarmStartTime: string;
  alarmEndTime: string;
}
class WraningHistory extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.updateData = this.updateData.bind(this);
    // this.deleteColumn = this.deleteColumn.bind(this);
    this.state = {
  warnModeName:'',
  alarmStartTime: '',
  alarmEndTime:'',
      pageNo: 1,
      pageSize: 10,
    };
  }
  async componentDidMount() {
    this.getTaskListData();
    this.props.form.validateFields();
  }

  async getTaskListData(data?: State) {
    const historyList = await warningHistorySearch(data);
    this.props.dispatch({
      type: 'wraningManager/update',
      payload: { history: historyList },
    });
  }
  async updateData(data, item) {
    const resp = await warningHistorySearch(item);
    if (resp) {
      this.props.dispatch({
        type: 'wraningManager/update',
        payload: { history: { records: data } },
      });
    }
  }
 
  // 查询
  search = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      // console.log('1', values);
      this.getTaskListData(values);
    });
  };
  handleReset = () => {
    this.props.form.resetFields();
    this.getTaskListData();
  };
  render() {
             const { taskList } = this.props;
             const { getFieldDecorator } = this.props.form;
            //  console.log(taskList);

             let { records, total } = taskList;
             records = _.isEmpty(taskList)
               ? null
               : records.map(item => {
                   return _.assign(item, { key: item.id });
                 });
             return (
               <div className={publicStyles.public_hight}>
                 <Content className={publicStyles.bg}>
                   <div className={styles.public_hight_40}>
                     <Form layout="inline" onSubmit={this.search}>
                       <Row
                         // type="flex"
                         justify="start"
                         align="middle"
                         style={{ paddingLeft: '39px' }}
                         gutter={16}
                       >
                         <FormItem label="警告名称">
                           {getFieldDecorator('warnModeName', {})(
                             <Input
                               className={publicStyles.input_text}
                               placeholder="请输入警告名称"
                             />,
                           )}
                         </FormItem>
                         <span className={publicStyles.authInner} style={{ paddingLeft: '39px' }}>
                           <span className={publicStyles.timePicker}>
                             <FormItem label="警告标签">
                               {getFieldDecorator('alarmStartTime', {
                                 initialValue: moment('12:08:23', 'HH:mm:ss'),
                               })(<TimePicker />)}
                             </FormItem>
                           </span>
                           <span className={publicStyles.timePicker}>-</span>
                           <span className={publicStyles.timePicker}>
                             <FormItem label="">
                               {getFieldDecorator('alarmEndTime', {
                                 initialValue: moment('12:08:23', 'HH:mm:ss'),
                               })(<TimePicker />)}
                             </FormItem>
                           </span>
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
                     updateData={this.updateData}
                     // deleteColumn={this.deleteColumn}
                     total={total}
                   />
                 </Content>
               </div>
             );
           }
}

const TaskPlanFrom = Form.create<Props>({ name: 'task_paln' })(WraningHistory);
const mapState = ({ wraningManager }) => {
  // console.log(wraningManager);
  const resp = wraningManager.history;
  return { taskList: resp };
};
export default connect(mapState)(TaskPlanFrom);

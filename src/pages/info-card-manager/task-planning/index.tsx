/**
 * title: 设置 > 值班员设置 > 任务规划
 */
import React from 'react';
import { Layout, Modal, Form, Input, Row, Col, Select, Button, Alert, message, Icon } from 'antd';
import router from 'umi/router';
import * as _ from 'lodash';
import { connect } from 'dva';
import { UmiComponentProps } from '@/common/type';
import { FormComponentProps } from 'antd/lib/form';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';
import styles from './index.less';
import publicStyles from '../index.less';
import { getTaskList, delTaskList, TaskListEdit } from '../services';
// import { getAllPosition, getAllSecretLevels } from '@/pages/login/login.service';
import { DelTaskList } from '../services/index.interfaces';

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
    title: '信息牌编号',
    dataIndex: 'informationBoardId',
    editable: true,
  },
  {
    title: '任务',
    className: 'select_text',
    dataIndex: 'task',
    editable: true,
    render(item) {
      return ['巡更路线', '责任区', '禁止区'][item];
    },
  },
  // {
  //   title: '开始时间',
  //   dataIndex: 'startTime',
  //   width: '20%',
  //   editable: true,
  // },
  // {
  //   title: '结束时间',
  //   dataIndex: 'endTime',
  //   width: '20%',
  //   editable: true,
  // },
  {
    title: '备注',
    dataIndex: 'remark',
    editable: true,
  },
];
interface State {
  name: string;
  informationBoardName: string;
  task: string;
  pageNo?: number;
  taskTypes?: any[];
  remark?: string;
}
class TaskPlan extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
    this.state = {
      name: '',
      informationBoardName: '',
      task: '',
      pageNo: 1,
      taskTypes: [],
    };
  }

  async componentDidMount() {
    await this.getTaskListData();
    this.props.form.validateFields();
    const { taskList } = this.props;
    let { records, total } = taskList;
    records = _.isEmpty(taskList)
      ? []
      : records.map(item => {
          return _.assign(item, { key: item.id });
        });
    const arr: any[] = _.uniqBy(records, 'task');
    this.setState({
      taskTypes: arr,
    });
  }

  async getTaskListData(data?: State) {
    const taskList = await getTaskList(data);
    this.props.dispatch({
      type: 'infoCardManager/update',
      payload: { taskPlan: taskList },
    });
  }
  async updateData(data, item) {
    router.push('/info-card-manager/task-planning/edit');
    this.props.dispatch({
      type: 'infoCardManager/update',
      payload: { editData: data },
    });
  }
  addUser = () => {
    router.push('/info-card-manager/task-planning/add');
  };
  // 删除
  deleteColumn(item: DelTaskList) {
    //TODO:修改人ID
    let self = this;
    confirm({
      title: '确定要删除这条信息吗？',
      content: '',
      okText: '取消',
      okType: 'danger',
      cancelText: '确定',
      onOk() {},
      async onCancel() {
        await delTaskList({ id: item.id });
        //重新请求数据重绘
        self.getTaskListData();
      },
    });
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
  setupSelectOptions = records => {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form.Item label="任务">
        {getFieldDecorator('task', {
          rules: [],
          // initialValue: '',
        })(
          <Select   getPopupContainer={triggerNode => triggerNode.parentElement} placeholder="请选择任务" style={{ marginTop: '-5px' }}>
            <Option value="0">巡更路线</Option>
            <Option value="1">责任区</Option>
            <Option value="2">禁止区</Option>
          </Select>,
        )}
      </Form.Item>
    );
  };
  render() {
    const { taskList } = this.props;
    const { getFieldDecorator } = this.props.form;
    let { records, total } = taskList;
    records = _.isEmpty(taskList)
      ? []
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
                {/* <FormItem label="姓名">
                  {getFieldDecorator(
                    'name',
                    {},
                  )(<Input className={publicStyles.input_text} placeholder="请输入姓名" />)}
                </FormItem> */}
                <FormItem label="信息牌">
                  {getFieldDecorator(
                    'informationBoardName',
                    {},
                  )(<Input className={publicStyles.input_text} placeholder="信息牌编号" />)}
                </FormItem>
                {this.setupSelectOptions(records)}
                <span className={publicStyles.button_type}>
                  <Button className={publicStyles.form_btn} type="primary" htmlType="submit">
                    查询
                  </Button>
                  <Button
                    className={publicStyles.form_btn}
                    style={{ marginLeft: 37 }}
                    onClick={this.handleReset}
                    // htmlType="submit"
                  >
                    清空
                  </Button>
                </span>
                {/* TODO:任务规划缺少UI界面 */}
                <span className={[`${publicStyles.form_btns}`].join(' ')} onClick={this.addUser}>
                  <span className={[`${publicStyles.form_btn_add}`].join('')}>
                    <IconFont type="icon-plus" />
                  </span>
                </span>
              </Row>
            </Form>
          </div>
          <MainContent
            data={records}
            columns={columns}
            updateData={this.updateData}
            deleteColumn={this.deleteColumn}
            total={total}
            showEdit={true}
          />
        </Content>
      </div>
    );
  }
}
const TaskPlanFrom = Form.create<Props>({ name: 'task_paln' })(TaskPlan);
const mapState = ({ infoCardManager }) => {
  // console.log(infoCardManager);
  const resp = infoCardManager.taskPlan;
  return { taskList: resp };
};

export default connect(mapState)(TaskPlanFrom);

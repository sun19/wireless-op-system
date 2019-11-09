import React from 'react';
import { Layout, Form, Input, Row, Col, Select, Button, Icon } from 'antd';
import * as _ from 'lodash';
import { connect } from 'dva';
import { UmiComponentProps } from '@/common/type';
import { FormComponentProps } from 'antd/lib/form';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';
import styles from './index.less';
import publicStyles from '../index.less';
import { getTaskList, delTaskList } from '../services';
// import { getAllDuties, getAllSecretLevels } from '@/pages/login/login.service';
import { DelTaskList } from '../services/index.interfaces';

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
    title: '序号',
    dataIndex: 'id',
    editable: true,
  },
  {
    title: '信息牌编号',
    dataIndex: 'informationBoardName',
    editable: true,
  },
  {
    title: '任务',
    dataIndex: 'task',
    editable: true,
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    editable: true,
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    editable: true,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    editable: true,
  },
];
interface State {
  remark: string;
  informationBoardName: string;
  task: string;
  pageNo?: number;
  pageSize?: number;
}
class TaskPlan extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.updateData = this.updateData.bind(this);
    // this.deleteColumn = this.deleteColumn.bind(this);
    this.state = {
      remark: '',
      informationBoardName: '',
      task: '',
      pageNo: 1,
      pageSize: 10,
    };
  }

  async componentDidMount() {
    this.getTaskListData();
    this.props.form.validateFields();
  }

  async getTaskListData(data?: State) {
    // const { remark, informationBoardName, task, pageSize, pageNo } = this.state;
    const taskList = await getTaskList(data);
    this.props.dispatch({
      type: 'infoCardManager/update',
      payload: { taskPlan: taskList },
    });
  }
  async updateData(data, item) {
    const resp = await getTaskList(item);
    if (resp) {
      this.props.dispatch({
        type: 'infoCardManager/update',
        payload: { taskPlan: { records: data } },
      });
    }
  }
  // 删除
  async deleteColumn(item: DelTaskList) {
    //TODO:修改人ID
    await delTaskList({ id: item.id });
    //重新请求数据重绘
    this.getTaskListData();
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

    if (_.isEmpty(taskList)) return null;
    let { records, total } = taskList;
    records = records;
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
                <FormItem label="姓名">
                  {getFieldDecorator('remark', {})(
                    <Input className={publicStyles.input_text} placeholder="请输入姓名" />,
                  )}
                </FormItem>
                <FormItem label="信息牌">
                  {getFieldDecorator('informationBoardName', {})(
                    <Input className={publicStyles.input_text} placeholder="信息牌编号" />,
                  )}
                </FormItem>
                <Form.Item label="任务">
                  {getFieldDecorator('task', {
                    initialValue: '0',
                  })(
                    <Select placeholder="请选择任务" style={{ marginTop: '-3px' }}>
                      <Option value="0">电力巡检</Option>
                      <Option value="1">导入测试</Option>
                    </Select>,
                  )}
                </Form.Item>
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
                <span className={[`${publicStyles.form_btns}`].join(' ')}>
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

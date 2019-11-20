/**
 * title: 告警类型
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
import { warningTypeSearch, wraningTypeDel } from '../services';
import { WraningTypeDel } from '../services/index.interfaces';

const { confirm } = Modal;
const { Content } = Layout;
const FormItem = Form.Item;
const { Option } = Select;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});

interface FormProps extends FormComponentProps { }
type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormProps;
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
    title: '区域选择',
    dataIndex: 'regionalName',
    className: 'select_text',
    editable: true,
  },
  {
    title: '关联标签',
    dataIndex: 'informationBoardName',
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
    title: '聚集半径(m)',
    dataIndex: 'aggregateRadius',
    editable: true,
  },
  {
    title: '超限人数',
    dataIndex: 'overrunNum',
    editable: true,
  },
  {
    title: '超限时间',
    dataIndex: 'overrunTime',
    editable: true,
  },
  {
    title: '重复类型',
    dataIndex: 'repeatType',
    className: 'select_text',
    editable: true,
  },
  {
    title: '告警方式',
    dataIndex: 'warnMode',
    className: 'select_text',
    editable: true,
  },
];

interface State {
  name: string;
  pageNo?: number;
}

class WraningType extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
    this.getwarningTypeList = this.getwarningTypeList.bind(this);
    this.state = {
      name: '',
      pageNo: 1,
    };
  }
  async componentDidMount() {
    this.getwarningTypeList();
    this.props.form.validateFields();
  }

  async getwarningTypeList(data?: State) {
    const taskList = await warningTypeSearch(data);
    this.props.dispatch({
      type: 'warningManager/update',
      payload: { type: taskList },
    });
  }
  async updateData(data, item) {
    const resp = await warningTypeSearch(item);
    if (resp) {
      this.props.dispatch({
        type: 'warningManager/update',
        payload: { type: { records: data } },
      });
    }
  }
  // 删除
  deleteColumn(item: WraningTypeDel) {
    //TODO:修改人ID

    let self = this
    confirm({
      title: '确定要删除这条信息吗？',
      content: '',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        await wraningTypeDel({ id: item.id });
        //重新请求数据重绘
        self.getwarningTypeList();
      },
      onCancel() {
      },
    })

  }
  addUser = () => {
    router.push('/warning-manager/type/add');
  };
  // 查询
  search = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      this.getwarningTypeList(values);
    });
  };
  handleReset = () => {
    this.props.form.resetFields();
    this.getwarningTypeList();
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
                <FormItem label="告警名称">
                  {getFieldDecorator(
                    'name',
                    {},
                  )(<Input className={publicStyles.input_text} placeholder="请输入告警名称" />)}
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

const TaskPlanFrom = Form.create<Props>({ name: 'warn_manager_type' })(WraningType);
const mapState = ({ warningManager }) => {
  const resp = warningManager.type;
  return { taskList: resp };
};
export default connect(mapState)(TaskPlanFrom);

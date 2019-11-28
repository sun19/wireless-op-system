/**
 * title: 应用 > 巡检列表
 */
import React from 'react';
import { Layout, Form, Select, Input, Row, Col, TimePicker, Button, DatePicker, Icon } from 'antd';
import { connect } from 'dva';
import * as _ from 'lodash';
import { FormComponentProps } from 'antd/lib/form';
import router from 'umi/router';

// const { MonthPicker, RangePicker } = DatePicker;
import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';
import { UmiComponentProps } from '@/common/type';
import { getInspectDetail, getInspectList } from '../services';
import { GetInspectListParams } from '../services/index.interfaces';
import styles from './index.less';
import publicStyles from '../index.less';
import moment from 'moment';

const { Content } = Layout;
const { Option } = Select;
const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});

const columns = [
  {
    title: '路线名称',
    dataIndex: 'inspectionRoute',
    editable: true,
  },
  {
    title: '巡检人员',
    dataIndex: 'createId',
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
    title: '是否完成',
    className: 'select_text',
    dataIndex: 'whether',
    editable: true,
    render: (name, record) => {
      return (
        <div>
          {record.whether == '1' ? (
            <IconFont type="icon-correct" />
          ) : (
            <IconFont type="icon-error" />
          )}
        </div>
      );
    },
  },
  {
    title: '描述',
    dataIndex: 'remark',
    editable: true,
  },
];

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormComponentProps;

class RouteInspectList extends React.Component<Props> {
  constructor(props: any) {
    super(props);
    this.getRouteInspectList = this.getRouteInspectList.bind(this);
    this.previewData = this.previewData.bind(this);
    // this.updateData = this.updateData.bind(this);
    // this.deleteColumn = this.deleteColumn.bind(this);
  }
  async getRouteInspectList(params: GetInspectListParams = {}) {
    const resp = await getInspectList(params);
    if (resp) {
      this.props.dispatch({
        type: 'routeInspect/update',
        payload: {
          routeInspectList: resp.result,
        },
      });
    }
  }
  // 查询
  onSearch = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      const { startTime, endTime, ...props } = values;
      const data = {
        ...props,
        startTime: values.startTime ? values.startTime.format('YYYY-MM-DD HH:mm:ss') : '',

        endTime: values.endTime ? values.endTime.format('YYYY-MM-DD HH:mm:ss') : '',
      };

      this.getRouteInspectList(data);
    });
  };

  onClear = () => {
    this.props.form.resetFields();
    this.getRouteInspectList();
  };

  componentDidMount() {
    this.getRouteInspectList();
  }
  previewData(data, item) {
    // this.props.dispatch({
    //   type: 'statisticsQuery/update',
    //   payload: {
    //     historyRecord: data,
    //   },
    // });
    // router.push('/statistics-query/statistics-history/preview');
  }

  render() {
    let { routeInspectList } = this.props;
    if (_.isEmpty(routeInspectList)) {
      routeInspectList = {
        records: [],
        total: 0,
      };
    }
    let { records, total } = routeInspectList;
    records = records.map(item => {
      return _.assign(item, { key: item.id });
    });
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={publicStyles.public_hight}>
        <Content className={publicStyles.bg}>
          <div className={styles.public_hight_40}>
            <Form layout="inline" onSubmit={this.onSearch}>
              <Row
                // type="flex"
                justify="start"
                align="middle"
                style={{ paddingLeft: '39px' }}
                gutter={16}
              >
                <FormItem label="巡检路线">
                  {getFieldDecorator(
                    'inspectionRoute',
                    {},
                  )(<Input className={publicStyles.input_text} placeholder="请输入巡检路线" />)}
                </FormItem>
                <FormItem label="巡检人员">
                  {getFieldDecorator(
                    'createId',
                    {},
                  )(<Input className={publicStyles.input_text} placeholder="请输入巡检人员" />)}
                </FormItem>
                <FormItem label="开始时间">
                  {getFieldDecorator(
                    'startTime',
                    {},
                  )(<DatePicker showTime={true} placeholder="请选择开始时间" />)}
                </FormItem>
                <FormItem label="结束时间">
                  {getFieldDecorator('endTime', {
                    // initialValue: moment('12:08:23', 'HH:mm:ss'),
                  })(
                    <DatePicker
                      showTime={true}
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder="请选择结束时间"
                    />,
                  )}
                </FormItem>
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
                    onClick={this.onClear}
                  >
                    清空
                  </Button>
                </span>
              </Row>
            </Form>
          </div>
          <MainContent
            columns={columns}
            data={records}
            total={total}
            showEdit={false}
            showLookOver={true}
            preview={this.previewData}
          />
        </Content>
      </div>
    );
  }
}

const mapState = ({ routeInspect }) => {
  const resp = routeInspect.routeInspectList;
  return {
    routeInspectList: resp,
  };
};

const RouteInspectListHOC = Form.create<Props>({ name: 'route_inspect_list' })(RouteInspectList);

export default connect(mapState)(RouteInspectListHOC);

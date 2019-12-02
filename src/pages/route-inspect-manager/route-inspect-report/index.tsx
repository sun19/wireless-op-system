/**
 * title: 显示 > 巡检报表
 */
import React from 'react';
import { Layout, Form, Input, Row, Col, TimePicker, Button, DatePicker, Icon } from 'antd';
import * as _ from 'lodash';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';
import { UmiComponentProps } from '@/common/type';
import { getInspectReports } from '../services';
import { GetInspectReportsParams } from '../services/index.interfaces';
import styles from './index.less';
import publicStyles from '../index.less';
import moment from 'moment';

const { Content } = Layout;
const FormItem = Form.Item;

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});

const columns = [
  // {
  //   title: '序号',
  //   dataIndex: 'id',
  //   editable: true,
  // },
  {
    title: '路线1',
    dataIndex: 'inspectionId',
    editable: true,
    render: (name, record) => {
      return (
        <div>
          {record.inspectionId == '1' ? (
            <IconFont type="icon-correct" />

          ) : (
              <IconFont type="icon-error" />

            )}
        </div>
      );
    },
  }, {
    title: '路线2',
    dataIndex: 'routeId',
    editable: true,
    render: (name, record) => {
      return (
        <div>
          {record.routeId == '1' ? (
            <IconFont type="icon-correct" />

          ) : (
              <IconFont type="icon-error" />

            )}
        </div>
      );
    },
  }, {
    title: '路线3',
    dataIndex: 'updateId',
    editable: true,
    render: (name, record) => {
      return (
        <div>
          {record.updateId == '1' ? (
            <IconFont type="icon-correct" />

          ) : (
              <IconFont type="icon-error" />

            )}
        </div>
      );
    },
  },
];

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormComponentProps;

class RouteInspectReport extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }
  async getRouteInspectReports(params: GetInspectReportsParams = {}) {
    const resp = await getInspectReports(params);
    if (resp) {
      this.props.dispatch({
        type: 'routeInspect/update',
        payload: {
          routeInspectReports: resp.result,
        },
      });
    }
  }
  onSearch = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      const { createtime, endTime, ...props } = values
      const data = {
        ...props,
        createtime: values.createtime ?values.createtime.format('YYYY-MM-DD HH:mm:ss'):'',

        endTime: values.endTime ? values.endTime.format('YYYY-MM-DD HH:mm:ss') : ''
      }
      this.getRouteInspectReports(data);
    });
  };

  onClear = () => {
    this.props.form.resetFields();
    this.getRouteInspectReports();
  };

  componentDidMount() {
    this.getRouteInspectReports();
  }

  render() {
    let { routeInspectReports } = this.props;
    if (_.isEmpty(routeInspectReports)) {
      routeInspectReports = {
        records: [],
        total: 0,
      };
    }
    let { records, total } = routeInspectReports;
    records = records.map((item,index)=> {
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
                <FormItem label="开始时间">
                  {getFieldDecorator('createtime', {
                  })(
                    <DatePicker showTime={true} placeholder="请选择开始时间" />,
                  )}
                </FormItem>
                <FormItem label="结束时间">
                  {getFieldDecorator('endTime', {
                    // initialValue: moment('12:08:23', 'HH:mm:ss'),
                  })(
                    <DatePicker showTime={true} format="YYYY-MM-DD HH:mm:ss" placeholder="请选择结束时间" />,
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
          <MainContent columns={columns} data={records} total={total} showEdit={false} />
        </Content>
      </div>
    );
  }
}

const mapState = ({ routeInspect }) => {
  const resp = routeInspect.routeInspectReports;
  return {
    routeInspectReports: resp,
  };
};

const RouteInspectReportHOC = Form.create<Props>({ name: 'route_inspect_report' })(
  RouteInspectReport,
);

export default connect(mapState)(RouteInspectReportHOC);

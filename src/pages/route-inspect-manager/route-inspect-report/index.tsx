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
import { getInspectReports, queryInspectionReportByTime } from '../services';
import { GetInspectReportsParams } from '../services/index.interfaces';
import styles from './index.less';
import publicStyles from '../index.less';
import moment from 'moment';

const { Content } = Layout;
const FormItem = Form.Item;

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});
interface State {
  colum: any[];
  record: any[];
}

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormComponentProps;

class RouteInspectReport extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      colum: [],
      record: [],
    };
  }

  async getNewReports(params: GetInspectReportsParams = {}) {
    const resp = await queryInspectionReportByTime(params);
    // console.log(resp)
    if (!!resp.success) {
      let colum: any = [
        {
          title: '日期',
          dataIndex: 'date',
          editable: false,
        },
      ];
      let record = resp.result.records;
      resp.result.showName.map(res => {
        colum.push({
          title: res.name,
          dataIndex: res.id,
          editable: true,
          render: (name, record) => {
            // console.log(record)
            return record[res.id] == 0 ? (
              <IconFont type="icon-correct" />
            ) : record[res.id] == 1 ? (
              <IconFont type="icon-error" />
            ) : (
              record[res.id]
            );
          },
        });
      });

      resp.result.showName;
      this.setState({ colum, record });
    }
  }
  onSearch = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      const { createtime, endTime, ...props } = values;
      const data = {
        ...props,
        createtime: values.createtime ? values.createtime.format('YYYY-MM-DD HH:mm:ss') : '',

        endTime: values.endTime ? values.endTime.format('YYYY-MM-DD HH:mm:ss') : '',
      };
      this.getNewReports(data);
    });
  };

  onClear = () => {
    this.props.form.resetFields();
    this.getNewReports();
  };

  componentWillMount() {
    let data = {
      // startTime: moment().format('YYYY-MM-DD 00:00:00'),
      // endTime: moment().format('YYYY-MM-DD 23:59:59'),
      startTime: '2019-11-01 00:00:00',
      endTime: '2019-11-30 23:59:59',
    };
    // console.log(data)
    this.getNewReports(data);
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
    records = records.map((item, index) => {
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
                    initialValue: moment('2019-11-01 00:00:00'),
                  })(<DatePicker showTime={true} placeholder="请选择开始时间" />)}
                </FormItem>
                <FormItem label="结束时间">
                  {getFieldDecorator('endTime', {
                    initialValue: moment('2019-11-30 23:59:59'),
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
            columns={this.state.colum}
            data={this.state.record}
            total={total}
            showEdit={false}
          />
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

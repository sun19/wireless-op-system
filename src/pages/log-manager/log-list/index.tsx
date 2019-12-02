/**
 * title: 应用 > 日志列表
 */
import React from 'react';
import { Layout, Form, message, Row, Col, DatePicker, Button, Icon } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import * as _ from 'lodash';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';
import { UmiComponentProps } from '@/common/type';
import { getLogList, exportLogList } from '../services';
import { GetLogListParams } from '../services/index.interface';

import styles from './index.less';
import publicStyles from '../index.less';

const { Content } = Layout;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});

const columns = [
  // {
  //   title: '序号',
  //   dataIndex: 'id',
  //   width: '10%',
  //   editable: false,
  // },
  {
    title: '操作模块',
    dataIndex: 'menuName',
    editable: true,
  },
  {
    title: '操作用户',
    dataIndex: 'userId',
    editable: true,
  },
  {
    title: '角色',
    dataIndex: 'roleId',
    className: 'select_text',
    editable: true,
  },
  {
    title: '操作时间',
    dataIndex: 'operationTime',
    editable: true,
  },
  {
    title: '描述',
    dataIndex: 'remark',
    editable: true,
  },
];

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps;

interface State {
  time: any[];
  dateStrings: string[];
}

class LogList extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      time: [],
      dateStrings: [],
    };
    this.getLogList = this.getLogList.bind(this);
    this.exportLogs = this.exportLogs.bind(this);
  }

  async getLogList(params: GetLogListParams = {}) {
    const resp = await getLogList(params);
    this.props.dispatch({
      type: 'logManager/update',
      payload: {
        logList: resp.result,
      },
    });
  }

  componentDidMount() {
    this.getLogList();
  }
  componentWillUnmount() {
    message.destroy();
  }
  onRangePickerChange = (dates, dateStrings) => {
    this.setState({
      time: dates,
      dateStrings: dateStrings,
    });
  };
  onRangePickerOK = () => {
    const { dateStrings } = this.state;
    if (dateStrings.length == 0) {
      message.warn('请选择时间');
      return;
    }
    this.getLogList({
      startTime: dateStrings[0],
      endTime: dateStrings[1],
    });
  };

  onResetLogList = () => {
    this.setState({
      time: [],
      dateStrings: [],
    });
    this.forceUpdate(() => {
      this.getLogList();
    });
  };
  async exportLogs() {
    const resp = await exportLogList();
    if (resp) {
      message.success('导出成功');
    }
  }

  render() {
    let { logList } = this.props;
    if (_.isEmpty(logList)) {
      logList = {
        records: [],
        total: 0,
      };
    }
    let { records, total } = logList;
    records = records.map((item, index) => {
      return _.assign(item, { key: item.id || index });
    });
    return (
      <div className={publicStyles.public_hight}>
        <Content className={publicStyles.bg}>
          <div className={styles.public_hight_40}>
            <Form layout="inline">
              <Row
                // type="flex"
                justify="start"
                align="middle"
                style={{ paddingLeft: '39px' }}
                gutter={16}
              >
                <span className={publicStyles.authInner} style={{ paddingLeft: '39px' }}>
                  操作时间
                  <RangePicker
                    showTime={{ format: 'HH:mm:ss' }}
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder={['开始时间', '结束时间']}
                    onChange={this.onRangePickerChange}
                    onOk={this.onRangePickerOK}
                    value={this.state.time}
                  />
                </span>
                <span className={publicStyles.button_type}>
                  <Button
                    className={publicStyles.form_btn}
                    style={{ marginLeft: 30 }}
                    onClick={this.onRangePickerOK}
                  >
                    查询
                  </Button>
                  <Button
                    className={publicStyles.form_btn}
                    style={{ marginLeft: 30 }}
                    onClick={this.onResetLogList}
                  >
                    清空
                  </Button>
                </span>
                <span className={[`${publicStyles.form_btns}`].join(' ')}>
                  <span
                    className={[`${publicStyles.form_btn_add}`].join('')}
                    onClick={this.exportLogs}
                  >
                    <IconFont type="icon-upload-light" />
                  </span>
                </span>
              </Row>
            </Form>
          </div>
          <MainContent columns={columns} data={records} total={total} />
        </Content>
      </div>
    );
  }
}

const mapState = ({ logManager }) => {
  const resp = logManager.logList;
  return {
    logList: resp,
  };
};

export default connect(mapState)(LogList);

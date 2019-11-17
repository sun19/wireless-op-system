/**
 * title: 日志管理
 */
import React from 'react';
import { Layout, Form, Input, Row, Col, DatePicker, Button, Icon } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import * as _ from 'lodash';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';
import { UmiComponentProps } from '@/common/type';
import { getLogList } from '../services';
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
      time: [moment('2019-11-11 14:36:31'), moment('2019-11-11 14:36:31')],
      dateStrings: ['2019-11-11 14:36:31', '2019-11-11 14:36:31'],
    };
    this.getLogList = this.getLogList.bind(this);
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
  onRangePickerChange = (dates, dateStrings) => {
    this.setState({
      time: dates,
      dateStrings: dateStrings,
    });
  };
  onRangePickerOK = () => {
    const { dateStrings } = this.state;
    this.getLogList({
      createTime: dateStrings[0],
      updateTime: dateStrings[1],
    });
  };

  onResetLogList = () => {
    this.forceUpdate(() => {
      this.getLogList();
    });
  };

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

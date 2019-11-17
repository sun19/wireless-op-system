/**
 * title: 日志管理
 */
import React from 'react';
import { Layout, Form, Input, Row, Col, TimePicker, Button, Icon } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';
import { UmiComponentProps } from '@/common/type';
import styles from './index.less';
import publicStyles from '../index.less';

const { Content } = Layout;
const FormItem = Form.Item;

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

class LogList extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  async getLogList() {}
  render() {
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
                  <span className={publicStyles.timePicker}>
                    <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} />
                  </span>
                  <span className={publicStyles.timePicker}>-</span>
                  <span className={publicStyles.timePicker}>
                    <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} />
                  </span>
                </span>
                <span className={publicStyles.button_type}>
                  <Button className={publicStyles.form_btn} style={{ marginLeft: 30 }}>
                    查询
                  </Button>
                  <Button className={publicStyles.form_btn} style={{ marginLeft: 30 }}>
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
            updateData={this.updateData}
            deleteColumn={this.deleteColumn}
          />
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

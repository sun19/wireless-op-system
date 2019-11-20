/**
 * title: 巡检线设置
 */
import React from 'react';
import { Layout, Modal, Form, Input, Row, Col, Select, Button, Icon } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import * as _ from 'lodash';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';
import { UmiComponentProps } from '@/common/type';
import { getPollingLineByName, updatePollingLine, deletePollingLine } from '../services';
import { GetPollingLineByNameParams } from '../services/index.interface';
import styles from './index.less';
import publicStyles from '../index.less';

const { confirm } = Modal;
const { Content } = Layout;
const FormItem = Form.Item;
const { Option } = Select;
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
    title: '地图名称',
    dataIndex: 'mapName',
    editable: true,
  },
  {
    title: '巡检名称',
    dataIndex: 'name',
    editable: true,
  },
  {
    title: '信息牌',
    dataIndex: 'informationBoardId',
    editable: true,
  },
  {
    title: '巡检路线',
    dataIndex: 'inspectionRoute',
    editable: true,
  },
  {
    title: '巡检开始时间',
    dataIndex: 'startTime',
    editable: true,
  },
  {
    title: '巡检结束时间',
    dataIndex: 'endTime',
    editable: true,
  },
  {
    title: '告警方式',
    dataIndex: 'alarmName',
    className: 'select_text',
    editable: true,
  },

  {
    title: '重复类型',
    dataIndex: 'repeatType',
    className: 'select_text',
    editable: true,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    editable: true,
  },
];

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps;

interface State {
  pollingPointName: string;
}

class PollingLine extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.getPollingLines = this.getPollingLines.bind(this);
    this.updateData = this.updateData.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
    this.state = {
      pollingPointName: '',
    };
  }
  addPollingLine = () => {
    router.push('/map-manager/polling-line/add');
  };

  async getPollingLines(params: GetPollingLineByNameParams = {}) {
    const resp = await getPollingLineByName(params);
    if (resp) {
      this.props.dispatch({
        type: 'mapManager/update',
        payload: {
          pollingLines: resp.result,
        },
      });
    }
  }

  async updateData(data, item) {
    const resp = await updatePollingLine(item);
    if (resp) {
      this.props.dispatch({
        type: 'mapManager/update',
        payload: { pollingLines: { records: data } },
      });
    }
  }

  deleteColumn(item) {
    //TODO:修改人ID
    let self = this
    confirm({
      title: '确定要删除这条信息吗？',
      content: '',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        await deletePollingLine({ id: item.id });
        //重新请求数据重绘
        self.getPollingLines();
      },
      onCancel() {
      },
    })
  }

  onInputValueChange = e => {
    this.setState({
      pollingPointName: e.target.value,
    });
  };

  onSearch = () => {
    const { pollingPointName } = this.state;
    this.getPollingLines({
      name: pollingPointName,
    });
  };

  onClear = () => {
    this.setState({ pollingPointName: '' });
    this.forceUpdate(() => this.onSearch());
  };

  async componentDidMount() {
    await this.getPollingLines();
  }

  render() {
    const { pollingLines } = this.props;
    if (_.isEmpty(pollingLines)) return null;
    let { records, total } = pollingLines;
    records = records.map(item => {
      return _.assign(item, { key: item.id });
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
                <FormItem label="巡检点名称">
                  <Input
                    className={publicStyles.input_text}
                    placeholder="请输入巡检点名称"
                    value={this.state.pollingPointName}
                    onChange={this.onInputValueChange}
                  />
                </FormItem>

                <span className={publicStyles.button_type}>
                  <Button className={publicStyles.form_btn} onClick={this.onSearch}>
                    查询
                  </Button>
                  <Button className={publicStyles.form_btn} style={{ marginLeft: 37 }}>
                    清空
                  </Button>
                </span>
                <span className={[`${publicStyles.form_btns}`].join(' ')}>
                  <span
                    className={[`${publicStyles.form_btn_add}`].join('')}
                    onClick={this.addPollingLine}
                  >
                    <IconFont type="icon-plus" />
                  </span>
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
            showEdit={true}
          />
        </Content>
      </div>
    );
  }
}

const mapState = ({ mapManager }) => {
  const resp = mapManager.pollingLines;
  return {
    pollingLines: resp,
  };
};

export default connect(mapState)(PollingLine);

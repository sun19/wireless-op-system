/**
 * title: 设置 > 值班员设置 > 巡检点设置
 */
import React from 'react';
import { Layout, Modal, Form, Input, Row, Col, Select, Button, Icon } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import * as _ from 'lodash';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';
import { UmiComponentProps } from '@/common/type';
import { getPollingPointByName, updatePollingPoint, deletePollingPoint } from '../services';
import { GetPollingPointByNameParams } from '../services/index.interface';
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
    title: '巡检点名称',
    dataIndex: 'name',
    editable: true,
  },
  {
    title: '巡检点位置',
    dataIndex: 'address',
    editable: true,
  },
  {
    title: 'x坐标',
    dataIndex: 'xcoordinate',
    editable: true,
  },
  {
    title: 'y坐标',
    dataIndex: 'ycoordinate',
    editable: true,
  },
  {
    title: '巡检开始时间',
    width: '20%',
    dataIndex: 'startTime',
    editable: true,
    render:(item)=>{
      return <span className={publicStyles.time_start_bac}>{item ? item : '/'}</span>
    }
  },
  {
    title: '巡检结束时间',
    width: '20%',
    dataIndex: 'endTime',
    editable: true,
    render: (item) => {
      return <span className={publicStyles.time_end_bac}>{item ? item : '/'}</span>
    }
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
  name: string;
}

class PollingPoint extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.getPollingPoints = this.getPollingPoints.bind(this);
    this.updateData = this.updateData.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
    this.state = {
      name: '',
    };
  }
  addPollingPoint = () => {
    router.push('/map-manager/polling-point/add');
  };

  async getPollingPoints(params: GetPollingPointByNameParams = {}) {
    const resp = await getPollingPointByName(params);
    if (resp) {
      this.props.dispatch({
        type: 'mapManager/update',
        payload: {
          pollingPoints: resp.result,
        },
      });
    }
  }

  async updateData(data, item) {
    this.props.dispatch({
      type: 'mapManager/update',
      payload: {
        pollingPointsRecord: data,
      },
    });
    router.push('/map-manager/polling-point/edit');
  }

  deleteColumn(item) {
    //TODO:修改人ID

    let self = this;
    confirm({
      title: '确定要删除这条信息吗？',
      content: '',
      okText: '取消',
      okType: 'danger',
      cancelText: '确定',
      onOk() { },
      async onCancel() {
        let data = {
          id: item.id,
        };
        await deletePollingPoint({ id: item.id });
        //重新请求数据重绘
        self.getPollingPoints();
      },
    
    });
  }

  onInputNameChange = e => {
    this.setState({
      name: e.target.value,
    });
  };

  onSearch = () => {
    const { name } = this.state;
    this.getPollingPoints({
      name,
    });
  };

  onClear = () => {
    this.setState({
      name: '',
    });
    this.forceUpdate(() => this.onSearch());
  };

  componentDidMount() {
    this.getPollingPoints();
  }

  render() {
    let { pollingPoints } = this.props;
    if (_.isEmpty(pollingPoints)) {
      pollingPoints = {
        records: [],
        total: 0,
      };
    }
    let { records, total } = pollingPoints;
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
                    value={this.state.name}
                    onChange={this.onInputNameChange}
                  />
                </FormItem>

                <span className={publicStyles.button_type}>
                  <Button className={publicStyles.form_btn} onClick={this.onSearch}>
                    查询
                  </Button>
                  <Button
                    className={publicStyles.form_btn}
                    style={{ marginLeft: 37 }}
                    onClick={this.onClear}
                  >
                    清空
                  </Button>
                </span>
                <span className={[`${publicStyles.form_btns}`].join(' ')}>
                  <span
                    className={[`${publicStyles.form_btn_add}`].join('')}
                    onClick={this.addPollingPoint}
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
  const resp = mapManager.pollingPoints;
  return {
    pollingPoints: resp,
  };
};

export default connect(mapState)(PollingPoint);

/**
 * title: 巡检点设置
 */
import React from 'react';
import { Layout, Form, Input, Row, Col, Select, Button, Icon } from 'antd';
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
    dataIndex: 'xCoordinate',
    editable: true,
  },
  {
    title: 'y坐标',
    dataIndex: 'yCoordinate',
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
    const resp = await updatePollingPoint(item);
    if (resp) {
      this.props.dispatch({
        type: 'mapManager/update',
        payload: { pollingPoints: { records: data } },
      });
    }
  }

  async deleteColumn(item) {
    //TODO:修改人ID
    await deletePollingPoint({ id: item.id });
    //重新请求数据重绘
    this.getPollingPoints();
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
    const { pollingPoints } = this.props;
    if (_.isEmpty(pollingPoints)) return null;
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

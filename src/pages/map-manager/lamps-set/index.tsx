/**
 * title: 灯具设置
 */
import React from 'react';
import { Layout, Form, Input, Row, Col, Select, Button, Icon } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import * as _ from 'lodash';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';
import { UmiComponentProps } from '@/common/type';
import { getMapLamps, addMapLamps, updateMapLamps, deleteMapLamps } from '../services';
import { getAllArea } from '@/pages/login/login.service';
import { GetMapLampsParams } from '../services/index.interface';
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
    title: '灯具编号',
    dataIndex: 'lampCode',
    editable: true,
  },
  {
    title: '型号',
    dataIndex: 'model',
    editable: true,
  },
  {
    title: '横坐标',
    dataIndex: 'xCoordinate',
    editable: true,
  },
  {
    title: '纵坐标',
    dataIndex: 'yCoordinate',
    editable: true,
  },
  {
    title: '所属区域',
    dataIndex: 'regionalName',
    editable: true,
  },
  {
    title: '出入口',
    dataIndex: 'entranceExit',
    editable: true,
  },

  {
    title: '出入口顺序',
    dataIndex: 'sort',
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
  lampInputValue: string;
  areaSelectValue?: string;
}

class LampsSettings extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.getAllMapLamps = this.getAllMapLamps.bind(this);
    this.updateData = this.updateData.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
    this.state = {
      lampInputValue: '',
      areaSelectValue: '',
    };
  }
  addUser = () => {
    router.push('/map-manager/lamps-set/add');
  };

  async getAllMapLamps(params: GetMapLampsParams = {}) {
    const resp = await getMapLamps(params);
    this.props.dispatch({
      type: 'mapManager/update',
      payload: {
        lamps: resp.result,
      },
    });
  }

  async updateData(data, item) {
    const resp = await updateMapLamps(item);
    if (resp) {
      this.props.dispatch({
        type: 'mapManager/update',
        payload: { lamps: { records: data } },
      });
    }
  }

  async deleteColumn(item) {
    //TODO:修改人ID
    await deleteMapLamps({ id: item.id });
    //重新请求数据重绘
    this.getAllMapLamps();
  }

  setupMapArea = () => {
    const { allAreas } = this.props;
    return (
      <Select
        className={publicStyles.select_text}
        defaultValue={allAreas[0].name}
        onSelect={this.onMapSelectChange}
      >
        {allAreas.map((area, index) => (
          <Option value={area.id} key={area.id || index}>
            {area.name}
          </Option>
        ))}
      </Select>
    );
  };

  onMapSelectChange = value => {
    this.setState({
      areaSelectValue: value,
    });
  };

  onInputChange = e => {
    this.setState({
      lampInputValue: e.target.value,
    });
  };

  onSearch = () => {
    const { lampInputValue, areaSelectValue } = this.state;
    this.getAllMapLamps({
      regionalId: areaSelectValue,
      lampCode: lampInputValue,
    });
  };

  onClear = () => {
    this.setState({
      lampInputValue: '',
      areaSelectValue: '',
    });
    this.forceUpdate(() => {
      this.onSearch();
    });
  };

  async componentDidMount() {
    await this.getAllMapLamps();
    const allAreas = await getAllArea();
    this.props.dispatch({
      type: 'commonState/update',
      payload: {
        allAreas: allAreas.result,
      },
    });
  }

  render() {
    const { lamps, allAreas } = this.props;
    if (_.isEmpty(lamps) || _.isEmpty(allAreas)) return null;
    let { records, total } = lamps;
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
                <FormItem label="编号">
                  <Input
                    className={publicStyles.input_text}
                    placeholder="请输入编号"
                    value={this.state.lampInputValue}
                    onChange={this.onInputChange}
                  />
                </FormItem>
                <FormItem label="区域">
                  <div style={{ marginTop: '-3px' }}>{this.setupMapArea()}</div>
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
                    onClick={this.addUser}
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
          />
        </Content>
      </div>
    );
  }
}

const mapState = ({ mapManager, commonState }) => {
  const resp = mapManager.lamps;
  const allAreas = commonState.allAreas;
  return {
    lamps: resp,
    allAreas,
  };
};

export default connect(mapState)(LampsSettings);

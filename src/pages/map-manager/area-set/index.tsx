/**
 * title: 区域设置
 */
import React from 'react';
import { Layout, Form, Input, Row, Col, Select, Button, Icon, message } from 'antd';
import { connect } from 'dva';
import * as _ from 'lodash';
import router from 'umi/router';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';
import { UmiComponentProps } from '@/common/type';
import { getMapArea, updateMapArea, deleteMapArea } from '../services';
import { getAllLevels } from '@/pages/login/login.service';
import { GetMapAreaParams } from '../services/index.interface';
import styles from './index.less';
import publicStyles from '../index.less';

const { Content } = Layout;
const FormItem = Form.Item;
const { Option } = Select;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    editable: false,
  },
  {
    title: '地图名称',
    dataIndex: 'mapName',
    editable: true,
  },
  {
    title: '区域名称',
    dataIndex: 'regionName',
    editable: true,
  },
  {
    title: '区域级别',
    dataIndex: 'regionalLevelName',
    editable: true,
  },
  {
    title: '操作时间',
    dataIndex: 'operatTime',
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
  area: string;
  level?: string;
}

class AreaSet extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.getMapArea = this.getMapArea.bind(this);
    this.updateData = this.updateData.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
    this.state = {
      area: '',
    };
  }

  async getMapArea(params: GetMapAreaParams = {}) {
    const resp = await getMapArea(params);
    this.props.dispatch({
      type: 'mapManager/update',
      payload: {
        mapArea: resp.result,
      },
    });
  }

  async updateData(data, item) {
    const resp = await updateMapArea(item);
    if (resp) {
      this.props.dispatch({
        type: 'userManager/update',
        payload: { innerUserList: { records: data } },
      });
    }
  }

  async deleteColumn(item) {
    //TODO:修改人ID
    await deleteMapArea({ id: item.id });
    //重新请求数据重绘
    this.getMapArea();
  }

  setupAreaLevelSelect = () => {
    const { areaLevels } = this.props;
    return (
      <Select
        className={publicStyles.select_text}
        defaultValue={areaLevels[0].name}
        onSelect={this.onLevelSelectChange}
      >
        {areaLevels.map((level, index) => (
          <Option value={level.id} key={index}>
            {level.name}
          </Option>
        ))}
      </Select>
    );
  };
  onAreaInputChange = e => {
    this.setState({
      area: e.target.value,
    });
  };

  onLevelSelectChange = value => {
    this.setState({
      level: value,
    });
  };

  onSearch = () => {
    const { area, level } = this.state;
    this.getMapArea({
      regionName: area,
      regionalLevelId: level,
    });
  };

  onClear = () => {
    this.setState({
      level: '',
      area: '',
    });
    this.getMapArea();
  };
  addMapArea = () => {
    message.success('待开发...');
    // router.push('/map-manager/area-set');
  };

  async componentDidMount() {
    this.getMapArea();
    const levels = await getAllLevels();
    this.props.dispatch({
      type: 'commonState/update',
      payload: {
        allLevels: levels.result,
      },
    });
    this.setState({
      level: this.props.areaLevels[0].id,
    });
  }

  render() {
    const { mapArea, areaLevels } = this.props;
    if (_.isEmpty(mapArea) || _.isEmpty(areaLevels)) return null;
    let { records, total } = mapArea;
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
                <FormItem label="区域">
                  <Input
                    className={publicStyles.input_text}
                    placeholder="请输入区域"
                    value={this.state.area}
                    onChange={this.onAreaInputChange}
                  />
                </FormItem>
                <FormItem label="级别">
                  <div
                    style={{ marginTop: '-3px' }}
                    // className={publicStyles.selection}
                  >
                    {this.setupAreaLevelSelect()}
                  </div>
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
                  <span className={[`${publicStyles.form_btn_add}`].join('')}>
                    <IconFont type="icon-plus" onClick={this.addMapArea} />
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

const mapState = ({ mapManager, commonState }) => {
  const resp = mapManager.mapArea;
  const areaLevels = commonState.allLevels;
  return {
    mapArea: resp,
    areaLevels,
  };
};

export default connect(mapState)(AreaSet);

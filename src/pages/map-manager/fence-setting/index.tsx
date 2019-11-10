/**
 * title: 电子围栏设置
 */
import React from 'react';
import { Layout, Form, Input, Row, Col, Select, Button, Icon } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import * as _ from 'lodash';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';
import { UmiComponentProps } from '@/common/type';
import {
  addMapFencingArea,
  addMapFencingConnectUser,
  deleteFencingArea,
  queryFencingArea,
  updateFencingArea,
} from '../services';
import { QueryFencingAreaParams } from '../services/index.interface';
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
    title: '地图名称',
    dataIndex: 'name',
    editable: true,
  },
  {
    title: '围栏名称',
    dataIndex: 'cardNo',
    editable: true,
  },
  {
    title: '围栏类型',
    dataIndex: 'sex',
    editable: true,
  },
  {
    title: '是否永久',
    dataIndex: 'address',
    editable: true,
  },
  {
    title: '生效时间',
    dataIndex: 'phone',
    editable: true,
  },
  {
    title: '失效时间',
    dataIndex: 'departmentName',
    editable: true,
  },
  {
    title: '级别',
    dataIndex: 'positionName',
    editable: true,
  },

  {
    title: '关联人员',
    dataIndex: 'securityLevelName',
    editable: true,
  },
  {
    title: '最大人员数量',
    dataIndex: 'informationBoardName',
    editable: true,
  },
  {
    title: '区域',
    dataIndex: 'entryTime',
    editable: true,
  },
];

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps;

class FencingSettings extends React.Component<Props> {
  constructor(props: any) {
    super(props);
    this.getMapFencing = this.getMapFencing.bind(this);
    this.updateData = this.updateData.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
  }
  addUser = () => {
    router.push('/map-manager/fence-setting/add');
  };

  async getMapFencing(params: QueryFencingAreaParams = {}) {
    const resp = await queryFencingArea(params);
    if (resp) {
      this.props.dispatch({
        type: 'mapManager/update',
        payload: {
          mapFencing: resp.result,
        },
      });
    }
  }

  async updateData(data, item) {
    const resp = await updateFencingArea(item);
    if (resp) {
      this.props.dispatch({
        type: 'userManager/update',
        payload: { innerUserList: { records: data } },
      });
    }
  }

  async deleteColumn(item) {
    //TODO:修改人ID
    await deleteFencingArea({ id: item.id });
    //重新请求数据重绘
    this.getMapFencing();
  }

  componentDidMount() {
    this.getMapFencing();
  }

  render() {
    let { mapFencing } = this.props;
    if (_.isEmpty(mapFencing)) {
      mapFencing = {
        records: [],
        total: 0,
      };
    }
    let { records, total } = mapFencing;
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
                <FormItem label="围栏名称">
                  <Input className={publicStyles.input_text} placeholder="请输入姓名" />
                </FormItem>
                <FormItem label="围栏类型">
                  <div style={{ marginTop: '-3px' }}>
                    <Select className={publicStyles.select_text} defaultValue="lucy">
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                    </Select>
                  </div>
                </FormItem>

                <span className={publicStyles.button_type}>
                  <Button className={publicStyles.form_btn}>查询</Button>
                  <Button className={publicStyles.form_btn} style={{ marginLeft: 37 }}>
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

const mapState = ({ mapManager }) => {
  const resp = mapManager.mapFencing;
  return {
    mapFencing: resp,
  };
};

export default connect(mapState)(FencingSettings);

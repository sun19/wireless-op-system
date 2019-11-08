import React from 'react';
import { Layout, Form, Input, Row, Col, Select, Button, Icon } from 'antd';
import { connect } from 'dva';
import * as _ from 'lodash';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';
import { UmiComponentProps } from '@/common/type';
import { getMapArea } from '../services';
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
    title: '区域级别',
    dataIndex: 'regionakLevelName',
    editable: true,
  },
  {
    title: '区域名称',
    dataIndex: 'regionName',
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

class AreaSet extends React.Component<Props> {
  constructor(props: any) {
    super(props);
    this.getMapArea = this.getMapArea.bind(this);
    this.updateData = this.updateData.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
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
    const resp = await updateUser(item);
    if (resp) {
      this.props.dispatch({
        type: 'userManager/update',
        payload: { innerUserList: { records: data } },
      });
    }
  }

  async deleteColumn(item) {
    //TODO:修改人ID
    await deleteUser({ id: item.id });
    //重新请求数据重绘
    this.getUserList();
  }

  render() {
    const { mapArea } = this.props;
    if (_.isEmpty(mapArea)) return null;
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
                  <Input className={publicStyles.input_text} placeholder="请输入姓名" />
                </FormItem>
                <FormItem label="级别">
                  <div
                    style={{ marginTop: '-3px' }}
                    // className={publicStyles.selection}
                  >
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
                  <span className={[`${publicStyles.form_btn_add}`].join('')}>
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
  const resp = mapManager.mapArea;
  return {
    mapArea: resp,
  };
};

export default connect(mapState)(AreaSet);

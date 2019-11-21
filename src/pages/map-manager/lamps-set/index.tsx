/**
 * title: 灯具设置
 */
import React from 'react';
import { Layout, Form, Input, Row, Col, Select, Button, Icon, message, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
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
type Props = StateProps & UmiComponentProps & FormComponentProps;

class LampsSettings extends React.Component<Props> {
  constructor(props: any) {
    super(props);
    this.getAllMapLamps = this.getAllMapLamps.bind(this);
    this.updateData = this.updateData.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
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

  deleteColumn(item) {
    //TODO:修改人ID
    let self = this;
    confirm({
      title: '确定要删除这条信息吗？',
      content: '',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        await deleteMapLamps({ id: item.id });
        //重新请求数据重绘
        self.getAllMapLamps();
      },
      onCancel() {},
    });
  }

  setupMapArea = () => {
    let { allAreas } = this.props;
    const { getFieldDecorator } = this.props.form;
    if (_.isEmpty(allAreas)) {
      allAreas = [];
    }
    return getFieldDecorator('regionalId', { rules: [] })(
      <Select className={publicStyles.select_text}>
        {allAreas.map((area, index) => (
          <Option value={area.id} key={area.id}>
            {area.name}
          </Option>
        ))}
      </Select>,
    );
  };

  onClear = () => {
    this.props.form.resetFields();
    this.getAllMapLamps();
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

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        message.error(err);
        return;
      }
      this.getAllMapLamps(values);
    });
  };

  render() {
    let { lamps, allAreas } = this.props;
    const { getFieldDecorator } = this.props.form;
    if (_.isEmpty(lamps) || _.isEmpty(allAreas)) {
      lamps = {
        records: [],
        total: 0,
      };
    }
    let { records, total } = lamps;
    records = records.map((item, index) => {
      return _.assign(item, { key: item.id || index });
    });
    return (
      <div className={publicStyles.public_hight}>
        <Content className={publicStyles.bg}>
          <div className={styles.public_hight_40}>
            <Form layout="inline" onSubmit={this.onSubmit}>
              <Row
                // type="flex"
                justify="start"
                align="middle"
                style={{ paddingLeft: '39px' }}
                gutter={16}
              >
                <FormItem label="编号">
                  {getFieldDecorator('lampCode', { rules: [] })(
                    <Input className={publicStyles.input_text} placeholder="请输入编号" />,
                  )}
                </FormItem>
                <FormItem label="区域">
                  <div style={{ marginTop: '-3px' }}>{this.setupMapArea()}</div>
                </FormItem>

                <span className={publicStyles.button_type}>
                  <Button className={publicStyles.form_btn} htmlType="submit">
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
            showEdit={true}
          />
        </Content>
      </div>
    );
  }
}

const LampsSettingsHOC = Form.create<Props>({ name: 'lamp_setting' })(LampsSettings);

const mapState = ({ mapManager, commonState }) => {
  const resp = mapManager.lamps;
  const allAreas = commonState.allAreas;
  return {
    lamps: resp,
    allAreas,
  };
};

export default connect(mapState)(LampsSettingsHOC);

/**
 * title: 设置 > 系统管理员设置 > 电子围栏设置
 */
import React from 'react';
import { Layout, Form, Input, Row, Col, Select, Tooltip, Button, Icon, message, Modal } from 'antd';
import router from 'umi/router';
import { FormComponentProps } from 'antd/lib/form';
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
import { getAllFencingTypes } from '@/pages/login/login.service';
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
  {
    title: '地图名称',
    dataIndex: 'mapName',
    editable: true,
  },
  {
    title: '围栏名称',
    dataIndex: 'name',
    editable: true,
  },
  {
    title: '围栏类型',
    dataIndex: 'type',
    editable: true,
  },
  {
    title: '是否永久',
    dataIndex: 'isForever',
    editable: true,
    render(value) {
      return value == '0' ? '是' : '否';
    },
  },
  {
    title: '生效时间',
    dataIndex: 'effectiveTime',
    editable: true,
    // ellipsis: true,
    // onCell: () => {
    //   return {
    //     style: {
    //       // maxWidth: 150,
    //       overflow: 'hidden',
    //       whiteSpace: 'nowrap',
    //       textOverflow: 'ellipsis',
    //       cursor: 'pointer'
    //     }
    //   }
    // },
    // render: (text) => <Tooltip className='tooltips' placement="topLeft" title={text}>{text}</Tooltip>,
  },
  {
    title: '失效时间',
    dataIndex: 'failureTime',
    editable: true,
    // ellipsis: true,
    // onCell: () => {
    //   return {
    //     style: {
    //       // maxWidth: 150,
    //       overflow: 'hidden',
    //       whiteSpace: 'nowrap',
    //       textOverflow: 'ellipsis',
    //       cursor: 'pointer'
    //     }
    //   }
    // },
    // render: (text) => <Tooltip className='tooltips' placement="topLeft" title={text}>{text}</Tooltip>,
  },
  {
    title: '级别',
    dataIndex: 'levelName',
    editable: true,
  },

  {
    title: '关联人员',
    dataIndex: 'userName',
    editable: true,
    render(values = []) {
      return <span>{values.join('，')}</span>;
    },
  },
  {
    title: '最大人员数量',
    dataIndex: 'maxUser',
    editable: true,
  },
  {
    title: '区域',
    dataIndex: 'regionalName',
    editable: true,
  },
];

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormComponentProps;

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
    this.props.dispatch({
      type: 'mapManager/update',
      payload: {
        fencingTypesRecord: data,
      },
    });
    router.push('/map-manager/fence-setting/edit');
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
        let data = {
          id: item.id,
        };
        await deleteFencingArea({ id: item.id });
        //重新请求数据重绘
        self.getMapFencing();
      },
      onCancel() {},
    });
  }

  async componentDidMount() {
    this.getMapFencing();
    const fencingTypes = await getAllFencingTypes();
    this.props.dispatch({
      type: 'mapManager/update',
      payload: {
        fencingTypes: fencingTypes.result,
      },
    });
  }
  componentWillUnmount() {
    message.destroy();
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        message.error(err);
        return;
      }
      await this.getMapFencing(values);
    });
  };
  onClear = () => {
    this.props.form.resetFields();
    this.getMapFencing();
  };

  render() {
    let { mapFencing, fencingTypes } = this.props;
    const { getFieldDecorator } = this.props.form;
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
            <Form layout="inline" onSubmit={this.onSubmit}>
              <Row
                // type="flex"
                justify="start"
                align="middle"
                style={{ paddingLeft: '39px' }}
                gutter={16}
              >
                <FormItem label="围栏名称">
                  {getFieldDecorator('name', {
                    rules: [],
                  })(<Input className={publicStyles.input_text} placeholder="请输入围栏名称" />)}
                </FormItem>
                <FormItem label="围栏类型">
                  <div style={{ marginTop: '-3px' }}>
                    {getFieldDecorator('typeId', {
                      rules: [],
                    })(
                      <Select className={publicStyles.select_text}>
                        {fencingTypes.map(item => (
                          <Option key={item.name} value={item.name}>
                            {item.name}
                          </Option>
                        ))}
                      </Select>,
                    )}
                  </div>
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

const FencingSettingHOC = Form.create<Props>({ name: 'fencing_setting' })(FencingSettings);

const mapState = ({ mapManager }) => {
  const resp = mapManager.mapFencing;
  return {
    mapFencing: resp,
    fencingTypes: mapManager.fencingTypes,
  };
};

export default connect(mapState)(FencingSettingHOC);

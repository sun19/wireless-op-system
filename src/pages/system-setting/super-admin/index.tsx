/**
 * title: 设置 > 超级管理员设置
 */
import React from 'react'; 
import { Layout, Modal, Form, Input, Row, Col, Select, Button, Icon, Divider, message } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import * as _ from 'lodash';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';
import { UmiComponentProps } from '@/common/type';
import { getSuperAdminList, updateSuperAdmin, deleteSuperAdmin } from '../services';
import { GetSuperAdminListParams } from '../services/index.interfaces';
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
  //   width: '20%',
  //   editable: false,
  // },
  {
    title: '键值',
    dataIndex: 'dictValue',
    // width: '15%',
    editable: true,
  },
  {
    title: '标签',
    dataIndex: 'dictName',
    // width: '25%',
    editable: true,
  },
  {
    title: '类型',
    dataIndex: 'type',
    // width: '15%',
    className: 'select_text',
    editable: true,
    // render: (name, record) => {
    //   return (
    //     <div>
    //       <Select defaultValue={record.type} style={{ width: 120 }} disabled >
    //         <Option value="1"> 男</Option>
    //         <Option value="2"> 女</Option>
    //       </Select >
    //     </div >
    //   );
    // }
  },
  {
    title: '描述',
    dataIndex: 'remark',
    // width: '20%',
    editable: true,
  },
  {
    title: '排序',
    dataIndex: 'sort',
    // width: '10%',
    editable: true,
  },
  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (text, record) => (
  //     <span>
  //       <a>Invite {record.name}</a>
  //       <Divider type="vertical" />
  //       <a>Delete</a>
  //     </span>
  //   ),
  // },
];

type AdminTypes = typeof staticTypes;

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps;
interface State {
  type: string;
  remark: string;
}

const staticTypes = [
  { label: 'lucy', value: 'lucy' },
  { label: 'jack', value: 'jack' },
];

class SuperAdmin extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.getSuperAdminList = this.getSuperAdminList.bind(this);
    this.updateData = this.updateData.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
    this.state = {
      type: '',
      remark: '',
    };
  }

  async getSuperAdminList(params: GetSuperAdminListParams = {}) {
    const superAdmins = await getSuperAdminList(_.assign({}, params));
    this.props.dispatch({
      type: 'systemSetting/update',
      payload: {
        superAdmin: superAdmins,
      },
    });
  }

  async updateData(data, item) {
    //TODO:修改接口有问题
    const resp = await updateSuperAdmin(item);
    if (resp) {
      this.props.dispatch({
        type: 'systemSetting/update',
        payload: { superAdmin: { records: data } },
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
        await deleteSuperAdmin({ id: item.id });
        //重新请求数据重绘
        self.getSuperAdminList();
      },
      onCancel() {},
    });
  }

  onRemarkChange = e => {
    this.setState({ remark: e.target.value });
  };
  onTypeChange = e => {
    this.setState({
      type: e.target.value,
    });
  };

  onClear = () => {
    this.setState({ type:'', remark: '' });
    this.getSuperAdminList();
  };

  onSearchSubmit = () => {
    const { remark, type } = this.state;
    this.getSuperAdminList({
      type,
      remark,
    });
  };

  onUploadTemp = () => {
    message.success('模板导入成功');
  };

  addSuperAdmin = () => {
    message.success('功能暂未开发');
    // router.push('/system-setting/super-admin/add');
  };
  componentDidMount() {
    this.getSuperAdminList();
  }
  componentwillUnmount() {
    message.destroy();
  }

  // renderTypeOptions = () => {
  //   return (
  //     <Select className={publicStyles.select_text} defaultValue={this.state.type[0].value}>
  //       {this.state.type.map(item => (
  //         <Option value={item.value} key={item.value}>
  //           {item.label}
  //         </Option>
  //       ))}
  //     </Select>
  //   );
  // };

  render() {
    let { superAdmin } = this.props;
    if (_.isEmpty(superAdmin)) {
      superAdmin = {
        records: [],
        total: 0,
      };
    }
    let { records, total } = superAdmin;
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
                <FormItem label="类型">
                  {/* <div
                    style={{ marginTop: '-3px' }}
                  // className={publicStyles.selection}
                  > */}
                  {/* {this.renderTypeOptions()} */}
                  <Input
                    className={publicStyles.input_text}
                    placeholder="请输入类型"
                    value={this.state.type}
                    onChange={this.onTypeChange}
                  />
                  {/* </div> */}
                </FormItem>
                <FormItem label="描述">
                  <Input
                    className={publicStyles.input_text}
                    placeholder="请输入描述"
                    value={this.state.remark}
                    onChange={this.onRemarkChange}
                  />
                </FormItem>
                <span className={publicStyles.button_type}>
                  <Button className={publicStyles.form_btn} onClick={this.onSearchSubmit}>
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
                    onClick={this.onSearchSubmit}
                  >
                    <IconFont type="icon-search" />
                  </span>
                  <span
                    className={[`${publicStyles.form_btn_add}`].join('')}
                    onClick={this.addSuperAdmin}
                  >
                    <IconFont type="icon-plus" />
                  </span>
                  <span
                    className={[`${publicStyles.form_btn_add}`].join('')}
                    onClick={this.onUploadTemp}
                  >
                    <IconFont type="icon-download-simple" />
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

const mapState = ({ systemSetting }) => {
  const resp = systemSetting.superAdmin;
  return {
    superAdmin: resp,
  };
};

export default connect(mapState)(SuperAdmin);

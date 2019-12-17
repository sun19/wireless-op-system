/**
 * title: 应用 > 信息牌列表
 */
import React from 'react';
import { Layout, Modal, Form, Input, Row, message, Tag, Select, Tooltip, Button, Icon } from 'antd';
import router from 'umi/router';
import * as _ from 'lodash';
import { connect } from 'dva';

import { UmiComponentProps } from '@/common/type';
import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';
import { getInfoListParams, deleteInfo, exportIn, exportOut,cancellationInfo } from '../services';
import { getUserTypes } from '../../system-setting/services';
import { DeleteInfo,CancellationInfo } from '../services/index.interfaces';

import styles from './index.less';
import publicStyles from '../index.less';

const { confirm } = Modal;
const { Content } = Layout;
const FormItem = Form.Item;
const { Option } = Select;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});

type StateProps = ReturnType<typeof mapState>;

type Props = StateProps & UmiComponentProps;
const columns = [
  // {
  //   title: '序号',
  //   dataIndex: 'id',
  //   // width: '20%',
  //   editable: true,
  // },
  {
    title: '信息牌编号',
    dataIndex: 'name',
    editable: true,
    ellipsis: true,
    onCell: () => {
      return {
        style: {
          // maxWidth: 150,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer'
        }
      }
    },
    render: (text) => <Tooltip className='tooltips' placement="topLeft" title={text}>{text}</Tooltip>,
  },
  {
    title: '状态',
    dataIndex: 'onlineStatus',
    className: 'select_text',
    editable: true,
    render: (item) => {
      return ['在线', '离线'][item]
    }
  },
  {
    title: '注销状态',
    dataIndex: 'isCancel',
    className: 'select_text',
    editable: true,
    render: (item) => {
      return ['使用中', '注销'][item]
    }
  },
  
  {
    title: '定位',
    dataIndex: 'lampNumber',
    editable: true,
    ellipsis: true,
    onCell: () => {
      return {
        style: {
          // maxWidth: 150,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer'
        }
      }
    },
    render: (text) => <Tooltip className='tooltips' placement="topLeft" title={text}>{text}</Tooltip>,
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    editable: true,
  },
  {
    title: '职务',
    dataIndex: 'positionName',
    editable: true,
  },
  // {
  //   title: '身份证号',
  //   dataIndex: 'cardNo',
  //   editable: true,
  // },
  // {
  //   title: '性别',
  //   dataIndex: 'sex',
  //   editable: true,

  //   render: onlineStatus => {
  //     // let color = onlineStatus == 1 ? 'white' : '#EB6262';
  //     let values = onlineStatus == 1 ? '女' : '男';
  //     return <span> {values}</span>;
  //   },
  // },
  // {
  //   title: '家庭住址',
  //   dataIndex: 'address',
  //   editable: true,
  // },
  // {
  //   title: '联系方式',
  //   dataIndex: 'phone',
  //   editable: true,
  // ellipsis: true,
  //   onCell: () => {
  //     return {
  //       style: {
  //         // maxWidth: 150,
  //         overflow: 'hidden',
  //         whiteSpace: 'nowrap',
  //         textOverflow: 'ellipsis',
  //         cursor: 'pointer'
  //       }
  //     }
  //   },
  //   render: (text) => <Tooltip className='tooltips' placement="topLeft" title={text}>{text}</Tooltip>,
  // },
  {
    title: '部门',
    dataIndex: 'departmentName',
    className: 'select_text',
    editable: true,
  },
  {
    title: '类型',
    dataIndex: 'type',
    className: 'select_text',
    editable: true,
    render: (item) => {
      return ['内部', '外部'][item]
    }
  },
  {
    title: '保密等级',
    dataIndex: 'securityLevelName',
    key: 'securityLevelName',
    className: 'select_text',
    editable: true,

    render: (securityLevelName, current) => {
      let color = ['#f50', '#2db7f5', '#87d068', '#87d8'][+current.securityLevelId];
      return <Tag color={color}> {securityLevelName}</Tag>;
    },
  },
  {
    title: '在职状态',
    className: 'select_text',
    dataIndex: 'incumbency',
    editable: true,
    render: onlineStatus => {
      return ['在职', '离职'][onlineStatus];
    },
  },
];
interface State {
  userName: string;
  name: string;
  type: string;
  pageNo?: number;
  hasData: boolean;
}
class SuperAdmin extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
    this.cancellationColumn = this.cancellationColumn.bind(this);
    this.state = {
      userName: '',
      name: '',
      type: undefined,
      pageNo: 1,
      hasData: true,
    };
  }
  onNameChange = (e: any) => {
    this.setState({
      userName: e.target.value,
    });
  };
  infoNameChange = (e: any) => {
    this.setState({
      name: e.target.value,
    });
  };
  selectChange = (e: any) => {
    this.setState({
      type: e,
    });
  };
  clearAllInput = () => {
    this.setState({
      userName: '',
      name: '',
      type: '',
    });
    this.forceUpdate(() => {
      this.getInfoListData();
    });
  };

  onSearch = () => {
    this.getInfoListData();
  };
  addUser = () => {
    router.push('/info-card-manager/info-card-list/add');
  };
  deleteColumn(item: DeleteInfo) {
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
        await deleteInfo({ id: item.id });
        //重新请求数据重绘
        self.getInfoListData();
      },
    });
  }
  cancellationColumn(item: CancellationInfo) {
    //TODO:修改人ID
    // console.log(item.isCancel)
    let self = this;
    confirm({
      title: '确定要注销这条信息吗？',
      content: '',
      okText: '取消',
      okType: 'danger',
      cancelText: '确定',
      onOk() { },
      async onCancel() {
        await cancellationInfo({ 'id': item.id,'isCancel': item.isCancel==0?1:0  });
        //重新请求数据重绘
        self.getInfoListData();
      },
    });
  }





  async componentDidMount() {
    const peopleType = await getUserTypes({});
    this.props.dispatch({
      type: 'infoCardManager/update',
      payload: {
        peopleType: peopleType.result,
      },
    });
    await this.getInfoListData();
  }

  componentWillUnmount() {
    message.destroy();
  }

  async getInfoListData() {
    const { userName, name, type } = this.state;
    const infoList = await getInfoListParams({ userName, name, type });
    // console.log(infoList)
    this.props.dispatch({
      type: 'infoCardManager/update',
      payload: { customManager: infoList },
    });
  }

  async updateData(data, item) {
    this.props.dispatch({
      type: 'infoCardManager/update',
      payload: {
        infoCardList: data,
      },
    });
    router.push('/info-card-manager/info-card-list/edit');
  }

  setupUserType = () => {
    return (
      <div
        style={{ marginTop: '-3px' }}
      >
        <Select
          placeholder="请选择类型"
          className={publicStyles.select_text}
          onChange={this.selectChange}
          value={this.state.type}
        >
          <Option value='0'>
            内部
                      </Option>
          <Option value='1'>
            外部
                      </Option>
        </Select>
      </div>
    );
  };

  export = () => {
    exportIn().then(() => message.success('导出成功'));
  };
  upload = () => {
    exportOut().then(() => message.success('导入成功'));
  };

  render() {
    let { userList } = this.props;
    if (_.isEmpty(userList)) {
      userList = {
        records: [],
        total: 0,
      };
    }
    let { records, total } = userList;
    records = records.map(item => {
      return _.assign(item, { key: item.id });
    });

    return (
      <div className={publicStyles.public_hight}>
        <Content className={publicStyles.bg}>
          <div className={styles.public_hight_40}>
            <Form layout="inline">
              <Row justify="start" align="middle" style={{ paddingLeft: '39px' }} gutter={16}>
                <FormItem label="姓名">
                  <Input
                    className={publicStyles.input_text}
                    placeholder="请输入姓名"
                    onChange={this.onNameChange}
                    value={this.state.userName}
                  />
                </FormItem>
                <FormItem label="信息牌">
                  <Input
                    value={this.state.name}
                    className={publicStyles.input_text}
                    onChange={this.infoNameChange}
                    placeholder="请输入信息牌"
                  />
                </FormItem>
                <FormItem label="类型">{this.setupUserType()}</FormItem>
                <span className={publicStyles.button_type}>
                  <Button className={publicStyles.form_btn} onClick={this.onSearch}>
                    查询
                  </Button>
                  <Button
                    className={publicStyles.form_btn}
                    onClick={this.clearAllInput}
                    style={{ marginLeft: 37 }}
                  >
                    清空
                  </Button>
                </span>
                <span className={[`${publicStyles.form_btns}`].join(' ')}>
                  {/* <span
                    className={[`${publicStyles.form_btn_add}`].join('')}
                    onClick={this.addUser}
                  >
                    <IconFont type="icon-plus" />
                  </span> */}
                  <span className={[`${publicStyles.form_btn_add}`].join('')} onClick={this.export}>
                    <IconFont type="icon-download-simple" />
                  </span>
                  {/* <span className={[`${publicStyles.form_btn_add}`].join('')} onClick={this.upload}>
                    <IconFont type="icon-upload-light" />
                  </span> */}
                </span>
              </Row>
            </Form>
          </div>
          <MainContent
            data={records}
            columns={columns}
            updateData={this.updateData}
            // deleteColumn={this.deleteColumn}
            cancellationColumn={this.cancellationColumn}
            total={total}
            // showEdit={true}
            // showCancellation={true}
          />
        </Content>
      </div>
    );
  }
}
const mapState = ({ infoCardManager }) => {
  const resp = infoCardManager.customManager;
  return { userList: resp, };
};

export default connect(mapState)(SuperAdmin);

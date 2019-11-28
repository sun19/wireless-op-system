/**
 * title: 设置 > 管理员设置 > 信息牌设置
 */
import React from 'react';
import { Layout, Modal, Form, Input, Row, Col, Button, Icon } from 'antd';
import { connect } from 'dva';
import * as _ from 'lodash';
import router from 'umi/router';
import { ChromePicker } from 'react-color';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '@/config/constants';
import { UmiComponentProps } from '@/common/type';
import { getBuList, updateMessageCard, deleteMessageCard } from '../services';
import publicStyles from '../index.less';
import styles from './index.less';

const { confirm } = Modal;
const { Content } = Layout;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});

const columns = [
  // {
  //   title: '序号',
  //   dataIndex: 'id',
  //   width: '30%',
  //   editable: false,
  // },
  {
    title: '部门',
    dataIndex: 'name',
    // width: '30%',
    editable: true,
  },
  {
    title: '颜色',
    dataIndex: 'color',
    // width: '30%',
    className: 'select_text',
    editable: true,
    render: color => {
      // console.log(color)
      return (
        <span
          className={styles.color_span}
          style={{
            background: color,
          }}
        />
      );
    },
  },
];

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps;

interface colorInfo {
  color?: string,
  id?: string,
  key?: string,
  name?: string,

}
interface State {
  visible: boolean,
  displayColorPicker: boolean,
  colorInfo: colorInfo,
  cardMessage: colorInfo
}
class MessageCard extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.getBuList = this.getBuList.bind(this);
    this.updateData = this.updateData.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);

    this.state = {
      visible: false,
      displayColorPicker: false,
      colorInfo: {},
      cardMessage: {},

    };
  }

  async getBuList() {
    const buList = await getBuList({});
    this.props.dispatch({
      type: 'systemSetting/update',
      payload: {
        infoCard: buList,
      },
    });
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    // console.log(this.state.colorInfo, this.state.cardMessage)
    const { color, ...props } = this.state.cardMessage
    const data = {
      ...props,
      color: this.state.colorInfo.color
    }
    updateMessageCard(data).then(
      () => {
        this.getBuList()

        this.setState({
          visible: false,
        });
      }
    )

  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  handleChangeComplete = e => {
    this.setState({
      colorInfo: {
        color: e.hex
      },
    });
  }
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };
  async updateData(data, item) {
    this.setState({
      visible: true,
    });
    this.setState({
      cardMessage: data,
      colorInfo: data
    })
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
        await deleteMessageCard({ id: item.id });
        //重新请求数据重绘
        self.getBuList();
      },
      onCancel() {},
    });
  }

  componentDidMount() {
    this.getBuList();
  }

  render() {
    let { infoCard } = this.props;
    // if (_.isEmpty(infoCard)) return null;
    if (_.isEmpty(infoCard)) {
      infoCard = {
        records: [],
        total: 0,
      };
    }
    let { records, total } = infoCard;
    records = records.map(item => {
      return _.assign(item, { key: item.id });
    });

    //TODO:渲染颜色块
    const popover = {
      position: 'absolute',
      zIndex: '2',
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }

    return (
      <div className={publicStyles.public_hight}>
        <div className={publicStyles.bg}>
          <div className={publicStyles.public_hight_40} />
          <MainContent
            columns={columns}
            data={records}
            total={total}
            updateData={this.updateData}
            deleteColumn={this.deleteColumn}
            showEdit={true}
          />
          <Modal
            title="编辑"
            visible={this.state.visible}
            onOk={this.handleOk}
            // width='500'
            onCancel={this.handleCancel}
            okText="确认"
            cancelText="取消"
          >
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
              <Form.Item label="部门">
                <span>{this.state.colorInfo.name}</span>
              </Form.Item>
              <Form.Item label="颜色">
                <div className={styles.color_pick}>
                  <div>
                    <div onClick={this.handleClick} className={styles.color_span} style={{   background: this.state.colorInfo.color,  }} />
                    {/* Pick Color</div> */}
                    {this.state.displayColorPicker ? <div>
                      <div style={{position: 'fixed', top: '0px', right: '0px',  bottom: '0px',  left: '0px', }} onClick={this.handleClose} />
                      <ChromePicker style={{ width: '400px' }} color={this.state.colorInfo.color} onChangeComplete={this.handleChangeComplete} />
                    </div> : null}
                  </div>
                </div>
              </Form.Item>
            </Form>


          </Modal>
        </div>
      </div>
    );
  }
}

const mapState = ({ systemSetting }) => {
  const resp = systemSetting.infoCard;
  return {
    infoCard: resp,
  };
};

export default connect(mapState)(MessageCard);

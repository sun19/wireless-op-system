import React from 'react';
import { Layout, Form, Input, Row, Col, Button, Icon } from 'antd';
import { connect } from 'dva';
import * as _ from 'lodash';
import router from 'umi/router';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '@/config/constants';
import { UmiComponentProps } from '@/common/type';
import { getBuList, updateMessageCard, deleteMessageCard } from '../services';
import publicStyles from '../index.less';

const { Content } = Layout;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    width: '30%',
    editable: false,
  },
  {
    title: '部门',
    dataIndex: 'name',
    width: '30%',
    editable: true,
  },
  {
    title: '颜色',
    dataIndex: 'color',
    width: '30%',
    editable: true,
  },
];

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps;

class MessageCard extends React.Component<Props> {
  constructor(props: any) {
    super(props);
    this.getBuList = this.getBuList.bind(this);
    this.updateData = this.updateData.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
  }

  async getBuList() {
    const buList = await getBuList({ pageSize: 10, pageNo: 1 });
    this.props.dispatch({
      type: 'systemSetting/update',
      payload: {
        infoCard: buList,
      },
    });
  }

  async updateData(data, item) {
    const resp = await updateMessageCard(item);
    if (resp) {
      this.props.dispatch({
        type: 'systemSetting/update',
        payload: { infoCard: { records: data } },
      });
    }
  }

  async deleteColumn(item) {
    //TODO:修改人ID
    await deleteMessageCard({ id: item.id });
    //重新请求数据重绘
    this.getBuList();
  }

  componentDidMount() {
    this.getBuList();
  }

  render() {
    const { infoCard } = this.props;
    if (_.isEmpty(infoCard)) return null;
    let { records, total } = infoCard;
    records = records.map(item => {
      return _.assign(item, { key: item.id });
    });
    //TODO:渲染颜色块
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
          />
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

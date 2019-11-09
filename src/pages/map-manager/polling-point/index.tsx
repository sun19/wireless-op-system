import React from 'react';
import { Layout, Form, Input, Row, Col, Select, Button, Icon } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';
import { UmiComponentProps } from '@/common/type';
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
    title: '巡检点名称',
    dataIndex: 'name',
    editable: true,
  },
  {
    title: '巡检点位置',
    dataIndex: 'address',
    editable: true,
  },
  {
    title: 'x坐标',
    dataIndex: 'xCoordinate',
    editable: true,
  },
  {
    title: 'y坐标',
    dataIndex: 'yCoordinate',
    editable: true,
  },
  {
    title: '巡检开始时间',
    dataIndex: 'startTime',
    editable: true,
  },
  {
    title: '巡检结束时间',
    dataIndex: 'endTime',
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

class PollingPoint extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }
  addUser = () => {
    router.push('/map-manager/polling-point/add');
  };
  render() {
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
                <FormItem label="巡检点名称">
                  <Input className={publicStyles.input_text} placeholder="请输入姓名" />
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
          <MainContent />
        </Content>
      </div>
    );
  }
}

const mapState = ({ userManager }) => {
  const resp = userManager.innerUserList;
  return {
    innerUserList: resp,
  };
};

export default connect(mapState)(PollingPoint);

/**
 * title: 地图导入
 */
import React from 'react';
import { Layout, Form, Input, Row, Col, TimePicker, Button, Icon } from 'antd';
import { connect } from 'dva';

import MainContent from '../components/MainContent';
import { ICON_FONTS_URL } from '../../../config/constants';
import { UmiComponentProps } from '@/common/type';
import styles from './index.less';
import publicStyles from '../index.less';
import moment from 'moment';

const { Content } = Layout;
const FormItem = Form.Item;

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    width: '10%',
    editable: false,
  },
  {
    title: '图片名称',
    dataIndex: 'name',
    width: '10%',
    editable: true,
  },
  {
    title: '导入格式',
    dataIndex: 'cardNo',
    width: '10%',
    editable: true,
  },
  {
    title: '导入时间',
    dataIndex: 'sex',
    width: '5%',
    className: 'select_text',
    editable: true,
    render: onlineStatus => {
      return ['男', '女'][onlineStatus];
    },
  },
  {
    title: '地图编号',
    dataIndex: 'address',
    width: '10%',
    editable: true,
  },
  {
    title: '地图名称',
    dataIndex: 'phone',
    width: '10%',
    editable: true,
  },
  {
    title: '储存地址',
    dataIndex: 'departmentName',
    width: '10%',
    className: 'select_text',
    editable: true,
  },
  {
    title: '坐标',
    dataIndex: 'positionName',
    width: '5%',
    className: 'select_text',
    editable: true,
  },
];

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps;

class SuperAdmin extends React.Component {
  constructor(props: any) {
    super(props);
  }
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
                {/* <FormItem label="操作时间"> */}
                <span className={publicStyles.authInner} style={{ paddingLeft: '39px' }}>
                  操作时间
                  <span className={publicStyles.timePicker}>
                    <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} />
                  </span>
                  <span className={publicStyles.timePicker}>-</span>
                  <span className={publicStyles.timePicker}>
                    <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} />
                  </span>
                </span>
                <span className={publicStyles.button_type}>
                  <Button className={publicStyles.form_btn} style={{ marginLeft: 30 }}>
                    查询
                  </Button>
                  <Button className={publicStyles.form_btn} style={{ marginLeft: 30 }}>
                    清空
                  </Button>
                </span>
                <span className={[`${publicStyles.form_btns}`].join(' ')}>
                  <span className={[`${publicStyles.form_btn_add}`].join('')}>
                    <IconFont type="icon-download" />
                  </span>
                </span>
              </Row>
            </Form>
          </div>
          <MainContent columns={columns} data={[]} total={0} showEdit={true} />
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

export default connect()(SuperAdmin);

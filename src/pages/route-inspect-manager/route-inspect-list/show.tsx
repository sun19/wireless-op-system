/**
 * title: 设置 > 值班员设置 > 任务规划 > 新增
 */
import React from 'react';
import { Form, Row, Col, Button, Input, Select, message, DatePicker, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import * as _ from 'lodash';
import router from 'umi/router';
import moment from 'moment';

import ContentBorder from '../../../components/ContentBorder';
import { ICON_FONTS_URL } from '../../../config/constants';

// import { InputText, TreeNodeMenu } from '../components';
import { UmiComponentProps } from '@/common/type';

import { getPollingLineByName } from '../../map-manager/services';
// import { addTaskList } from '../services';

import styles from './index.less';
// import { map_manager } from '../../../config/api/map-manager.config';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});
const { TextArea } = Input;
const { Option } = Select;

interface UserType {
  key?: string;
  value?: string;
  roleId: string;
}
interface routes {
  id?: string;
  name?: string;
}
interface FormProps extends FormComponentProps {}
type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormProps;

interface State {}
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class TaskAdd extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    message.destroy();
  }
  goBack = () => {
    this.props.form.resetFields();
    router.push('/route-inspect-manager/route-inspect-list');
  };

  async componentWillMount() {
    const route = await getPollingLineByName({});
    this.props.dispatch({
      type: 'commonState/update',
      payload: {
        route: route.result.records,
      },
    });
  }

  async componentDidMount() {
    this.props.form.validateFields();
  }
  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;
    const { historyRecord } = this.props;
    return (
      <ContentBorder className={styles.auth_root}>
        <Form layout="inline" labelAlign="right" style={{ marginTop: '0.57rem' }}>
          <Row type="flex" justify="center" align="middle" className={styles.add}>
            <Col span={12}>
              <div className="auth__inner--container">
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="线路名称">
                      {getFieldDecorator('routeName', {
                        initialValue: historyRecord.routeName,
                      })(<Input disabled={true} />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="巡检人员">
                      {getFieldDecorator('userName', {
                        initialValue: historyRecord.userName,
                      })(<Input disabled={true} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="开始时间">
                      {getFieldDecorator('startTime', {
                        initialValue: moment(historyRecord.startTime),
                      })(<DatePicker showTime={true} disabled={true} />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="结束时间">
                      {getFieldDecorator('endTime', {
                        initialValue: moment(historyRecord.endTime),
                      })(
                        <DatePicker showTime={true} format="YYYY-MM-DD HH:mm:ss" disabled={true} />,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="是否完成">
                      {historyRecord.isFinish == '1' ? (
                        <IconFont type="icon-correct" />
                      ) : historyRecord.isFinish == '0' ? (
                        <IconFont type="icon-error" />
                      ) : (
                        <span className={styles.no_data}>暂无数据</span>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span={24} className="textarea">
                    <Form.Item label="备描述注">
                      {getFieldDecorator('remark', {
                        initialValue: historyRecord.remark,
                      })(<TextArea autoSize={{ minRows: 6, maxRows: 8 }} disabled={true} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="center" style={{ marginTop: '0.35rem' }}>
                  <Col span={6} />>
                  <Col span={6} className={styles.select_padding_left}>
                    <Form.Item>
                      <Button className={styles.form_btn} onClick={this.goBack}>
                        返回
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Form>
      </ContentBorder>
    );
  }
}
const AddUserForm = Form.create<Props>({ name: 'add_user' })(TaskAdd);
const mapState = ({ userManager, commonState, routeInspect }) => {
  return {
    historyRecord: routeInspect.historyRecord,
  };
};
export default connect(mapState)(AddUserForm);

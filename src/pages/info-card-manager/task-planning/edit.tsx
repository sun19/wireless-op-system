/**
 * title: 发放
 */
import React from 'react';
import { Form, Row, Col, Button, Input, Select, message, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import * as _ from 'lodash';
import router from 'umi/router';
import moment from 'moment';

import ContentBorder from '../../../components/ContentBorder';
// import { InputText, TreeNodeMenu } from '../components';
import { UmiComponentProps } from '@/common/type';

import { getPollingLineByName } from '../../map-manager/services';
import { TaskListEdit } from '../services';

import styles from './index.less';

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

interface State {
  userTypes: UserType[];
  userName?: string;
  cardNo?: string;
  phone?: string;
  departmentId?: string;
  name?: string;
  id?: string;
  note?: string;
  routes?: routes[];
}
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class TaskEdit extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.getRoute = this.getRoute.bind(this);

    this.state = {
      userTypes: [],
    };
  }

  componentWillUnmount() {
    message.destroy();
  }
  goBack = () => {
    this.props.form.resetFields();
    router.push('/info-card-manager/task-planning');
  };
  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields(async (err, values) => {
      if (err) {
        message.error('参数错误', err);
        return;
      }
      const { editData } = this.props;
      // const { startTime, endTime, task, informationBoardName, inspectionId, remark,...propsData}=editData
      const { startTime, endTime, ...props } = values;
      let data = {
        id: editData.id,
        ...props,
        // startTime:
        //   (values.startTime && values.startTime.format('YYYY-MM-DD HH:mm:ss').toString()) || '',
        // endTime: (values.endTime && values.endTime.format('YYYY-MM-DD HH:mm:ss').toString()) || '',
      };

      const isSuccessed = await TaskListEdit(data);
      if (isSuccessed) {
        message.success('修改成功！!');
        setTimeout(() => router.push('/info-card-manager/task-planning'), 1000);
      }
    });
  }
  getRoute() {
    const { editData } = this.props;

    
    
    const { getFieldDecorator, getFieldsError } = this.props.form;
    const { route } = this.props;
    if (this.props.form.getFieldsValue().task === '0' && route.length > 0) {
      return (
        <Row type="flex" justify="space-between">
          <Col span={12}>
            <Form.Item label="巡更路线">
              {getFieldDecorator('inspectionId', {
                rules: [
                  {
                    message: '请选择巡更路线',
                  },
                ],
                initialValue: editData.inspectionId,
              })(
                <Select placeholder="请选择巡更路线">
                  {route.map(item => (
                    <Option value={item.id}>{item.name}</Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>
      );
    }
  }
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
    const { editData } = this.props;
    return (
      <ContentBorder className={styles.auth_root}>
        <Form
          layout="inline"
          labelAlign="right"
          style={{ marginTop: '0.57rem' }}
          onSubmit={this.handleSubmit}
        >
          <Row type="flex" justify="center" align="middle" className={styles.add}>
            <Col span={12}>
              <div className="auth__inner--container">
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="信息牌">
                      {getFieldDecorator('informationBoardId', {
                        rules: [
                          {
                            //required: true,
                            message: '请选输入信息牌编号',
                          },
                        ],
                        initialValue: editData.informationBoardId,
                      })(<Input placeholder="请输入信息牌编号" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="任务">
                      {getFieldDecorator('task', {
                        rules: [
                          {
                            message: '请选择任务',
                          },
                        ],
                        initialValue: editData.task,
                      })(
                        <Select placeholder="请选择任务">
                          <Option value="0" key="1">
                            巡更路线
                          </Option>
                          <Option value="1" key="2">
                            责任区
                          </Option>
                          <Option value="2" key="3">
                            禁止区
                          </Option>
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                {/* <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Form.Item label="开始时间">
                      {getFieldDecorator('startTime', {
                        initialValue: moment(editData.startTime),
                      })(<DatePicker showTime={true} placeholder="请选择开始时间" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="结束时间">
                      {getFieldDecorator('endTime', {
                        initialValue: moment(editData.endTime),
                      })(
                        <DatePicker
                          showTime={true}
                          format="YYYY-MM-DD HH:mm:ss"
                          placeholder="请选择结束时间"
                        />,
                      )}
                    </Form.Item>
                  </Col>
                </Row> */}
                {this.getRoute()}
                <Row type="flex" justify="space-between">
                  <Col span={24} className="textarea">
                    <Form.Item label="备注">
                      {getFieldDecorator('remark', {
                        initialValue: editData.remark,
                      })(<TextArea autoSize={{ minRows: 6, maxRows: 8 }} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row type="flex" justify="center" style={{ marginTop: '0.35rem' }}>
                  <Col span={6}>
                    <Form.Item className={styles.button_type}>
                      <Button
                        className={styles.form_btn}
                        disabled={hasErrors(getFieldsError())}
                        htmlType="submit"
                      >
                        确认
                      </Button>
                    </Form.Item>
                  </Col>
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
const AddUserForm = Form.create<Props>({ name: 'add_user' })(TaskEdit);
const mapState = ({ userManager, commonState, infoCardManager }) => {
  const { route } = commonState;
  return {
    route,
    editData: infoCardManager.editData,
  };
};
export default connect(mapState)(AddUserForm);

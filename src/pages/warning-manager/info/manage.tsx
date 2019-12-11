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

import { UmiComponentProps } from '@/common/type';
import { warningInfoDeal } from '../../warning-manager/services';
import styles from './index.less';

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
interface FormProps extends FormComponentProps { }
type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormProps;

interface State {
}
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class TaskAdd extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.goMenage = this.goMenage.bind(this);
    }
    componentWillUnmount() {
        message.destroy();
    }
    goBack = () => {
        this.props.form.resetFields();
        router.push('/warning-manager/info');
    };
    async goMenage(e) {
        e.preventDefault();
        const { dataSource } = this.props
        this.props.form.validateFields(async (err, values) => {
            //    console.log(values.type)
            const data = {
                userId: localStorage.getItem('userMessage'),
                type: values.type,
                alarmId: dataSource.id,
                // auditeType: '0',
            }
            const isSuccessed = await warningInfoDeal(data)
            if (isSuccessed) {
                setTimeout(() => router.push('/warning-manager/info'), 1000);
            }
        })
    }
    async componentDidMount() {
        this.props.form.validateFields();

    }
    render() {
        const { getFieldDecorator, getFieldsError } = this.props.form;
        const { dataSource } = this.props
        return (
            <ContentBorder className={styles.auth_root}>
                <Form
                    layout="inline"
                    labelAlign="right"
                    onSubmit={this.goMenage}
                    style={{ marginTop: '0.57rem' }}
                >
                    <Row type="flex" justify="center" align="middle" className={styles.add}>
                        <Col span={12}>
                            <div className="auth__inner--container">
                                <Row type="flex" justify="space-between">
                                    <Col span={12}>
                                        <Form.Item label="告警名称">
                                            {getFieldDecorator('name', {
                                                initialValue: dataSource.name

                                            })(<Input disabled={true} />)}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="所属地图">
                                            {getFieldDecorator('mapName', {
                                                initialValue: dataSource.mapName
                                            })(<Input disabled={true} />)}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row type="flex" justify="space-between">
                                    <Col span={12}>
                                        <Form.Item label="告警时间">
                                            {getFieldDecorator(
                                                'alarmTime',
                                                {
                                                    initialValue: moment(dataSource.alarmTime),

                                                },
                                            )(<DatePicker showTime={true} disabled={true} />)}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="相关信息牌">
                                            {getFieldDecorator('informationBoardName', {
                                                initialValue: dataSource.informationBoardName
                                            })(<Input disabled={true} />)}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row type="flex" justify="space-between">
                                    <Col span={12}>
                                        <Form.Item label="告警方式">
                                            {getFieldDecorator('alarmTypeName', {
                                                initialValue: dataSource.alarmTypeName
                                            })(<Input disabled={true} />)}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="处理方式">
                                            {getFieldDecorator('type', {
                                                initialValue: '1'
                                            })(<Select placeholder="处理方式">
                                                <Option value="1">误报</Option>
                                                <Option value="2">手动解除</Option>
                                            </Select>)}
                                        </Form.Item>
                                    </Col>

                                </Row>
                                <Row type="flex" justify="center" style={{ marginTop: '0.35rem' }}>
                                    <Col span={6} >
                                        <Form.Item>
                                            <Button className={styles.form_btn} htmlType="submit">处理</Button>
                                        </Form.Item>
                                    </Col>
                                    <Col span={6} className={styles.select_padding_left}>
                                        <Form.Item>
                                            <Button className={styles.form_btn} onClick={this.goBack}>返回</Button>
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
const mapState = ({ warningManager }) => {
    return {
        dataSource: warningManager.dataSource
    };
};
export default connect(mapState)(AddUserForm);

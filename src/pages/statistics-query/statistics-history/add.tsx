import React from 'react';
import { Form, Row, Col, Button, Input, Select } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import { FormComponentProps } from 'antd/lib/form';

import { UmiComponentProps } from '@/common/type';
import ContentBorder from '../../../components/ContentBorder';
// import { InputText, TreeNodeMenu } from '../components';

import styles from './index.less';

const { TextArea } = Input;
const { Option } = Select;

interface FormProps extends FormComponentProps { }

type StateProps = ReturnType<typeof mapState>;
type Props = StateProps & UmiComponentProps & FormProps;


// const UserAuth: React.FC<Props> = (props: Props) => {
class historyAdd extends React.Component<Props> {
  constructor(props) {
    super(props);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  goBack = () => {
    this.props.form.resetFields();
    router.push('/statistics-query/statistics-history');
  };
  render() {
    const props = this.props;
    const { getFieldDecorator } = props.form;
    return (
      <ContentBorder className={styles.auth_root}>
        <Form layout="inline" labelAlign="right" style={{ marginTop: '0.57rem' }}>
          <div className="auth__inner--container">
            <div className={styles.input_body}>
              <Row type="flex" justify="space-between">
                <Col span={24}>
                  <Form.Item label="信息牌">
                    {getFieldDecorator('信息牌', {
                      rules: [
                        {
                          message: '请输入信息牌',
                        },
                      ],
                    })(<Input placeholder="请输入信息牌" />)}
                  </Form.Item>
                  <Form.Item label="姓名">
                    {getFieldDecorator('姓名', {
                      rules: [
                        {
                          message: '请输入姓名',
                        },
                      ],
                    })(<Input placeholder="请输入姓名" />)}
                  </Form.Item>
                  <Form.Item label="类型">
                    {getFieldDecorator('类型', {
                      rules: [
                        {
                          message: '请输入类型',
                        },
                      ],
                    })(<Input placeholder="请输入类型" />)}
                  </Form.Item>
                </Col>
              </Row>

              <Row className={styles.line_style}>
                <Col className={styles.line_type} span={11} />
                <Col span={2}>地图</Col>
                <Col className={styles.line_type} span={11} />
              </Row>
              <Row className={styles.line_style}>
                <Col className={styles.img_type} span={24} />
              </Row>
              <Row type="flex" justify="center" style={{ marginTop: '0.35rem' }}>
                <Col span={2}>
                  <Form.Item className={styles.button_type}>
                    <Button className={styles.form_btn}>确认</Button>
                  </Form.Item>
                </Col>
                <Col span={2} className={styles.select_padding_left}>
                  <Form.Item>
                    <Button className={styles.form_btn} onClick={this.goBack}>返回</Button>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>
        </Form>
      </ContentBorder>
    );
  }
};

const HistoryAdd = Form.create<Props>({ name: 'history_add' })(historyAdd);

const mapState = ({ statisticsQuery }) => {
  const resp = statisticsQuery.history;
  // const { allDuties, allSecretLevel } = commonState;
  return {
    history: resp,

  };
};

export default connect(mapState)(HistoryAdd);

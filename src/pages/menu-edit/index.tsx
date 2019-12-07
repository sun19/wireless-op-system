/**
 * title: 编辑
 */
import React from 'react';
import { Form, Row, Col, Button, Input, message, Select, Icon, Tree } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import router from 'umi/router';
import * as _ from 'lodash';
import ContentBorder from '../../components/ContentBorder';
// import { InputText, TreeNodeMenu } from '../components';
// import { updateUserType, getAllRoles } from '../services';
import { getPeopleMenues, getAllMenues, editMenues } from '../login/login.service';

import styles from './index.less';

const { TreeNode } = Tree;
const { Option } = Select;
type Props = FormComponentProps & ReturnType<typeof mapState>;


interface State {
    checkedKeys: any;
    dataTree: any;
    halfCheckedKeys: any;
    editingValue?: string;
    data: any
}

class EditUserAuth extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            checkedKeys: [],
            dataTree: [],
            halfCheckedKeys: [],
            data: []
        };
    }
    async componentDidMount() {
        // 获取所有菜单
        const data = await getAllMenues();
        this.setState({ dataTree: data.result });
    }
    onCheck = (checkedKeys, info) => {
        // console.log(info.checkedNodes)
        this.setState({ checkedKeys: checkedKeys, halfCheckedKeys: info.halfCheckedKeys });
    };
    onSubmit(e) {
        // console.log(this.state.data)



        //     // const isSuccessed = await editMenues(data);
        //     // if (isSuccessed.success) {
        //     //     message.success('编辑成功!');
        //     //     setTimeout(() => router.push('/system-setting/people-type'), 1000);
        //     // }

    }
    onChange = (e, item) => {
        // console.log(e.target.value, item);
        item.name = e.target.value
        // console.log(item)
        let currentData = this.state.data

        const data = [{
            id: item.id,
            keys: item.keys,
            name: e.target.value,
            path: item.path
        }]
        const lastData = currentData.concat(data)
        this.setState({ data: lastData })
    };
    titles = (item) => {
        return ''
        // <Input onChange={(e) => {this.onChange(e, item)}} defaultValue={item.name} />
         }
    renderTreeNodes = data => {
        // const self =this;
        return data.map(item => {
            if (item.child) {
                return (
                    <TreeNode title={this.titles(item)} key={item.id} dataRef={item}>
                        {/* title={item.name} */}
                        {item.name}
                        {this.renderTreeNodes(item.child)}
                    </TreeNode>
                );
            }
            return <TreeNode title={this.titles(item)} key={item.id} />;
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <ContentBorder className={styles.auth_root}>
                <Form layout="inline" style={{ marginTop: '0.57rem' }} onSubmit={this.onSubmit}>
                    <div className="auth__inner--container  menu_tree">
                        <Form.Item label="菜单编辑">
                            {getFieldDecorator(
                                'resourceIds',
                                {},
                            )(
                                <Tree
                                    checkable={false}
                                    // defaultExpandedKeys={this.state.expandedKeys}
                                    // defaultSelectedKeys={this.state.selectedKeys}
                                    // defaultCheckedKeys={this.state.checkedKeys}
                                    // expandedKeys={this.state.expandedKeys}
                                    // selectedKeys={this.state.expandedKeys}
                                    checkedKeys={this.state.checkedKeys}
                                    // onSelect={this.onSelect}
                                    onCheck={this.onCheck}
                                >
                                    {this.renderTreeNodes(this.state.dataTree)}
                                </Tree>,
                            )}
                        </Form.Item>

                        <Row type="flex" justify="center" style={{ marginTop: '0.35rem' }}>
                            <Col span={6}>
                                <Form.Item className={styles.button_type}>
                                    <Button className={styles.form_btn} htmlType="submit">
                                        确认
                      </Button>
                                </Form.Item>
                            </Col>

                        </Row>
                    </div>
                </Form>

            </ContentBorder>
        );
    }
}

const EditUserHOC = Form.create<Props>({ name: 'edit_user' })(EditUserAuth);

const mapState = ({ menu }) => {
    // const resp = systemSetting.peopleTypeRecord;
    return { menu: menu.menus || [] };
};

export default connect(mapState)(EditUserHOC);

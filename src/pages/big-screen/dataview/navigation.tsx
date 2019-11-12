import React from 'react';
import { Menu, Icon, Row, Col, Button } from 'antd';

import styles from './index.less';

const { SubMenu } = Menu;

export default class Navigation extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }
  state = {
    current: 'home',
  };
  handleClick = e => {
    // console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };
  render() {
    return (
      <Row>
        <div className={styles.navigation}>
          <Col span={6} className="left_panel">
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
              <Menu.Item key="home">首页</Menu.Item>
              <Menu.Item key="data">数据</Menu.Item>
              <SubMenu title={<span className="submenu-title-wrapper">菜单</span>}>
                {/* <Menu.ItemGroup title="Item 1"> */}
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
                <Menu.Item key="setting:3">Option 3</Menu.Item>
                {/* </Menu.ItemGroup> */}
              </SubMenu>
              <Menu.Item key="alipay">admin</Menu.Item>
            </Menu>
          </Col>
          <Col span={15} className="left_panel">
            <span className={styles.title_back}/>
          </Col>
          <Col span={3} className="left_panel">
            www
          </Col>
        </div>
      </Row>
    );
  }
}

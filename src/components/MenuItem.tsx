import React from 'react';

import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

export default function() {
  return (
    <SubMenu
      key="sub1"
      title={
        <span>
          <Icon type="user" />
          subnav 1
        </span>
      }
    >
      <Menu.Item key="1">option1</Menu.Item>
      <Menu.Item key="2">option2</Menu.Item>
      <Menu.Item key="3">option3</Menu.Item>
      <Menu.Item key="4">option4</Menu.Item>
    </SubMenu>
  );
}

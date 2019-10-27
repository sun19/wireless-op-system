import React, { Component } from 'react';
import { Tree } from 'antd';
import { TreeProps } from 'antd/lib/tree';

const { TreeNode } = Tree;

interface Props extends TreeProps {}

const defaultMenuNodes = [
  {
    key: '0-0',
    title: '功能菜单',
    children: [
      {
        key: '0-0-0',
        title: '新户入网',
        children: [
          {
            key: '0-0-0-0',
            title: '入网进度',
            children: [
              {
                key: '0-0-0-0-0',
                title: '审核流程',
                children: [
                  {
                    key: '0-0-0-0-0-0',
                    title: '显示',
                  },
                  {
                    key: '0-0-0-0-0-1',
                    title: '修改',
                  },
                ],
              },
            ],
          },
          //   第二轮

          {
            key: '0-0-0-1',
            title: '复审审批',
            children: [
              {
                key: '0-0-0-1-0',
                title: '待审批',
                children: [
                  {
                    key: '0-0-0-1-0-0',
                    title: '显示',
                  },
                  {
                    key: '0-0-0-1-0-1',
                    title: '修改',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export default class TreeNodeMenu extends Component<Props> {
  createTreeNodes = nodes => {
    if (nodes.children) {
      return (
        <TreeNode title={nodes.title} key={nodes.key}>
          {nodes.children.map(items => this.createTreeNodes(items))}
        </TreeNode>
      );
    } else {
      return <TreeNode title={nodes.title} key={nodes.key} />;
    }
  };

  render() {
    const TreeNodes = defaultMenuNodes.reduce(
      (prev, node) => this.createTreeNodes(node),
      [] as any,
    );
    return (
      <Tree
        checkable={true}
        defaultExpandedKeys={['0-0-0-0-0']}
        defaultSelectedKeys={['0-0-0-0-0', '']}
        defaultCheckedKeys={['0-0-0-0-0']}
      >
        {TreeNodes}
      </Tree>
    );
  }
}

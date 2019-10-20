import React from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Icon, Pagination } from 'antd';

import { ICON_FONTS_URL } from '../config/constants';
import styles from './table.css';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    index: i,
    loginName: `sz100${i}`,
    name: `开发者${i}号`,
    type: '系统管理员',
    gender: '男',
    tip: '-',
    loginTime: new Date().toDateString(),
  });
}
const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }} className={styles.table_item}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data, editingKey: '' };
    this.columns = [
      {
        title: '序号',
        dataIndex: 'index',
        width: '5%',
        editable: false,
      },
      {
        title: '登录名',
        dataIndex: 'loginName',
        width: '10%',
        editable: true,
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: '10%',
        editable: true,
      },
      {
        title: '人员类型',
        dataIndex: 'type',
        width: '25%',
        editable: true,
      },
      {
        title: '性别',
        dataIndex: 'gender',
        width: '10%',
        editable: true,
      },
      {
        title: '备注',
        dataIndex: 'tip',
        width: '10%',
        editable: true,
      },
      {
        title: '登录时间',
        dataIndex: 'loginTime',
        width: '20%',
        editable: false,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <IconFont
                    type="icon-save1"
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  />
                )}
              </EditableContext.Consumer>
              <Popconfirm
                title="确定要取消吗?"
                onConfirm={() => this.cancel(record.key)}
                okText="确定"
                cancelText="取消"
              >
                <IconFont type="icon-cancel" />
              </Popconfirm>
            </span>
          ) : (
            <span>
              <IconFont
                type="icon-edit"
                style={{ marginRight: '8px' }}
                onClick={() => this.edit(record.key)}
              />
              <IconFont type="icon-delete" />
            </span>
          );
        },
      },
    ];
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered={false}
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            size: 'small',
            // showSizeChanger: true,
            showQuickJumper: {
              goButton: '跳转',
            },
            showTotal: () => `每页10条，共10条`,
            itemRender: (current, type, originalElement) => {
              console.log(type, current, originalElement, 'type');
              if (type === 'prev') {
                return <span className={styles.prev_page}>上一页</span>;
              }
              if (type === 'next') {
                return <span className={styles.next_page}>下一页</span>;
              }
              return originalElement;
            },
          }}
        />
      </EditableContext.Provider>
    );
  }
}

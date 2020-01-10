import React from 'react';
import {
  Table,
  Select,
  Button,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Icon,
  Pagination,
} from 'antd';

import request, { format } from '@/utils/request';
import { ICON_FONTS_URL } from '@/config/constants';
import styles from './table.less';

const { Option } = Select;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});

const EditableContext = React.createContext();
class EditableCell extends React.Component<any> {
  getInput = () => {
    // console.log(this.props, this.state)
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    } else if (
      (this.props.inputType === 'text' || this.props.inputType === 'number') &&
      this.props.className === 'select_text'
    ) {
      return (
        <Select   getPopupContainer={triggerNode => triggerNode.parentElement} defaultValue={this.props.record[this.props.dataIndex]} style={{ width: 120 }} />
      );
      {
        /* <Option value="1"> 男</Option>
            <Option value="2"> 女</Option> */
      }
      {
        /* </Select > */
      }
    } else return <Input placeholder={`请输入${this.props.title}`} />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      key,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }} className={styles.table_item} key={key}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `请输入${title}!`,
                },
              ],
              initialValue: record[dataIndex] == '' ? '' : record[dataIndex],
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

interface State {
  editingKey: string;
}

interface Props {
  data: any[];
  [key: string]: any;
}
@Form.create()
export default class EditableTable extends React.Component<Props, State> {
  columns: any[];
  constructor(props) {
    super(props);
    this.state = { editingKey: '' };
    this.columns = this.props.columns;
    if (this.props.showInlineEdit) {
      this.columns = this.columns.concat([
        {
          title: '操作',
          dataIndex: 'operation',
          render: (text, record) => {
            const editable = this.isEditing(record);
            return editable ? (
              <span>
                <EditableContext.Consumer>
                  {form => (
                    <IconFont
                      type="icon-save1"
                      onClick={this.onSave.bind(this, form, record)}
                      style={{ marginRight: 8 }}
                    />
                  )}
                </EditableContext.Consumer>
                <Popconfirm
                  title="确定要取消吗?"
                  onConfirm={this.onCancel.bind(this, record)}
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
                  onClick={this.onClick.bind(this, record)}
                />
              </span>
            );
          },
        },
      ]);
    }
  }

  isEditing = record => {
    return record.id === this.state.editingKey;
  };

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.props.data];
      const index = newData.findIndex(item => key === item.id);
      //修改场景
      if (index > -1) {
        const item = newData[index];
        const newItem = {
          ...item,
          ...row,
        };
        newData.splice(index, 1, newItem);
        this.props.updateData(newData, newItem);
        this.setState({ editingKey: '' });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  onSave = (form, record) => {
    this.save(form, record.id);
  };
  onCancel = () => {
    this.cancel();
  };

  onClick = record => {
    this.edit(record.id);
    // this.props.updateData(record);
  };
  preview = record => {
    this.props.preview(record);
  };
  manage = record => {
    this.props.manage(record);
  };
  onDelete = record => {
    this.props.deleteColumn(record);
  };

  setRowClassName = () => 'editable-row';

  setPagination = () => ({
    size: 'small',
    showQuickJumper: {
      goButton: '跳转',
    },
    showTotal: () => {
      const { total } = this.props;
      return `每页10条，共${total}条`;
    },
    itemRender: (current, type, originalElement) => {
      if (type === 'prev') {
        return (
          <Button size="small" className={styles.next_page}>
            上一页
          </Button>
        );
      }
      if (type === 'next') {
        return (
          <Button size="small" className={styles.next_page}>
            下一页
          </Button>
        );
      }
      return originalElement;
    },
    defaultCurrent: 1,
  });

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
          scroll={{ y: 400 }} 
          className="editor_table--root"
          components={components}
          bordered={false}
          size="middle"
          dataSource={this.props.data}
          columns={columns}
          rowClassName={this.setRowClassName}
          // pagination={this.setPagination()}
          pagination={false}
          expandedRowRender={this.props.expandedRowRender}
        />
      </EditableContext.Provider>
    );
  }
}

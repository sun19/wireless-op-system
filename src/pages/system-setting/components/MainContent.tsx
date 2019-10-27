import React from 'react';
import { Layout, Form, Input, Row, Col, Button, Icon } from 'antd';

import styles from './mainContent.less';
import EditableTable from '../../../components/EditorableTable';
import ContentBorder from '../../../components/ContentBorder';


@Form.create()
export default class MainContent extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    const EditableFormTable = Form.create()(EditableTable);
    return (
      <div className={styles.table_list}>
        <div className={styles.table_list_panel}>
          <ContentBorder>
            <EditableFormTable />
          </ContentBorder>
        </div>
      </div>
    );
  }
}

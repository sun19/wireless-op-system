import React from 'react';
import { Button } from 'antd';

import styles from './operationBtn.less';

export default class OperationButton extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    const name = (this.props as any).name || '查询';
    return <Button className={styles.button}>{name}</Button>;
  }
}

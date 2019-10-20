import React from 'react';
import { Input } from 'antd';

import styles from './basicInput.css';

export default class BasicInput extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    const name = (this.props as any).name || '登录名';
    return (
      <div className={styles.basic_input_box}>
        <label className={styles.input_label}>{name}</label>
        <Input />
      </div>
    );
  }
}

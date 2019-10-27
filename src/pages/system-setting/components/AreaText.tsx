import React, { Component } from 'react';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/lib/input';

import styles from '../index.less';

const { TextArea } = Input;

interface Props extends TextAreaProps {}

export default class AreaText extends Component<Props> {
  render() {
    return <TextArea className={styles.text_area} {...this.props} />;
  }
}

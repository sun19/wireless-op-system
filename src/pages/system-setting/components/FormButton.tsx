import React, { Component } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';

import styles from '../index.less';

interface Props extends ButtonProps {}

export default class FormButton extends Component<Props> {
  render() {
    return (
      <Button className={styles.form_btn} {...this.props}>
        {this.props.title}
      </Button>
    );
  }
}

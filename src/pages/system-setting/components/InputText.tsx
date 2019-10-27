import React from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';

import styles from '../index.less';

interface Props extends InputProps {}

class InputText extends React.Component<Props> {
  render() {
    return <Input className={styles.input_text} {...this.props} />;
  }
}

export default InputText;

import React from 'react';
import { Input } from 'antd';

import styles from '../index.less';
import { InputProps } from 'antd/lib/input';

interface Props extends InputProps {}

class InputText extends React.Component<Props> {
  render() {
    return <Input className={styles.input_text} {...this.props} />;
  }
}

export default InputText;
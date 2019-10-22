import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';

import styles from '../index.less';

const { Option } = Select;

interface OptionValue {
  key: string;
  value: string;
}

interface Props extends SelectProps {
  options: OptionValue[];
}

export default class SelectText extends React.Component<Props> {
  setupOptions = () => {
    const options = this.props.options;
    return options.map(option => (
      <Option value={option.key} key={option.key}>
        {option.value}
      </Option>
    ));
  };
  render() {
    const options = this.setupOptions();
    return (
      <Select defaultValue={this.props.value} style={{ width: 169 }} className={styles.select_text}>
        {options}
      </Select>
    );
  }
}

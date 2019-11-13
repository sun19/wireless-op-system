import React, { Component } from 'react';

import styles from './index.less';

interface Props {
  title: string;
  [key: string]: any;
}

export default class Title extends Component<Props> {
  render() {
    return (
      <div className={styles.title}>
        <span className="icon" />
        <span className="titlename">{this.props.title}</span>
      </div>
    );
  }
}

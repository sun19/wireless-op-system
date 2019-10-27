import React from 'react';

import styles from './ContentBorder.less';

export default function ContentBorder(props) {
  return <div className={[`${styles.root}`, `${props.className}`].join(' ')}>{props.children}</div>;
}

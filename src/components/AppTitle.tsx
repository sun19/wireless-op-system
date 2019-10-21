import React from 'react';

import styles from './appTitle.less';

export default function() {
  return <div className={[`${styles.title}`].join(' ')} />;
}

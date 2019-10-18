import React from 'react';

import styles from './appTitle.css';

export default function() {
  return <div className={[`${styles.title}`].join(' ')}></div>;
}

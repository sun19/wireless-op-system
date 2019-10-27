import React from 'react';

import MainContent from '../components/MainContent';
import styles from './index.less';

const SuperAdmin: React.FC = props => {
  return (
    <div className={styles.superAdmin}>
      <MainContent />
    </div>
  );
};

export default SuperAdmin;

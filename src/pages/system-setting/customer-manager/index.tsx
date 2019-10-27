import React from 'react';

import MainContent from '../components/MainContent';
import styles from './index.less';

const UserManager: React.FC = props => {
  return (
    <div className={styles.customerManager}>
      <MainContent />
    </div>
  );
};

export default UserManager;

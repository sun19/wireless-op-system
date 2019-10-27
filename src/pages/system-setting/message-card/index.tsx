import React from 'react';

import MainContent from '../components/MainContent';
import styles from './index.less';

const MessageCard: React.FC = props => {
  return (
    <div className={styles.messageCard}>
      <MainContent />
    </div>
  );
};

export default MessageCard;

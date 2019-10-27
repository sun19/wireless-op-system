import React from 'react';
// import { Layout, Form, Input, Row, Col, Button, Icon } from 'antd';

import MainContent from '../components/MainContent';
import publicStyles from '../index.less';


export default class MessageCard extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div className={publicStyles.public_hight}>
        <div className={publicStyles.bg}>
          <div className={publicStyles.public_hight_40}/>
          <MainContent />
        </div>
      </div>
    );
  }
}

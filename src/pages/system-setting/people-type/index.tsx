import React from 'react';
import { Layout, Form, Input, Row, Col, Button, Icon } from 'antd';

import { ICON_FONTS_URL } from '../../../config/constants';
import MainContent from '../components/MainContent';
import styles from './index.less';
import publicStyles from '../index.less';

const { Content } = Layout;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: ICON_FONTS_URL,
});

export default class PeopelType extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div className={publicStyles.public_hight}>
        <Content className={publicStyles.bg}>
          <div className={styles.public_hight_40}>
            <div className={[`${publicStyles.btn}`].join(' ')}>
              <IconFont type="icon-plus" />
            </div>
          </div>
          <MainContent />
        </Content>
      </div>
    );
  }
}

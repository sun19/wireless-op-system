import React from 'react';
import { Breadcrumb } from 'antd';
import NavLink from 'umi/navlink';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';

import styles from './menuBreadCrumb.less';

class MenuBreadCrumb extends React.Component<any, any> {
  render() {
    const { breadcrumbs } = this.props;
    return (
      <Breadcrumb separator=">" className={styles.bread_box}>
        {breadcrumbs.map(({ title, match }) => (
          <Breadcrumb.Item className={styles.current_item} key={match.url}>
            {/* <NavLink to={match.url}>{title}</NavLink> */}
            {title}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    );
  }
}
const routes = window.g_routes[0].routes.filter(item => item.path);

export default withBreadcrumbs(routes)(MenuBreadCrumb);

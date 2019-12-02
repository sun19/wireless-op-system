import React from 'react';
import { Breadcrumb } from 'antd';
import NavLink from 'umi/navlink';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import _ from 'lodash'

import styles from './menuBreadCrumb.less';

class MenuBreadCrumb extends React.Component<any, any> {
  render() {
    const { breadcrumbs } = this.props;
    let titles = breadcrumbs.map(({ title, match }) => (title))
    let childrens = [];
    if (!!_.compact(titles)[1]) {
      childrens = _.compact(titles)[1].split('>')
    }
    titles = _.compact(titles)
    return (
      <Breadcrumb separator=">" className={styles.bread_box}>
        {titles.map((title, index) => {
          return (
            <Breadcrumb.Item className={styles.current_item} key={index}>
              <span className={styles.last_child}>{title}</span>
            </Breadcrumb.Item>
          )
        })}
      </Breadcrumb>
    );
  }
}
const routes = window.g_routes[0].routes.filter(item => item.path);

export default withBreadcrumbs(routes)(MenuBreadCrumb);

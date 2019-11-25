export const LEFT_MENUS = [
  {
    name: '设置',
    key: '01',
    icon: 'icon-system1',
    path: 'setting',
    component: 'setting',
    children: [
      {
        name: '超级管理员设置',
        key: '055',
        path: '/system-setting/super-admin',
        component: './pages/system-setting/super-admin/index.tsx',
        // children: [
        //  { name: '字典设置',
        //   key: '05',
        //   // path: '/system-setting/super-admin',
        //   // component: './pages/system-setting/super-admin/index.tsx',
        // }
        // ]
      },
      {
        name: '管理员设置',
        key: '05',
        path: '',
        component: '',
        children: [
          // {
          //   name: '地图导入',
          //   key: '13',
          //   path: '/map-manager/map-import',
          //   component: './pages/map-manager/map-import/index.tsx',
          // },
          {
            name: '信息牌设置',
            key: '04',
            path: '/system-setting/message-card',
            component: './pages/system-setting/message-card/index.tsx',
          },
          {
            name: '区域设置',
            key: '14',
            path: '/map-manager/area-set',
            component: './pages/map-manager/area-set/index.tsx',
          },
          {
            name: '电子围栏设置',
            key: '15',
            path: '/map-manager/fence-setting',
            component: './pages/map-manager/fence-setting/index.tsx',
          },
          {
            name: '灯具设置',
            key: '16',
            path: '/map-manager/lamps-set',
            component: './pages/map-manager/lamps-set/index.tsx',
          },
          {
            name: '巡检点设置',
            key: '17',
            path: '/map-manager/polling-point',
            component: './pages/map-manager/polling-point/index.tsx',
          },
          {
            name: '巡检路线设置',
            key: '18',
            path: '/map-manager/polling-line',
            component: './pages/map-manager/polling-line/index.tsx',
          },
        ],
      },
      {
        name: '值班员设置',
        key: '55',
        path: '/system-setting/super-admin',
        component: './pages/system-setting/super-admin/index.tsx',
        children: [
          {
            name: '任务规划',
            key: '11',
            path: '/info-card-manager/task-planning',
            component: './pages/info-card-manager/task-planning/index.tsx',
          },
        ],
      },
    ],
  },

  {
    name: '应用',
    key: '01',
    icon: 'icon-system1',
    path: 'use',
    component: 'use',
    children: [
      // { name: '轨迹查询',
      //   key: '31',

      // },
      // { name: '位置查询', },
      {
        name: '巡检列表',
        key: '24',
        path: '/route-inspect-manager/route-inspect-list',
        component: './pages/route-inspect-manager/route-inspect-list/index.tsx',
      },
      {
        name: '巡检报表',
        key: '25',
        path: '/route-inspect-manager/route-inspect-report',
        component: './pages/route-inspect-manager/route-inspect-report/index.tsx',
      },
      {
        name: '日志列表',
        key: '27',
        path: '/log-manager/log-list',
        component: './pages/log-manager/log-list/index.tsx',
      },
    ],
  },
  {
    name: '显示',
    key: '01',
    path: 'show',
    component: 'show',
    icon: 'icon-system1',
    children: [
      {
        name: '用户管理',
        key: '02',
        path: '/system-setting/customer-manager',
        component: './pages/system-setting/customer-manager/index.tsx',
      },
      {
        name: '人员类型',
        key: '03',
        path: '/system-setting/people-type',
        component: './pages/system-setting/people-type/index.tsx',
      },
      {
        name: '用户列表-内部',
        key: '07',
        path: '/user-manager/user-inside',
        component: './pages/user-manager/user-inside/index.tsx',
      },
      {
        name: '信息牌列表',
        key: '10',
        path: '/info-card-manager/info-card-list',
        component: './pages/info-card-manager/info-card-list/index.tsx',
      },
      {
        name: '告警类型',
        key: '20',
        path: '/warning-manager/type',
        component: './pages/warning-manager/type/index.tsx',
      },
      {
        name: '告警信息',
        key: '21',
        path: '/warning-manager/info',
        component: './pages/warning-manager/info/index.tsx',
      },
      {
        name: '历史告警',
        key: '22',
        path: '/warning-manager/history',
        component: './pages/warning-manager/history/index.tsx',
      },
      {
        // name: '首页',
        name: '实时位置',
        path: '/big-screen/homepage',
        component: './pages/big-screen/homepage',
      },
      {
        name: '历史轨迹',
        key: '30',
        path: '/statistics-query/statistics-history',
        component: './pages/statistics-query/statistics-history/index.tsx',
      },
      {
        name: '电子围栏',
        path: '/big-screen/dataview',
        component: './pages/big-screen/dataview',
      },
    ],
  },
];

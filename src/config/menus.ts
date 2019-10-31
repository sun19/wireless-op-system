export const LEFT_MENUS = [
  {
    name: '系统设置',
    key: '01',
    path: '/system-setting',
    component: './pages/system-setting',
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
        name: '信息牌设置',
        key: '04',
        path: '/system-setting/message-card',
        component: './pages/system-setting/message-card/index.tsx',
      },
      {
        name: '超级管理员设置',
        key: '05',
        path: '/system-setting/super-admin',
        component: './pages/system-setting/super-admin/index.tsx',
      },
    ],
  },
  {
    name: '人员管理',
    key: '06',
    path: '/user-manager',
    component: './pages/user-manager',
    children: [
      {
        name: '用户列表-内部',
        key: '07',
        path: '/user-manager/user-inside',
        component: './pages/user-manager/user-inside/index.tsx',
      },
      {
        name: '用户列表-外部',
        key: '08',
        path: '/user-manager/user-outside',
        component: './pages/user-manager/user-outside/index.tsx',
      },
    ],
  },
  {
    name: '信息牌管理',
    key: '09',
    path: '/info-card-manager',
    component: './pages/info-card-manager',
    children: [
      {
        name: '信息牌列表',
        key: '10',
        path: '/info-card-manager/info-card-list',
        component: './pages/info-card-manager/info-card-list/index.tsx',
      },
      {
        name: '任务规划',
        key: '11',
        path: '/info-card-manager/task-planning',
        component: './pages/info-card-manager/task-planning/index.tsx',
      },
    ],
  },
  {
    name: '地图管理',
    key: '12',
    path: '/map-manager',
    component: './pages/map-manager',
    children: [
      {
        name: '地图导入',
        key: '13',
        path: '/map-manager/map-import',
        component: './pages/map-manager/map-import/index.tsx',
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
    name: '告警管理',
    key: '19',
    path: '/warning-manager',
    component: './pages/warning-manager',
    children: [
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
    ],
  },
  {
    name: '巡检管理',
    key: '23',
    path: '/route-inspect-manager',
    component: './pages/route-inspect-manager',
    children: [
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
    ],
  },
  {
    name: '日志管理',
    key: '26',
    path: '/log-manager',
    component: './pages/log-manager',
    children: [
      {
        name: '日志列表',
        key: '27',
        path: '/log-manager/log-list',
        component: './pages/log-manager/log-list/index.tsx',
      },
    ],
  },
  {
    name: '大屏展示',
    key: '28',
    path: '/big-screen',
    component: './pages/big-screen',
    // children: [
    //     {
    //         name: '大屏展示',
    //         path: 'big-screen/info-card-list',
    //         component: './pages/users/index.tsx'
    //     },
    // ]
  },
  {
    name: '统计查询',
    key: '29',
    path: '/statistics-query',
    component: './pages/statistics-query',
    children: [
      {
        name: '历史轨迹',
        key: '30',
        path: '/statistics-query/statistics-history',
        component: './pages/statistics-query/statistics-history/index.tsx',
      },
    ],
  },
];

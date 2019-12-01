export const LEFT_MENUS = [
  {
    name: '设置',
    key: '001',
    icon: 'icon-system1',
    path: 'setting',
    component: 'setting',
    children: [
      {
        name: '高级管理员设置',
        key: '002',
        path: '',
        component: '',
        children: [
          {
            name: '系统设置',//没有页面
            key: '003',
            path: '/empty',
            component: './pages/empty/index.tsx',
          }, {
            name: '系统管理员设置',
            key: '004',
            path: '/system-setting/super-admin',
            component: './pages/system-setting/super-admin/index.tsx',
          },
          {
            name: '值班员设置',//没有页面
            key: '005',
            path: '/empty',
            component: './pages/empty/index.tsx',
          },
        ]
      },
      {
        name: '系统管理员设置',
        key: '006',
        path: '',
        component: '',
        children: [
          {
            name: '信息牌设置',
            key: '040',
            path: '/system-setting/message-card',
            component: './pages/system-setting/message-card/index.tsx',
          },
          {
            name: '用户管理(值班员)',
            key: '007',
            path: '/system-setting/customer-manager',
            component: './pages/system-setting/customer-manager/index.tsx',
          },
          {
            name: '内部人员信息录入',//没有页面
            key: '008',
            path: '/empty',
            component: './pages/empty/index.tsx',
          },
          {
            name: '值班员设置 ',//没有页面
            key: '009',
            path: '/empty',
            component: './pages/empty/index.tsx',
          },
          {
            name: '信息牌分配',//没有页面
            key: '010',
            path: '/empty',
            component: './pages/empty/index.tsx',
          },
          {
            name: '电子围栏设置',
            key: '011',
            path: '/map-manager/fence-setting',
            component: './pages/map-manager/fence-setting/index.tsx',
          }, {
            name: '系统维护',//没有页面
            key: '012',
            path: '/empty',
            component: './pages/empty/index.tsx',
          }, {
            name: '数据库管理备份',//没有页面
            key: '013',
            path: '/empty',
            component: './pages/empty/index.tsx',
          },
          {
            name: '地图导入',
            key: '014',
            path: '/map-manager/map-import',
            component: './pages/map-manager/map-import/index.tsx',
          },
          {
            name: '灯具设置',
            key: '015',
            path: '/map-manager/lamps-set',
            component: './pages/map-manager/lamps-set/index.tsx',
          },
          {
            name: '信息牌导入',//没有页面
            key: '016',
            path: '/system-setting/message-card',
            component: './pages/system-setting/message-card/index.tsx',
          }, 
          {
            name: '区域设置',
            key: '017',
            path: '/map-manager/area-set',
            component: './pages/map-manager/area-set/index.tsx',
          }, {
            name: '人员类型',
            key: '018',
            path: '/system-setting/people-type',
            component: './pages/system-setting/people-type/index.tsx',
          },
        ],
      },
      {
        name: '值班员设置',
        key: '019',
        path: '/system-setting/super-admin',
        component: './pages/system-setting/super-admin/index.tsx',
        children: [
          {
            name: '任务规划',
            key: '020',
            path: '/info-card-manager/task-planning',
            component: './pages/info-card-manager/task-planning/index.tsx',
          },
          {
            name: '巡检点设置',
            key: '021',
            path: '/map-manager/polling-point',
            component: './pages/map-manager/polling-point/index.tsx',
          },
          {
            name: '巡检路线设置',
            key: '022',
            path: '/map-manager/polling-line',
            component: './pages/map-manager/polling-line/index.tsx',
          }, {
            name: '告警信息处理',//没有页面
            key: '023',
            path: '/empty',
            component: './pages/empty/index.tsx',
          }, {
            name: '告警类型设置',//没有页面
            key: '024',
            path: '/empty',
            component: './pages/empty/index.tsx',
          }, {
            name: '信息完善',//没有页面
            key: '025',
            path: '/empty',
            component: './pages/empty/index.tsx',
          }, {
            name: '外来人员信息录入',//没有页面
            key: '026',
            path: '/empty',
            component: './pages/empty/index.tsx',
          },

        ],
      },
    ],
  },

  {
    name: '应用',
    key: '027',
    icon: 'icon-polling1',
    path: 'use',
    component: 'use',
    children: [
      {
        name: '信息牌列表',
        key: '028',
        path: '/info-card-manager/info-card-list',
        component: './pages/info-card-manager/info-card-list/index.tsx',
      },
      {
        name: '人员定位',//没有页面
        key: '029',
        path: '/empty',
        component: './pages/empty/index.tsx',
      }, {
        name: '灯具展示',//没有页面
        key: '030',
        path: '/empty',
        component: './pages/empty/index.tsx',
      },
      {
        name: '历史轨迹',
        key: '031',
        path: '/statistics-query/statistics-history',
        component: './pages/statistics-query/statistics-history/index.tsx',
      }, {
        name: '区域查询',//没有页面
        key: '032',
        path: '/empty',
        component: './pages/empty/index.tsx',
      }, {
        name: '日志列表',
        key: '033',
        path: '/log-manager/log-list',
        component: './pages/log-manager/log-list/index.tsx',
      }, {
        name: '电子围栏',
        path: '/big-screen/dataview',
        component: './pages/big-screen/dataview',
      }, {
        name: '告警信息',
        key: '034',
        path: '/warning-manager/info',
        component: './pages/warning-manager/info/index.tsx',
      },
    ],
  },
  {
    name: '显示',
    key: '035',
    path: 'show',
    component: 'show',
    icon: 'icon-show1',
    children: [
      {
        key: '036',

        name: '实时位置',
        path: '/big-screen/homepage',
        component: './pages/big-screen/homepage',
      }, {
        name: '巡检列表',
        key: '037',
        path: '/route-inspect-manager/route-inspect-list',
        component: './pages/route-inspect-manager/route-inspect-list/index.tsx',
      },
      {
        name: '巡检报表',
        key: '038',
        path: '/route-inspect-manager/route-inspect-report',
        component: './pages/route-inspect-manager/route-inspect-report/index.tsx',
      }, {
        name: '历史告警',
        key: '039',
        path: '/warning-manager/history',
        component: './pages/warning-manager/history/index.tsx',
      },
      /************** ************** ************** ************** ************** ************** ************** ************** ************** */
      // {
      //   name: '用户列表-内部',
      //   key: '041',
      //   path: '/user-manager/user-inside',
      //   component: './pages/user-manager/user-inside/index.tsx',
      // },
      {
        name: '告警类型',
        key: '042',
        path: '/warning-manager/type',
        component: './pages/warning-manager/type/index.tsx',
      },
    ],
  },
];

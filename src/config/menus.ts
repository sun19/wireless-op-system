export const LEFT_MENUS = [
    {
        name: '设置',
        key: '001',
        icon: 'icon-system1',
        path: '',
        children: [
            {
                name: '高级管理员设置',
                key: '002',
                path: '',
                children: [
                    {
                        name: '系统设置',
                        key: '003',
                        path: '',
                        children: [
                            {
                                name: '字典设置', //没有页面
                                key: '004',
                                path: '/empty',
                            },
                            {
                                name: '菜单设置', //没有页面
                                key: '005',
                                path: '/empty',
                            },
                        ]
                    },
                    {
                        name: '系统管理员设置',
                        key: '006',
                        path: '',
                        children: [
                            {
                                name: '菜单权限', //没有页面
                                key: '007',
                                path: '/system-setting/people-type',
                            },
                            {
                                name: '用户信息', //没有页面
                                key: '008',
                                path: '/system-setting/customer-manager',
                            },
                        ]
                    },
                    {
                        name: '值班员设置', //没有页面
                        key: '009',
                        path: '',
                        children: [
                            {
                                name: '菜单权限', //没有页面
                                key: '003',
                                path: '/system-setting/people-type',
                            },
                            {
                                name: '用户信息', //没有页面
                                key: '010',
                                path: '/system-setting/customer-manager',
                            },
                        ]
                    },
                ],
            },
            {
                name: '系统管理员设置',
                key: '011',
                path: '',
                children: [
                    {
                        name: '完善信息', //没有页面
                        key: '012',
                        path: '/empty',
                    },
                    {
                        name: '内部人员信息录入',
                        key: '013',
                        path: '/user-manager/user-inside/add',
                        component: './pages/user-manager/user-inside/add.tsx',
                    },
                    {
                        name: '内部人员录入', //没有页面
                        key: '014',
                        path: '/empty',
                    },
                    {
                        name: '信息牌分配', //没有页面
                        key: '015',
                        path: '/info-card-manager/info-card-list',
                    },
                    {
                        name: '电子围栏设置',
                        key: '016',
                        path: '/map-manager/fence-setting',
                    },
                    {
                        name: '灯具设置',
                        key: '017',
                        path: '/map-manager/lamps-set',
                    },
                    {
                        name: '任务规划',
                        key: '018',
                        path: '/info-card-manager/task-planning',
                    },
                    {
                        name: '巡检点设置',
                        key: '019',
                        path: '/map-manager/polling-point',
                    },
                    {
                        name: '外来人员录入', //没有页面
                        key: '020',
                        path: '/empty',
                    },
                    {
                        name: '告警信息处理', //没有页面
                        key: '021',
                        path: '/empty',
                    },
                    {
                        name: '告警类型设置', //没有页面
                        key: '022',
                        path: '/empty',
                    },
                    {
                        name: '巡检路线设置',
                        key: '023',
                        path: '/map-manager/polling-line',
                    },
                    {
                        name: '区域设置',
                        key: '024',
                        path: '/map-manager/area-set',
                    },]
            },
            {
                name: '值班员设置',
                key: '025',
                path: '/system-setting/super-admin',
                children: [
                    {
                        name: '任务规划',
                        key: '026',
                        path: '/info-card-manager/task-planning',
                    },
                    {
                        name: '巡检点设置',
                        key: '027',
                        path: '/map-manager/polling-point',
                    }, {
                        name: '巡检路线设置',
                        key: '028',
                        path: '/map-manager/polling-line',
                    },
                    {
                        name: '告警信息处理', //没有页面
                        key: '029',
                        path: '/empty',
                    },
                    {
                        name: '告警类型设置', //没有页面
                        key: '030',
                        path: '/empty',
                    },
                    {
                        name: '信息完善', //没有页面
                        key: '031',
                        path: '/empty',
                    },
                    {
                        name: '外来人员信息录入', //没有页面
                        key: '032',
                        path: '/empty',
                    },
                ],
            },
        ],
    },
    {
        name: '应用',
        key: '033',
        icon: 'icon-polling1',
        path: '',
        children: [
            {
                name: '信息牌列表',
                key: '034',
                path: '/info-card-manager/info-card-list',
            },
            {
                name: '人员定位', //没有页面
                key: '035',
                path: '/empty',
            },
            {
                name: '灯具展示', //没有页面
                key: '036',
                path: '/empty',
            },
            {
                name: '历史轨迹',
                key: '037',
                path: '/statistics-query/statistics-history',
            },
            {
                name: '区域查询', //没有页面
                key: '038',
                path: '/empty',
            },
            {
                name: '日志列表',
                key: '039',
                path: '/log-manager/log-list',
            },
            {
                name: '电子围栏',
                key: '040',
                path: '/big-screen/dataview',
            },
            {
                name: '告警信息',
                key: '041',
                path: '/warning-manager/info',
            },
        ],
    },
    {
        name: '显示',
        key: '042',
        icon: 'icon-show1',
        path: '',
        children: [
            {
                key: '043',
                name: '实时位置',
                path: '/big-screen/homepage',
            },
            {
                name: '巡检列表',
                key: '044',
                path: '/route-inspect-manager/route-inspect-list',
            },
            {
                name: '巡检报表',
                key: '045',
                path: '/route-inspect-manager/route-inspect-report',
            },
            {
                name: '历史告警',
                key: '046',
                path: '/warning-manager/history',
            },
            {
                name: '告警类型',
                key: '047',
                path: '/warning-manager/type',
            },
        ],
    },
]

    // {
    //   name: '用户列表-内部',
    //   key: '041',
    //   path: '/user-manager/user-inside',
    // },
    // {
    //   name: '信息牌导入',
    //   key: '016',
    //   path: '/system-setting/message-card'
    // }

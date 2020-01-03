export const LEFT_MENUS = [
    {
        name: '设置',
        key: '1',
        icon: 'icon-system1',
        path: '',
        children: [
            {
                name: '高级管理员设置',
                key: '11',
                path: '',
                children: [
                    {
                        name: '系统设置',
                        key: '111',
                        path: '',
                        children: [
                            {
                                name: '字典设置',
                                key: '1111',
                                path: '/system-setting/super-admin',
                            },
                            {
                                name: '菜单设置', //没有页面
                                key: '1112',
                                path: '/menu-edit/',
                            },
                        ]
                    },
                    {
                        name: '系统管理员设置',
                        key: '112',
                        path: '',
                        children: [
                            {
                                name: '菜单权限',
                                key: '1121',
                                path: '/system-setting/people-type',
                            },
                            {
                                name: '用户信息',
                                key: '1122',
                                path: '/system-setting/customer-manager',
                            },
                        ]
                    },
                    {
                        name: '值班员设置',
                        key: '113',
                        path: '',
                        children: [
                            {
                                name: '菜单权限',
                                key: '1131',
                                path: '/system-setting/people-type-sub',
                            },
                            {
                                name: '用户信息',
                                key: '1132',
                                path: '/system-setting/customer-manager-sub',
                            },
                        ]
                    },
                ],
            },
            {
                name: '系统管理员设置',
                key: '12',
                path: '',
                children: [
                    {
                        name: '值班员设置',
                        key: '1201',
                        path: '',
                        children: [
                            {
                                name: '菜单权限',
                                key: '120101',
                                path: '/system-setting/people-type-sub',
                            },
                            {
                                name: '用户信息',
                                key: '120102',
                                path: '/system-setting/customer-manager-sub',
                            },
                        ]
                    },
                    {
                        name: '完善信息',
                        key: '1202',
                        path: '/user-manager/user-complete',
                    },
                    {
                        name: '地图导入',
                        key: '1203',
                        path: '/map-manager/map-import',
                        component: './pages/map-manager/map-import/index.tsx',
                    },
                    {
                        name: '内部人员信息录入',
                        key: '1204',
                        path: '/user-manager/user-inside/add',
                        component: './pages/user-manager/user-inside/add.tsx',
                    },
                    {
                        name: '内部人员录入',
                        key: '1205',
                        path: '/user-manager/user-inside',
                    },
                    {
                        name: '信息牌分配',
                        key: '1206',
                        path: '/info-card-manager/info-card-list',
                    },
                    {
                        name: '信息牌设置',
                        key: '1207',
                        path: '/system-setting/message-card'
                    },
                    {
                        name: '电子围栏设置',
                        key: '1208',
                        path: '/map-manager/fence-setting',
                    },
                    {
                        name: '灯具设置',
                        key: '1209',
                        path: '/map-manager/lamps-set',
                    },
                    {
                        name: '任务规划',
                        key: '1210',
                        path: '/info-card-manager/task-planning',
                    },
                    {
                        name: '巡检点设置',
                        key: '1211',
                        path: '/map-manager/polling-point',
                    },
                    {
                        name: '外来人员录入',
                        key: '1212',
                        path: '/user-manager/user-outside',
                    },
                    {
                        name: '告警信息处理',
                        key: '1213',
                        path: '/warning-manager/info',
                    },
                    {
                        name: '告警类型设置',
                        key: '1214',
                        path: '/warning-manager/type',
                    },
                    {
                        name: '巡检路线设置',
                        key: '1215',
                        path: '/map-manager/polling-line',
                    },
                    {
                        name: '责任区',
                        key: '1216',
                        path: '/map-manager/duty-area',
                    },
                    {
                        name: '禁止区',
                        key: '1217',
                        path: '/map-manager/prohibit-area',
                    },
                    {
                        name: '区域设置',
                        key: '1218',
                        path: '/map-manager/area-set',
                    },]
            },
            {
                name: '值班员设置',
                key: '13',
                path: '',
                children: [
                    {
                        name: '任务规划',
                        key: '131',
                        path: '/info-card-manager/task-planning',
                    },
                    {
                        name: '巡检点设置',
                        key: '132',
                        path: '/map-manager/polling-point',
                    }, {
                        name: '巡检路线设置',
                        key: '133',
                        path: '/map-manager/polling-line',
                    },
                    {
                        name: '告警信息处理',
                        key: '134',
                        path: '/warning-manager/info',
                    },
                    {
                        name: '告警类型设置',
                        key: '135',
                        path: '/warning-manager/type',
                    },
                    {
                        name: '信息完善', //没有页面
                        key: '136',
                        path: '/user-manager/user-complete',
                    },
                    {
                        name: '外来人员信息录入', //没有页面
                        key: '137',
                        path: '/user-manager/user-outside',
                    },
                ],
            },
        ],
    },
    {
        name: '应用',
        key: '2',
        icon: 'icon-polling1',
        path: '',
        children: [
            {
                name: '信息牌列表',
                key: '21',
                path: '/info-card-manager/info-card-list',
            },
            {
                name: '人员定位',
                key: '22',
                path: '/big-screen/homepage',
            },
            {
                name: '灯具展示',
                key: '23',
                path: '/big-screen/homepage/lampshow',
            },
            {
                name: '历史轨迹',
                key: '24',
                path: '/statistics-query/statistics-history',
            },
            {
                name: '区域查询',
                key: '25',
                path: '/map-manager/area-set',
            },
            {
                name: '日志列表',
                key: '26',
                path: '/log-manager/log-list',
            },
            {
                name: '电子围栏',
                key: '27',
                path: '/big-screen/dataview',
            },
            {
                name: '告警信息',
                key: '28',
                path: '/warning-manager/info',
            },
        ],
    },
    {
        name: '显示',
        key: '3',
        icon: 'icon-show1',
        path: '',
        children: [
            {
                key: '31',
                name: '实时位置',
                path: '/big-screen/homepage',
            },
            {
                name: '巡检列表',
                key: '32',
                path: '/route-inspect-manager/route-inspect-list',
            },
            {
                name: '巡检报表',
                key: '33',
                path: '/route-inspect-manager/route-inspect-report',
            },
            {
                name: '历史告警',
                key: '34',
                path: '/warning-manager/history',
            },
            {
                name: '告警类型',
                key: '35',
                path: '/warning-manager/type',
            },
        ],
    },
]

// 'info-card-statistics' 统计
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

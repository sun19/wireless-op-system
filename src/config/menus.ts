
export const Menus = [
    {
        name: 'login',
        path: '/',
        // component: './pages/index.js'
    },
    {
        name:'系统设置',
        path: 'system-setting',
        component: './pages/system-setting',
        children:[
            {
                name: '用户管理',
                path: 'system-setting/customer-manager',
                component: './pages/system-setting/customer-manager/index.js'
            }, {
                name: '人员类型',
                path: 'system-setting/people-type',
                component: './pages/system-setting/people-type/index.js'
            },
            {
                name: '信息牌设置',
                path: 'system-setting/message-card',
                component: './pages/system-setting/message-card/index.js'
            },
            {
                name: '超级管理员设置',
                path: 'system-setting/super-admin',
                component: './pages/system-setting/super-admin/index.js'
            },
        ]
    },
   {
        name: '人员管理',
        path: 'user-manager',
        component: './pages/user-manager',
        children: [
            {
                name: '用户列表-内部',
                path: 'user-manager/user-inside',
                component: './pages/user-manager/user-inside/index.js'
            }, {
                name: '用户列表-外部',
                path: 'user-manager/user-outside',
                component: './pages/user-manager/user-outside/index.js'
            },
        ]
    },
    {
        name: '信息牌管理',
        path: 'info-card-manager',
        component: './pages/info-card-manager',
        children: [
            {
                name: '信息牌列表',
                path: 'info-card-manager/info-card-list',
                component: './pages/info-card-manager/info-card-list/index.js'
            }, {
                name: '任务规划',
                path: 'info-card-manager/task-planning',
                component: './pages/info-card-manager/task-planning/index.js'
            },
        ]
    }, {
        name: '地图管理',
        path: 'map-manager',
        component: './pages/map-manager',
        children: [
            {
                name: '地图导入',
                path: 'map-manager/map-import',
                component: './pages/map-manager/map-import/index.js'
            }, {
                name: '区域设置',
                path: 'map-manager/area-set',
                component: './pages/map-manager/area-set/index.js'
            }, {
                name: '电子围栏设置',
                path: 'map-manager/fence-setting',
                component: './pages/map-manager/fence-setting/index.js'
            }, {
                name: '灯具设置',
                path: 'map-manager/lamps-set',
                component: './pages/map-manager/lamps-set/index.js'
            }, {
                name: '巡检点设置',
                path: 'map-manager/polling-point',
                component: './pages/map-manager/polling-point/index.js'
            }, {
                name: '巡检路线设置',
                path: 'map-manager/polling-line',
                component: './pages/map-manager/polling-line/index.js'
            },
        ]
    }, {
        name: '告警管理',
        path: 'warning-manager',
        component: './pages/warning-manager',
        children: [
            {
                name: '告警类型',
                path: 'warning-manager/type',
                component: './pages/warning-manager/type/index.js'
            }, {
                name: '告警信息',
                path: 'warning-manager/info',
                component: './pages/warning-manager/info/index.js'
            }, {
                name: '历史告警',
                path: 'warning-manager/history',
                component: './pages/warning-manager/history/index.js'
            },
        ]
    }, {
        name: '巡检管理',
        path: 'route-inspect-manager',
        component: './pages/route-inspect-manager',
        children: [
            {
                name: '巡检列表',
                path: 'route-inspect-manager/route-inspect-list',
                component: './pages/route-inspect-manager/route-inspect-list/index.js'
            }, {
                name: '巡检报表',
                path: 'route-inspect-manager/route-inspect-report',
                component: './pages/route-inspect-manager/route-inspect-report/index.js'
            }, 
        ]
    }, {
        name: '日志管理',
        path: 'log-manager',
        component: './pages/log-manager',
        children: [
            {
                name: '日志列表',
                path: 'log-manager/log-list',
                component: './pages/log-manager/log-list/index.js'
            },  
        ]
    }, {
        name: '大屏展示',
        path: 'big-screen',
        component: './pages/big-screen',
        // children: [
        //     {
        //         name: '大屏展示',
        //         path: 'big-screen/info-card-list',
        //         component: './pages/users/index.js'
        //     },
        // ]
    }, {
        name: '统计查询',
        path: 'statistics-query',
        component: './pages/statistics-query',
        children: [
            {
                name: '历史轨迹',
                path: 'statistics-query/statistics-history',
                component: './pages/statistics-query/statistics-history/index.js'
            },
        ]
    },
]

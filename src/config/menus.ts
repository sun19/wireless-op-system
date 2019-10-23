export const menus = [
    {
        name: 'login',
        path: '/',
        // component: './pages/index.js'
    },
    {
        name:'系统设置',
        path: '/system-setting',
        component: './pages/system-setting',
        children:[
            {
                name: '用户管理',
                path: '/system-setting/customer-manager',
                component: './pages/users/index.js'
            }, {
                name: '人员类型',
                path: '/system-setting/people-type',
                component: './pages/users/index.js'
            },
            {
                name: '信息牌设置',
                path: '/system-setting/message-card',
                component: './pages/users/index.js'
            },
            {
                name: '超级管理员设置',
                path: '/system-setting/super-admin',
                component: './pages/users/index.js'
            },
        ]
    },
   {
        name: '人员管理',
        path: '/user-manager',
        component: './pages/user-manager',
        children: [
            {
                name: '用户列表-内部',
                path: '/user-manager/user-inside',
                component: './pages/users/index.js'
            }, {
                name: '用户列表-外部',
                path: '/user-manager/user-outside',
                component: './pages/users/index.js'
            },
        ]
    },
    {
        name: '信息牌管理',
        path: '/info-card-manager',
        component: './pages/info-card-manager',
        children: [
            {
                name: '信息牌列表',
                path: '/info-card-manager/info-card-list',
                component: './pages/users/index.js'
            }, {
                name: '任务规划',
                path: '/info-card-manager/task-planning',
                component: './pages/users/index.js'
            },
        ]
    }, {
        name: '地图管理',
        path: '/info-card-manager',
        component: './pages/info-card-manager',
        children: [
            {
                name: '地图导入',
                path: '/info-card-manager/info-card-list',
                component: './pages/users/index.js'
            }, {
                name: '区域设置',
                path: '/info-card-manager/task-planning',
                component: './pages/users/index.js'
            },
        ]
    }
]

import { LEFT_MENUS } from '../config/menus';

export default {
  namespace: 'menu',
  state: {
    menus: LEFT_MENUS,
    rootKeys: LEFT_MENUS.map(item => item.name),
    current: '1',
    defaultSelectedKeys: '用户管理',
    openKeys: LEFT_MENUS.map(item => item.name)[0],
  },
  reducers: {
    changeOpen(state, { payload }) {
      return { ...state, ...payload };
    },
    clickMenuItem(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

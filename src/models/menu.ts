import { LEFT_MENUS } from '../config/menus';


// export default {
//   namespace: 'menu',
//   state: {
//     menus: LEFT_MENUS,
//     rootKeys: [],
//     current: '1',
//     openKeys: []
//   },
//   reducers: {
//     changeOpen(state, { payload }) {
//       return { ...state, ...payload };
//     },
//     clickMenuItem(state, { payload }) {
//       return {
//         ...state,
//         ...payload,
//       };
//     },
//   },
// };

export default {
  namespace: 'menu',
  state: {
    menus: [],
    rootKeys: [],
    current: '1',
    openKeys: []
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

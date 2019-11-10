export default {
  namespace: 'wraningManager',
  state: {
    type:{},
    info:{},
   history:{},
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

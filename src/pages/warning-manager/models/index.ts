export default {
  namespace: 'warningManager',
  state: {
    type: {},
    info: {},
    history: {},
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

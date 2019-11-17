export default {
  namespace: 'logManager',
  state: {
    logList: {},
  },
  reducers: {
    update(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

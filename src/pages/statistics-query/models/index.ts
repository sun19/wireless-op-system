export default {
  namespace: 'statisticsQuery',
  state: {
    type: {},
    info: {},
    history: {},
    historyRecord: {},
    roles: [],
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

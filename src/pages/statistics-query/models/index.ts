export default {
  namespace: 'statisticsQuery',
  state: {
    type: {},
    info: {},
    history: {},
    roles:[]
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

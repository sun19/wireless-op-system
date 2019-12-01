export default {
  namespace: 'routeInspect',
  state: {
    routeInspectList: {},
    routeInspectReports: {},
    historyRecord:{}
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

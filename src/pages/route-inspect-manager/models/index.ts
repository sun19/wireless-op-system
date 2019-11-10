export default {
  namespace: 'routeInspect',
  state: {
    routeInspectList: {},
    routeInspectReports: {},
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

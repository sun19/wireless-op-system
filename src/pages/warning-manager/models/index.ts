export default {
  namespace: 'warningManager',
  state: {
    type: {},
    typeRecord: {},
    info: {},
    history: {},
    maps: [],
    areas: [],
    warningTypes: [],
    repeatTypes: [],
    dataSource:{}
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

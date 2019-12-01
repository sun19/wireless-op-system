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
    lampsType: [],
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

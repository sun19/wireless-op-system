export default {
  namespace: 'warningManager',
  state: {
    type: {},
    info: {},
    history: {},
    maps: [],
    areas: [],
    warningTypes: [],
    repeatTypes: [],
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

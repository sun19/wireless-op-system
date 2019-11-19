export default {
  namespace: 'warningManager',
  state: {
    type: {},
    info: {},
    history: {},
    maps: [],
    areas: [],
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

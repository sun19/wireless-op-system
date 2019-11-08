export default {
  namespace: 'mapManager',
  state: {
    mapImport: {},
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

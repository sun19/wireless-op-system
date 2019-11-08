export default {
  namespace: 'mapManager',
  state: {
    mapImport: {},
    mapArea: {},
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

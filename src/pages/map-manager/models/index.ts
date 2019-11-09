export default {
  namespace: 'mapManager',
  state: {
    mapImport: {},
    mapArea: {},
    mapFencing: {},
    lamps: {},
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

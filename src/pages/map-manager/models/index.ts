export default {
  namespace: 'mapManager',
  state: {
    mapImport: {},
    mapArea: {},
    mapFencing: {},
    lamps: {},
    pollingPoints: {},
    pollingLines: {},
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

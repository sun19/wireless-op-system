export default {
  namespace: 'mapManager',
  state: {
    mapImport: {},
    mapArea: {},
    mapFencing: {},
    lamps: {},
    pollingPoints: {},
    pollingLines: {},
    fenceAdd:{}
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

export default {
  namespace: 'mapManager',
  state: {
    mapImport: {},
    mapArea: {},
    mapFencing: {},
    lamps: {},
    pollingPoints: {},
    pollingLines: {},
    allMaps: [],
    fencingTypes: [],
    users: [],
    levels: [],
    areas: [],
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

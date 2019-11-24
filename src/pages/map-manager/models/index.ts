export default {
  namespace: 'mapManager',
  state: {
    mapImport: {},
    mapArea: {},
    mapAreaRecord: {},
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

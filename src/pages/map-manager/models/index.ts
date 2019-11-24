export default {
  namespace: 'mapManager',
  state: {
    mapImport: {},
    mapArea: {},
    mapAreaRecord: {},
    mapFencing: {},
    lamps: {},
    lampRecord: {},
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

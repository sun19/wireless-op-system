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
    pollingPointsRecord: {},
    pollingLines: {},
    pollingLinesRecord: {},
    allMaps: [],
    fencingTypes: [],
    fencingTypesRecord: [],
    users: [],
    levels: [],
    areas: [],
    lampsType: [],
    warningTypes: [],
    repeatTypes: [],
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

export default {
  namespace: 'commonState',
  state: {
    allUserInfo: [],
    allMap: [],
    allRoles: [],
    allLevels: [],
    allFencingTypes: [],
    allAreas: [],
    allDuties: [],
    allSecretLevel: [],
    route:[],
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

export default {
  namespace: 'commonState',
  state: {
    allUserInfo: {},
    allMap: {},
    allRoles: {},
    allLevels: {},
    allFencingTypes: {},
    allAreas: {},
    allDuties: {},
    allSecretLevel: {},
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

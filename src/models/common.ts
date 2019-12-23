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
    route: [],
    wsInfo: {},
    userInfoList: [],
    userInfoNumber:''
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

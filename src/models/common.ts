export default {
  namespace: 'commonState',
  state: {
    allUserInfo: {},
    allMap: {},
    allRoles: {},
    allLevels: {},
    allFencingTypes: {},
    allAreas: {},
  },
  reducers: {
    update(state, parload) {
      return { ...state, ...parload };
    },
  },
};

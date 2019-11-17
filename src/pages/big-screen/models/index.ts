export default {
  namespace: 'bigScreen',
  state: {
    bigScreenPeopleCount: {},
    secretLevelPeopleCount: [],
    bigScreenDepartmentPeopleCount: {},
    positionPeopleCount: [],
    historyWarns: {},
    innerOuterPeople: [],
  },
  reducers: {
    update(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

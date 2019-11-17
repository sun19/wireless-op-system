export default {
  namespace: 'bigScreen',
  state: {
    bigScreenPeopleCount: {},
    secretLevelPeopleCount: [],
    bigScreenDepartmentPeopleCount: {},
    positionPeopleCount: [],
    historyWarns: {},
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

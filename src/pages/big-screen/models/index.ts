export default {
  namespace: 'bigScreen',
  state: {
    bigScreenPeopleCount: {},
    secretLevelPeopleCount: [],
    bigScreenDepartmentPeopleCount: {},
    positionPeopleCount: [],
    historyWarns: {},
    warningTypeInfo:{},//告警类型统计
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

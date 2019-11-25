export default {
  namespace: 'bigScreen',
  state: {
    bigScreenPeopleCount: {},
    secretLevelPeopleCount: [],
    bigScreenDepartmentPeopleCount: {},
    positionPeopleCount: [],
    historyWarns: {},
    innerOuterPeople: [],
    warningTypeInfo: [], //告警类型统计
    eleFenceInfo:[],//电子围栏
    eleTypeInfo: [],//电子围栏类型
    stayTimeInfo: [],//获取大屏停留时长
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

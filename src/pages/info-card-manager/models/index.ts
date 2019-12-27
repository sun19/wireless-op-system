export default {
  namespace: 'infoCardManager',
  state: {
    customManager: {},
    taskPlan: {},
    infoCard: {},
    superAdmin: {},
    peopleType: {},
    infoCardList:{},
    allPosition:{},
    editData:{},
    userInfoList: [],
    informationCardList:[],
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

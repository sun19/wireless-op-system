export default {
  namespace: 'infoCardManager',
  state: {
    customManager: {},
    taskPlan: {},
    infoCard: {},
    superAdmin: {},
    peopleType: {},
    infoCardList:{},
    allPosition:{}
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

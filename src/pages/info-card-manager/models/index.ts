export default {
  namespace: 'infoCardManager',
  state: {
    customManager: {},
    taskPlan: {},
    infoCard: {},
    superAdmin: {},
    peopleType: {},
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

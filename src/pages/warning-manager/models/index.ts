export default {
  namespace: 'infoCardManager',
  state: {
    customManager: {},
    taskPlan: {},
    infoCard: {},
    superAdmin: {},
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

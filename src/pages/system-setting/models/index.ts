export default {
  namespace: 'systemSetting',
  state: {
    customManager: {},
    peopleType: {},
    infoCard: {},
    superAdmin: {},
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

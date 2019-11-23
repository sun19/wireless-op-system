export default {
  namespace: 'systemSetting',
  state: {
    customManager: {},
    customManagerRecord: {},
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

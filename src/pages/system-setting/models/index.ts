export default {
  namespace: 'systemSetting',
  state: {
    customManager: {},
    customManagerRecord: {},
    peopleType: {},
    peopleTypeRecord: {},
    infoCard: {},
    superAdmin: {},
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

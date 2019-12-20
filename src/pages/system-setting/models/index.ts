export default {
  namespace: 'systemSetting',
  state: {
    customManager: {},
    customManagerRecord: {},
    peopleTypeRecord: {},
    peopleType: {},
    infoCard: {},
    messageCard: {},
    superAdmin: {},
    superAdminRecord: {},
    companyName:{},
    companyNameRecord: {},
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

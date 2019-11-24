export default {
  namespace: 'systemSetting',
  state: {
    customManager: {},
    customManagerRecord: {},
    peopleTypeRecord:{},
    peopleType: {},
    peopleTypeRecord: {},
    infoCard: {},
    messageCard:{},
    superAdmin: {},
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

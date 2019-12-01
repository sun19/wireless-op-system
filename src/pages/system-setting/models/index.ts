export default {
  namespace: 'systemSetting',
  state: {
    customManager: {},
    customManagerRecord: {},
    peopleTypeRecord:{},
    peopleType: {},
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

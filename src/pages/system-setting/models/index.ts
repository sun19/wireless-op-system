export default {
  namespace: 'systemSetting',
  state: {
    customManager: {},
    peopleType: {},
    infoCard: {},
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

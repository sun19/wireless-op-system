export default {
  namespace: 'infoCardManager',
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

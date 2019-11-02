export default {
  namespace: 'systemSetting',
  state: {
    customManager: {},
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

export default {
  namespace: 'userManager',
  state: {
    innerUserList: {},
    outerUserList: {},
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

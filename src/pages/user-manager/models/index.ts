export default {
  namespace: 'userManager',
  state: {
    innerUserList: {},
    outerUserList: {},
    userInside:{}
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

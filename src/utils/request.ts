import { extend } from 'umi-request';

const request = extend({
  params: {
    pageSize: 999999,
    pageNo: 1,
  },
});

export default request;

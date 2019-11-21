import { extend } from 'umi-request';

const request = extend({
  params: {
    pageSize: 999999,
    pageNo: 1,
  },
  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
});

export const format = details => {
  const formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&');
};

export default request;

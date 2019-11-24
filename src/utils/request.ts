import { extend } from 'umi-request';
import * as _ from 'lodash';

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
    let value = details[property];

    if (_.isNil(value)) {
      value = '';
    } else if (_.isObject(value) || _.isArray(value)) {
      value = JSON.stringify(value);
    }
    var encodedValue = encodeURIComponent(value);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&');
};

export default request;

import request from 'umi-request';

import {
  GET_INFO_LIST,
  DEL_INFO_LIST,
  GET_INFO_DETIAL,
  ADD_INFO_LIST,
  EXPORT_INFO_IN,
  EXPORT_INFO_OUT

} from '@/config/api';
import {
  GetInfoListParams,
  DeleteInfo,
  GetInfoDetial,
  AddInfoList,
} from './index.interfaces';

// 信息牌列表
export async function getInfoListParams(params: GetInfoListParams) {
  const resp = await request.get(GET_INFO_LIST, { params });
  return resp.result;
}
// 信息牌删除

export async function deleteInfo(data: DeleteInfo) {
  const resp = await request.delete(DEL_INFO_LIST, {
    data,
  });
  return resp.success === true && resp.code === 200;
}
// 查看详情
export async function getInfoDetial(data: GetInfoDetial) {
  const resp = await request.post(GET_INFO_DETIAL, {
    data,
  });
  return resp.result;

}
// 信息牌添加
export async function addInfoList(data: AddInfoList) {
  const resp = await request.post(ADD_INFO_LIST, {
    data,
  });
  return resp.success === true && resp.code === 200;
}

// 导入
export async function exportIn() {
  const resp = await request.post(EXPORT_INFO_IN);
  return resp.success === true && resp.code === 200;
}
// 导出
export async function exportOut() {
  const resp = await request.post(EXPORT_INFO_OUT);
  return resp.success === true && resp.code === 200;
}


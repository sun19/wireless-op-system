import request, { format } from '@/utils/request';
import { message } from 'antd';

import {
  // 告警类型
  WARNING_TYPE_SEARCH,
  WARNING_TYPE_ADD,
  WARNING_TYPE_EDIT,
  WARNING_TYPE_DEL,
  // 告警信息
  WARNING_INFO_SEARCH,
  WARNING_INFO_DEAL,
  // 告警历史
  WARNING_HISTORY_SEARCH,
  COMMON_GET_ALL_MAP,
  COMMON_GET_ALL_AREAS,
} from '@/config/api';
import {
  WarningTypeSearch,
  WraningTypeAdd,
  WraningTypeEdit,
  WraningTypeDel,
  //
  WarningInfoSearch,
  WarningInfoDeal,
  //
  WarningHistorySearch,
} from './index.interfaces';

/************************************类型******************************** */

// 查询
export async function warningTypeSearch(params: WarningTypeSearch) {
  const resp = await request.get(WARNING_TYPE_SEARCH, { params });
  return resp.result;
}
// 添加
export async function wraningTypeAdd(data: WraningTypeAdd) {
  const resp = await request.post(WARNING_TYPE_ADD, {
    data: format(data),
  });
  return resp.success === true && resp.code === 200;
}
// 编辑

export async function wraningTypeEdit(data: WraningTypeEdit) {
  const resp = await request.post(WARNING_TYPE_EDIT, {
    data: format(data),
  });
  return resp.result;
}

// 删除
export async function wraningTypeDel(data: WraningTypeDel) {
  const resp = await request.post(WARNING_TYPE_DEL, {
    data: format(data),
  });
  if (resp.code == 500) {
    message.error(`${resp.message}`);
  }
  return resp.success === true && resp.code === 200;
}
/***********************************************告警管理： 告警信息********************** */

// 查询
export async function warningInfoSearch(params: WarningInfoSearch) {
  const resp = await request.get(WARNING_INFO_SEARCH, { params });
  return resp.result;
}
// 处理
export async function warningInfoDeal(data: WarningInfoDeal) {
  const resp = await request.post(WARNING_INFO_DEAL, { data: format(data) });
  return resp.success === true && resp.code === 200;
}

/***********************************************告警管理： 告警历史********************** */

// 查询
export async function warningHistorySearch(params: WarningHistorySearch) {
  const resp = await request.get(WARNING_HISTORY_SEARCH, { params });
  if (resp.code == 500 || !resp) {
    message.error(`${resp.message}`);
  }
  return resp.result;
}

/*******************************  通用接口****************************** */

export async function getAllMaps() {
  const resp = await request.get(COMMON_GET_ALL_MAP);
  return resp;
}

export async function getAllAreas() {
  const resp = await request.get(COMMON_GET_ALL_AREAS);
  return resp;
}

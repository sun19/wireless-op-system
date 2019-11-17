import request from 'umi-request';
import { message } from 'antd';

import {
  // 历史轨迹
  GET_STATISTICS_HISTORY_LIST,
  GET_ALL_ROLES
} from '@/config/api';
import {
  SatisticsHistory
} from './index.interfaces';

/************************************类型******************************** */

// 获取列表
export async function getSatisticsHistory(params: SatisticsHistory) {
  const resp = await request.get(GET_STATISTICS_HISTORY_LIST, { params });
  return resp.result;
}

// 
export async function getAllRoles() {
  const resp = await request.get(GET_ALL_ROLES);
  // console.log(resp)
  return resp;
}

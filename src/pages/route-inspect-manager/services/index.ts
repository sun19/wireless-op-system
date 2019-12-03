import request, { format } from '@/utils/request';
import { message } from 'antd';

import {
  INSPECT_MANAGER_SEARCH,
  INSPECT_MANAGER_DETAIL,
  INSPECT_MANAGER_LIST_SEARCH,
  NEW_INSPECT_MANAGER_LIST_SEARCH
} from '@/config/api';
import {
  GetInspectListParams,
  GetInspectDetailParams,
  GetInspectReportsParams,
} from './index.interfaces';

export async function getInspectList(params: GetInspectListParams) {
  const resp = await request.get(INSPECT_MANAGER_SEARCH, { params });
  return resp;
}

export async function getInspectDetail(params: GetInspectDetailParams) {
  const resp = await request.post(INSPECT_MANAGER_DETAIL, { data: params });
  resp.success === true && resp.code === 200
    ? message.success(`${resp.message}`)
    : message.error(`${resp.message}`);
  return resp.success === true && resp.code === 200;
}

export async function getInspectReports(params: GetInspectReportsParams) {
  const resp = await request.get(INSPECT_MANAGER_LIST_SEARCH, { params });
  return resp;
}
export async function queryInspectionReportByTime(params: GetInspectReportsParams) {
  const resp = await request.get(NEW_INSPECT_MANAGER_LIST_SEARCH, { params });
  return resp;
}

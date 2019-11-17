import request from 'umi-request';

import { GET_LOG_LIST } from '@/config/api';
import { GetLogListParams } from './index.interface';

export async function getLogList(params: GetLogListParams) {
  const resp = await request.get(GET_LOG_LIST, { params });
  return resp;
}

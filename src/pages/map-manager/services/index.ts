import request from 'umi-request';
import { message } from 'antd';

import {
  MAP_MANAGER_AREA_SETTING_ADD,
  MAP_MANAGER_AREA_SETTING_DELETE,
  MAP_MANAGER_AREA_SETTING_QUERY,
  MAP_MANAGER_AREA_SETTING_UPDATE,
} from '@/config/api';
import { GetMapAreaParams, UpdateMapAreaParams, DeleteMapAreaParams } from './index.interface';

export async function getMapArea(params: GetMapAreaParams) {
  const resp = await request.get(MAP_MANAGER_AREA_SETTING_QUERY, { params });
  return resp;
}

export async function updateMapArea(params: UpdateMapAreaParams) {
  const resp = await request.post(MAP_MANAGER_AREA_SETTING_UPDATE, { data: params });
  resp.success === true && resp.code === 200
    ? message.success(resp.message)
    : message.error(resp.message);
  return resp.success === true && resp.code === 200;
}

export async function deleteMapArea(params: DeleteMapAreaParams) {}

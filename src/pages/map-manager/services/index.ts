import request from 'umi-request';
import { message } from 'antd';

import {
  MAP_MANAGER_AREA_SETTING_ADD,
  MAP_MANAGER_AREA_SETTING_DELETE,
  MAP_MANAGER_AREA_SETTING_QUERY,
  MAP_MANAGER_AREA_SETTING_UPDATE,
  MAP_MANAGER_FENCING_SETTING_ADD,
  MAP_MANAGER_FENCING_SETTING_CONNECT,
  MAP_MANAGER_FENCING_SETTING_UPDATE,
  MAP_MANAGER_FENCING_SETTING_DELETE,
  MAP_MANAGER_FENCING_SETTING_QUERY,
  MAP_MANAGER_LAMP_SETTING_ADD,
  MAP_MANAGER_LAMP_SETTING_DELETE,
  MAP_MANAGER_LAMP_SETTING_QUERY,
  MAP_MANAGER_LAMP_SETTING_UPDATE,
} from '@/config/api';
import {
  GetMapAreaParams,
  UpdateMapAreaParams,
  DeleteMapAreaParams,
  AddMapFencingAreaParams,
  AddMapFencingConnectUserParams,
  DeleteFencingAreaParams,
  QueryFencingAreaParams,
  UpdateFencingAreaParams,
  GetMapLampsParams,
  AddMapLampsParams,
  UpdateMapLampsParams,
  DeleteMapLampsParams,
} from './index.interface';

export async function getMapArea(params: GetMapAreaParams) {
  let resp = await request.get(MAP_MANAGER_AREA_SETTING_QUERY, { params });
  return resp;
}

export async function updateMapArea(params: UpdateMapAreaParams) {
  const resp = await request.post(MAP_MANAGER_AREA_SETTING_UPDATE, { data: params });
  resp.success === true && resp.code === 200
    ? message.success(resp.message)
    : message.error(resp.message);
  return resp.success === true && resp.code === 200;
}

export async function deleteMapArea(params: DeleteMapAreaParams) {
  const resp = await request.delete(MAP_MANAGER_AREA_SETTING_DELETE, { data: params });
  resp.success === true && resp.code === 200
    ? message.success(resp.message)
    : message.error(resp.message);
  return resp.success === true && resp.code === 200;
}

export async function addMapFencingArea(params: AddMapFencingAreaParams) {
  const resp = await request.post(MAP_MANAGER_FENCING_SETTING_ADD, { data: params });
  resp.success === true && resp.code === 200
    ? message.success(resp.message)
    : message.error(resp.message);
  return resp.success === true && resp.code === 200;
}

export async function addMapFencingConnectUser(params: AddMapFencingConnectUserParams) {
  const resp = await request.post(MAP_MANAGER_FENCING_SETTING_CONNECT, { data: params });
  resp.success === true && resp.code === 200
    ? message.success(resp.message)
    : message.error(resp.message);
  return resp.success === true && resp.code === 200;
}

export async function deleteFencingArea(params: DeleteFencingAreaParams) {
  const resp = await request.delete(MAP_MANAGER_FENCING_SETTING_DELETE, { data: params });
  resp.success === true && resp.code === 200
    ? message.success(resp.message)
    : message.error(resp.message);
  return resp.success === true && resp.code === 200;
}

export async function queryFencingArea(params: QueryFencingAreaParams) {
  const resp = await request.get(MAP_MANAGER_FENCING_SETTING_QUERY, { params });
  return resp;
}

export async function updateFencingArea(params: UpdateFencingAreaParams) {
  const resp = await request.post(MAP_MANAGER_FENCING_SETTING_UPDATE, { data: params });
  resp.success === true && resp.code === 200
    ? message.success(resp.message)
    : message.error(resp.message);
  return resp.success === true && resp.code === 200;
}

export async function getMapLamps(params: GetMapLampsParams) {
  const resp = await request.get(MAP_MANAGER_LAMP_SETTING_QUERY, { params: params });
  return resp;
}

export async function addMapLamps(params: AddMapLampsParams) {
  const resp = await request.post(MAP_MANAGER_LAMP_SETTING_ADD, { data: params });
  resp.success === true && resp.code === 200
    ? message.success(resp.message)
    : message.error(resp.message);
  return resp.success === true && resp.code === 200;
}

export async function updateMapLamps(params: UpdateMapLampsParams) {
  const resp = await request.post(MAP_MANAGER_LAMP_SETTING_UPDATE, { data: params });
  resp.success === true && resp.code === 200
    ? message.success(resp.message)
    : message.error(resp.message);
  return resp.success === true && resp.code === 200;
}

export async function deleteMapLamps(params: DeleteMapLampsParams) {
  const resp = await request.delete(MAP_MANAGER_LAMP_SETTING_DELETE, { data: params });
  resp.success === true && resp.code === 200
    ? message.success(resp.message)
    : message.error(resp.message);
  return resp.success === true && resp.code === 200;
}

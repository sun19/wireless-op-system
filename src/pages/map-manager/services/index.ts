import request, { format } from '@/utils/request';
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
  MAP_MANAGER_POLLING_POINT_ADD,
  MAP_MANAGER_POLLING_POINT_DELETE,
  MAP_MANAGER_POLLING_POINT_QUERY,
  MAP_MANAGER_POLLING_POINT_UPDATE,
  MAP_MANAGER_POLLING_POINT_DETAIL,
  MAP_MANAGER_POLLING_LINE_QUERY,
  MAP_MANAGER_POLLING_LINE_ADD,
  MAP_MANAGER_POLLING_LINE_DELETE,
  MAP_MANAGER_POLLING_LINE_UPDATE,
  MAP_MANAGER_POLLING_LINE_DETAIL,
  GET_SUPER_ADMIN_LIST,
} from '@/config/api';
import {
  GetMapAreaParams,
  UpdateMapAreaParams,
  DeleteMapAreaParams,
  AddMapAreaParams,
  AddMapFencingAreaParams,
  AddMapFencingConnectUserParams,
  DeleteFencingAreaParams,
  QueryFencingAreaParams,
  UpdateFencingAreaParams,
  GetMapLampsParams,
  AddMapLampsParams,
  UpdateMapLampsParams,
  DeleteMapLampsParams,
  GetPollingPointByNameParams,
  AddPollingPointParams,
  UpdatePollingPointParams,
  DeletePollingPointParams,
  GetPollingPointDetailParams,
  GetPollingLineByNameParams,
  AddPollingLineParams,
  UpdatePollingLineParams,
  DeletePollingLineParams,
  GetPollingLineDetailParams,
} from './index.interface';
import { async } from 'q';

export async function getMapArea(params: GetMapAreaParams) {
  let resp = await request.get(MAP_MANAGER_AREA_SETTING_QUERY, { params });
  return resp;
}

export async function updateMapArea(params: UpdateMapAreaParams) {
  const resp = await request.post(MAP_MANAGER_AREA_SETTING_UPDATE, { data: format(params) });
  resp.success === true && resp.code === 200
    ? message.success(`${resp.message}`)
    : message.error(`${resp.message}`);
  return resp.success === true && resp.code === 200;
}

export async function addMapArea(params: AddMapAreaParams) {
  const resp = await request.post(MAP_MANAGER_AREA_SETTING_ADD, { data: format(params) });
  resp.success === true && resp.code === 200
    ? message.success(`${resp.message}`)
    : message.error(`${resp.message}`);
  return resp.success === true && resp.code === 200;
}

export async function deleteMapArea(params: DeleteMapAreaParams) {
  const resp = await request.delete(MAP_MANAGER_AREA_SETTING_DELETE, { data: format(params) });
  resp.success === true && resp.code === 200
    ? message.success(`${resp.message}`)
    : message.error(`${resp.message}`);
  return resp.success === true && resp.code === 200;
}

export async function addMapFencingArea(params: AddMapFencingAreaParams) {
  const resp = await request.post(MAP_MANAGER_FENCING_SETTING_ADD, { data: format(params) });
  resp.success === true && resp.code === 200
    ? message.success(`${resp.message}`)
    : message.error(`${resp.message}`);
  return resp.success === true && resp.code === 200;
}

export async function addMapFencingConnectUser(params: AddMapFencingConnectUserParams) {
  const resp = await request.post(MAP_MANAGER_FENCING_SETTING_CONNECT, { data: params });
  resp.success === true && resp.code === 200
    ? message.success(`${resp.message}`)
    : message.error(`${resp.message}`);
  return resp.success === true && resp.code === 200;
}

export async function deleteFencingArea(params: DeleteFencingAreaParams) {
  const resp = await request.delete(MAP_MANAGER_FENCING_SETTING_DELETE, { data: format(params) });
  resp.success === true && resp.code === 200
    ? message.success(`${resp.message}`)
    : message.error(`${resp.message}`);
  return resp.success === true && resp.code === 200;
}

export async function queryFencingArea(params: QueryFencingAreaParams) {
  const resp = await request.get(MAP_MANAGER_FENCING_SETTING_QUERY, { params });
  return resp;
}

export async function updateFencingArea(params: UpdateFencingAreaParams) {
  const resp = await request.post(MAP_MANAGER_FENCING_SETTING_UPDATE, { data: format(params) });
  resp.success === true && resp.code === 200
    ? message.success(`${resp.message}`)
    : message.error(`${resp.message}`);
  return resp.success === true && resp.code === 200;
}

export async function getMapLamps(params: GetMapLampsParams) {
  const resp = await request.get(MAP_MANAGER_LAMP_SETTING_QUERY, { params: params });
  return resp;
}

export async function addMapLamps(params: AddMapLampsParams) {
  const resp = await request.post(MAP_MANAGER_LAMP_SETTING_ADD, { data: format(params) });
  resp.success === true && resp.code === 200
    ? message.success(`${resp.message}`)
    : message.error(`${resp.message}`);
  return resp.success === true && resp.code === 200;
}

export async function updateMapLamps(params: UpdateMapLampsParams) {
  const resp = await request.post(MAP_MANAGER_LAMP_SETTING_UPDATE, { data: format(params) });
  resp.success === true && resp.code === 200
    ? message.success(`${resp.message}`)
    : message.error(`${resp.message}`);
  return resp.success === true && resp.code === 200;
}

export async function deleteMapLamps(params: DeleteMapLampsParams) {
  const resp = await request.delete(MAP_MANAGER_LAMP_SETTING_DELETE, { data: format(params) });
  resp.success === true && resp.code === 200
    ? message.success(`${resp.message}`)
    : message.error(`${resp.message}`);
  return resp.success === true && resp.code === 200;
}

export async function getPollingPointByName(params: GetPollingPointByNameParams) {
  const resp = await request.get(MAP_MANAGER_POLLING_POINT_QUERY, { params });
  return resp;
}

export async function addPollingPoint(params: AddPollingPointParams) {
  const resp = await request.post(MAP_MANAGER_POLLING_POINT_ADD, { data: format(params) });
  resp.success === true && resp.code === 200
    ? message.success(`${resp.message}`)
    : message.error(`${resp.message}`);
  return resp.success === true && resp.code === 200;
}

export async function updatePollingPoint(params: UpdatePollingPointParams) {
  const resp = await request.post(MAP_MANAGER_POLLING_POINT_UPDATE, { data: format(params) });
  resp.success === true && resp.code === 200
    ? message.success(`${resp.message}`)
    : message.error(`${resp.message}`);
  return resp.success === true && resp.code === 200;
}

export async function deletePollingPoint(params: DeletePollingPointParams) {
  const resp = await request.delete(MAP_MANAGER_POLLING_POINT_DELETE, { data: format(params) });
  resp.success === true && resp.code === 200
    ? message.success(`${resp.message}`)
    : message.error(`${resp.message}`);
  return resp.success === true && resp.code === 200;
}

export async function getPollingPointDetail(params: GetPollingPointDetailParams) {
  const resp = await request.get(MAP_MANAGER_POLLING_POINT_DETAIL, { params: params });
  return resp;
}

export async function getPollingLineByName(params: GetPollingLineByNameParams) {
  const resp = await request.get(MAP_MANAGER_POLLING_LINE_QUERY, { params });
  return resp;
}

export async function addPollingLine(params: AddPollingLineParams) {
  const resp = await request.post(MAP_MANAGER_POLLING_LINE_ADD, { data: format(params) });
  resp.success === true && resp.code === 200
    ? message.success(`${resp.message}`)
    : message.error(`${resp.message}`);
  return resp.success === true && resp.code === 200;
}

export async function deletePollingLine(params: DeletePollingLineParams) {
  const resp = await request.get(MAP_MANAGER_POLLING_LINE_DELETE, { params: params });
  resp.success === true && resp.code === 200
    ? message.success(`${resp.message}`)
    : message.error(`${resp.message}`);
  return resp.success === true && resp.code === 200;
}

export async function updatePollingLine(params: UpdatePollingLineParams) {
  const resp = await request.post(MAP_MANAGER_POLLING_LINE_UPDATE, { data: format(params) });
  resp.success === true && resp.code === 200
    ? message.success(`${resp.message}`)
    : message.error(`${resp.message}`);
  return resp.success === true && resp.code === 200;
}

export async function getPollingLineDetail(params: GetPollingLineDetailParams) {
  const resp = await request.get(MAP_MANAGER_POLLING_LINE_DETAIL, { params: params });
  return resp;
}
/**
 * 获取所有告警类型
 */
export async function getAllWarningType() {
  const resp = await request.get(GET_SUPER_ADMIN_LIST, { params: { type: 'alarmType' } });
  return resp;
}

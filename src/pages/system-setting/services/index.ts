import request, { format } from '@/utils/request';
import { message } from 'antd';

import {
  GET_USER_LIST,
  UPDATE_USER_INFO,
  DELETE_USER,
  GET_ALL_ROLES,
  GET_USER_TYPES,
  ADD_USER_TYPE,
  UPDATE_USER_TYPE,
  DELETE_USER_TYPE,
  GET_BU_LIST,
  EDIT_MESSAGE_CARD,
  DELETE_MESSAGE_CARD,
  GET_SUPER_ADMIN_LIST,
  ADD_SUPER_ADMIN,
  EDIT_SUPER_ADMIN,
  DELETE_SUPER_ADMIN,
  UPLOAD_SUPER_ADMIN,
} from '@/config/api';
import {
  GetUserListParams,
  UpdateUserInfo,
  DeleteUser,
  AddUserTypeParams,
  GetUserTypesParams,
  UpdateUserTypeParams,
  DeleteUserTypeParams,
  BulistParams,
  UpdateMessageCardParams,
  DeleteMessageCardParams,
  GetSuperAdminListParams,
  UpdateSuperAdminParams,
  DeleteSuperAdminParams,
} from './index.interfaces';

export async function getUserList(params: GetUserListParams) {
  const resp = await request.get(GET_USER_LIST, { params });
  return resp.result;
}

export async function updateUserInfo(data: UpdateUserInfo) {
  const resp = await request.post(UPDATE_USER_INFO, {
    data: format(data),
  });
  resp.success === true && resp.code === 200
    ? message.success(`${resp.message}`)
    : message.error(`${resp.message}`);
  return resp.success === true && resp.code === 200;
}

export async function deleteUser(data: DeleteUser) {
  const resp = await request.delete(DELETE_USER, { data: format(data) });
  resp.success === true && resp.code === 200
    ? message.success(`${resp.message}`)
    : message.error(`${resp.message}`);
  return resp.success === true && resp.code === 200;
}

export async function getAllRoles() {
  const resp = await request.get(GET_ALL_ROLES);
  return resp;
}

/**
 * 人员类型
 */

export async function getUserTypes(params: GetUserTypesParams) {
  const resp = await request.get(GET_USER_TYPES, {
    params,
  });
  return resp;
}

export async function updateUserType(params: UpdateUserTypeParams) {
  const resp = await request.post(UPDATE_USER_TYPE, {
    data: params,
  });
  resp.success === true && resp.code === 200
    ? message.success(`${resp.message}`)
    : message.error(`${resp.message}`);
  return resp.success === true && resp.code === 200;
}

export async function deleteUserType(params: DeleteUserTypeParams) {
  const resp = await request.delete(DELETE_USER_TYPE, { data: format(params) });
  resp.success === true && resp.code === 200
    ? message.success(`${resp.message}`)
    : message.error(`${resp.message}`);
  return resp.success === true && resp.code === 200;
}

export async function addUserType(params: AddUserTypeParams) {
  const resp = await request.post(ADD_USER_TYPE, { data: format(params) });
  resp.success === true && resp.code === 200
    ? message.success(`${resp.message}`)
    : message.error(`${resp.message}`);
  return resp.success === true && resp.code === 200;
}

export async function getBuList(params: BulistParams) {
  const resp = await request.get(GET_BU_LIST, { params: params });
  return resp.result;
}

export async function updateMessageCard(params: UpdateMessageCardParams) {
  const resp = await request.get(EDIT_MESSAGE_CARD, { params });
  resp.success === true && resp.code === 200
    ? message.success(`${resp.message}`)
    : message.error(`${resp.message}`);
  return resp.success === true && resp.code === 200;
}

export async function deleteMessageCard(params: DeleteMessageCardParams) {
  const resp = await request.delete(DELETE_MESSAGE_CARD, { data: format(params) });
  resp.success === true && resp.code === 200
    ? message.success(`${resp.message}`)
    : message.error(`${resp.message}`);
  return resp.success === true && resp.code === 200;
}

export async function getSuperAdminList(params: GetSuperAdminListParams) {
  const resp = await request.get(GET_SUPER_ADMIN_LIST, { params });
  return resp.result;
}

export async function updateSuperAdmin(params: UpdateSuperAdminParams) {
  const resp = await request.post(EDIT_SUPER_ADMIN, { data: params });
  resp.success === true && resp.code === 200
    ? message.success(`${resp.message}`)
    : message.error(`${resp.message}`);
  return resp.success === true && resp.code === 200;
}

export async function deleteSuperAdmin(params: DeleteSuperAdminParams) {
  const resp = await request.delete(DELETE_SUPER_ADMIN, { data: format(params) });
  resp.success === true && resp.code === 200
    ? message.success(`${resp.message}`)
    : message.error(`${resp.message}`);
  return resp.success === true && resp.code === 200;
}

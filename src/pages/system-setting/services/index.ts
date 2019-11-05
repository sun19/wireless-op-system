import request from 'umi-request';


import {
  GET_USER_LIST,
  UPDATE_USER_INFO,
  DELETE_USER,
  GET_ALL_ROLES,
  GET_USER_TYPES,
  ADD_USER_TYPE,
  UPDATE_USER_TYPE,
  DELETE_USER_TYPE,
} from '@/config/api';
import {
  GetUserListParams,
  UpdateUserInfo,
  DeleteUser,
  GetUserTypesParams,
  UpdateUserTypeParams,
  DeleteUserTypeParams,
} from './index.interfaces';

export async function getUserList(params: GetUserListParams) {
  const resp = await request.get(GET_USER_LIST, { params });
  return resp.result;
}

export async function updateUserInfo(data: UpdateUserInfo) {
  const resp = await request.post(UPDATE_USER_INFO, {
    data,
  });
  return resp.success === true && resp.code === 200;
}

export async function deleteUser(data: DeleteUser) {
  const resp = await request.delete(DELETE_USER, {
    data,
  });
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
  return resp.success === true && resp.code === 200;
}

export async function deleteUserType(params: DeleteUserTypeParams) {
  const resp = await request.delete(DELETE_USER_TYPE, { data: params });
  return resp.success === true && resp.code === 200;
}

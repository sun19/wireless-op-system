import request from 'umi-request';
import { message } from 'antd';

import {
  USER_MANAGER_GET_USER_LIST,
  USER_MANAGER_ADD_USER,
  USER_MANAGER_DELETE_USER,
  USER_MANAGER_UPDATE_USER,
  USER_MANAGER_GET_IDCARD_INFO,
} from '@/config/api';
import { GetUserListParams, UpdateUserParams, DeleteUserParams } from './index.interface';

export async function getUserList(params: GetUserListParams) {
  const resp = await request.get(USER_MANAGER_GET_USER_LIST, { params });
  return resp;
}

export async function updateUser(params: UpdateUserParams) {
  const resp = await request.post(USER_MANAGER_UPDATE_USER, { data: params });
  resp.success === true && resp.code === 200
    ? message.success(resp.message)
    : message.error(resp.message);
  return resp.success === true && resp.code === 200;
}

export async function deleteUser(params: DeleteUserParams) {
  const resp = await request.delete(USER_MANAGER_DELETE_USER, { data: params });
  resp.success === true && resp.code === 200
    ? message.success(resp.message)
    : message.error(resp.message);
  return resp.success === true && resp.code === 200;
}

export async function addCardNoInfo() {
  const resp = await request.get(USER_MANAGER_GET_IDCARD_INFO);
  resp.success === true && resp.code === 200
    ? message.success(resp.message)
    : message.error(resp.message);
  return resp.success === true && resp.code === 200;
}

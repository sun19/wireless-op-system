import request from 'umi-request';

import { GET_USER_LIST, UPDATE_USER_INFO, DELETE_USER } from '@/config/api';
import { GetUserListParams, UpdateUserInfo, DeleteUser } from './index.interfaces';

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

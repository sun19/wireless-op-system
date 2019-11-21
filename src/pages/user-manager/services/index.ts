import request, { format } from '@/utils/request';
import { message } from 'antd';

import {
  USER_MANAGER_GET_USER_LIST,
  USER_MANAGER_ADD_USER,
  USER_MANAGER_DELETE_USER,
  USER_MANAGER_UPDATE_USER,
  USER_MANAGER_GET_IDCARD_INFO,
  USER_MANAGER_IMPORT_USER,
  USER_MANAGER_EXPORT_USER,
} from '@/config/api';
import {
  GetUserListParams,
  UpdateUserParams,
  DeleteUserParams,
  AddUserParams,
  ImportUserParams,
} from './index.interface';

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
  const resp = await request.post(USER_MANAGER_DELETE_USER, { data: format(params)  });
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

export async function addUser(params: AddUserParams) {
  const resp = await request.post(USER_MANAGER_ADD_USER, { headers: { 'Content-Type': 'application/json;charset=utf-8' },data: params },  );
  resp.success === true && resp.code === 200
    ? message.success(resp.message)
    : message.error(resp.message);
  return resp.success === true && resp.code === 200;
}

export async function exportUser() {
  const resp = await request.get(USER_MANAGER_EXPORT_USER);
  //TODO:放到项目中即可正常显示，这里不必处理
  // resp.success === true && resp.code === 200
  //   ? message.success(resp.message)
  //   : message.error(resp.message);
  return resp.success === true && resp.code === 200;
}

export async function importUser(params: ImportUserParams) {
  const resp = await request.post(USER_MANAGER_IMPORT_USER, { data: params });
  resp.success === true && resp.code === 200
    ? message.success(resp.message)
    : message.error(resp.message);
  return resp.success === true && resp.code === 200;
}

export interface GetUserListParams {
  loginName: string;
  name: string;
  pageNo?: number;
  pageSize?: number;
}

export interface UpdateUserInfo {
  id?: string;
  loginName?: string;
  name?: string;
  roleId?: string;
  sex?: string;
  remark?: string;
  createId?: string;
  updateId?: string;
  password?: string;
}

export interface DeleteUser {
  id: string;
  updateId: string;
}

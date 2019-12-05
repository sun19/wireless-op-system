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
}

export interface AddUserTypeParams {
  roleName?: string;
  roleCode?: string;
  remark?: string;
  createId?: string;
}

export interface GetUserTypesParams {
  pageSize?: number;
  pageNo?: number;
  userType:string;
}

export interface UpdateUserTypeParams {
  roleName: string;
  roleCode: string;
  remark: string;
}

export interface DeleteUserTypeParams {
  id: string;
  updateId?: string;
}

export interface BulistParams {
  pageSize?: number;
  pageNo?: number;
}

export interface UpdateMessageCardParams {
  id?: string;
  name?: string;
  color?: string;
  sort?: string;
  remark?: string;
  updateId?: string;
  key?: string;
}

export interface DeleteMessageCardParams {
  id: string;
  updateId?: string;
}

export interface GetSuperAdminListParams {
  type?: string;
  remark?: string;
  pageNo?: number;
  pageSize?: number;
}

export interface UpdateSuperAdminParams {
  id: string;
  dictName: string;
  dictValue: string;
  type: string;
  remark: string;
  sort: string;
  updateId: string;
}

export interface DeleteSuperAdminParams {
  id: string;
  updateId?: string;
}

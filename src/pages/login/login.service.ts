
import request, { format } from '@/utils/request';
import { Menues } from './index.interface';

import {
  COMMON_GET_ALL_MAP,
  COMMON_GET_ALL_AREAS,
  COMMON_GET_ALL_ROLES,
  COMMON_GET_ALL_LEVELS,
  COMMON_GET_ALL_USER_INFO,
  COMMON_GET_ALL_FENCING_TYPES,
  COMMON_GET_ALL_DUTIES,
  COMMON_GET_ALL_SECRET_LEVELS,
  COMMON_GET_ALL_POSITION,
  COMMON_GET_ALL_DEPARTMENT,
  MENU_LIST,
  LEFT_MENU_LIST,
  PEOPLE_MENUS,
  EDIT_MENUS,

} from '@/config/api';
export async function getAllMap() {
  const resp = await request.get(COMMON_GET_ALL_MAP);
  return resp;
}
export async function getAllArea() {
  const resp = await request.get(COMMON_GET_ALL_AREAS);
  return resp;
}

export async function getAllRoles() {
  const resp = await request.get(COMMON_GET_ALL_ROLES);
  return resp;
}

export async function getAllLevels() {
  const resp = await request.get(COMMON_GET_ALL_LEVELS);
  return resp;
}

export async function getAllUserInfo() {
  const resp = await request.get(COMMON_GET_ALL_USER_INFO);
  return resp;
}

export async function getAllFencingTypes() {
  const resp = await request.get(COMMON_GET_ALL_FENCING_TYPES);
  return resp;
}

export async function getAllDuties() {
  const resp = await request.get(COMMON_GET_ALL_DUTIES);
  return resp;
}

export async function getAllSecretLevels() {
  const resp = await request.get(COMMON_GET_ALL_SECRET_LEVELS);
  return resp;
}
export async function getAllPosition() {
  const resp = await request.get(COMMON_GET_ALL_POSITION);
  return resp;
}
// 部门
export async function getAllDepartment() {
  const resp = await request.get(COMMON_GET_ALL_DEPARTMENT);
  return resp;
}
// 左侧菜单
export async function getLeftMenues(params: Menues) {
  const resp = await request.get(LEFT_MENU_LIST, { params: params });
  return resp;
}
// 根据当前登录用户查询拥有的菜单key
export async function getPeopleMenues(params: Menues) {
  const resp = await request.get(MENU_LIST, { params: params });
  return resp;
}
// 查询所有菜单
export async function getAllMenues(params: { userId: string }) {
  const resp = await request.get(PEOPLE_MENUS, { params });
  return resp;
}
// 编辑菜单
export async function editMenues(params) {
  const resp = await request.post(EDIT_MENUS, { data: format(params) });
  return resp;
}

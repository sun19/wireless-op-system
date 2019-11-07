import request from 'umi-request';

import {
  COMMON_GET_ALL_MAP,
  COMMON_GET_ALL_AREAS,
  COMMON_GET_ALL_ROLES,
  COMMON_GET_ALL_LEVELS,
  COMMON_GET_ALL_USER_INFO,
  COMMON_GET_ALL_FENCING_TYPES,
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

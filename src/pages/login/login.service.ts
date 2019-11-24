
import request, { format } from '@/utils/request';


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

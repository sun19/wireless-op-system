import request from '@/utils/request';

import {
  BIG_SCREEN_DEPARTMENT_PEOPLE_COUNT,
  BIG_SCREEN_HISTORY_TRACK,
  BIG_SCREEN_INNER_OR_OUTER_POEPLE_COUNT,
  BIG_SCREEN_PEOPLE_COUNT,
  BIG_SCREEN_POSITION_PEOPLE_COUNT,
  BIG_SCREEN_REAL_TIME_PEOPLE_INFO,
  BIG_SCREEN_ROUTING_TRACK,
  BIG_SCREEN_SECRET_LEVEL_PEOPLE_COUNT,
  BIG_SCREEN_WARN_TYPE_BY_TIME,
  BIG_SCREEN_WARNING_INFO,
} from '@/config/api';
import { GetWarnTypeByTimeParams } from './index.interface';
import { async } from 'q';

export async function getBigScreenPeopleCount() {
  const resp = await request.get(BIG_SCREEN_PEOPLE_COUNT);
  return resp;
}

export async function getSecretLevelPeopleCount() {
  const resp = await request.get(BIG_SCREEN_SECRET_LEVEL_PEOPLE_COUNT);
  return resp;
}

export async function getBigScreenDepartmentPeopleCount() {
  const resp = await request.get(BIG_SCREEN_DEPARTMENT_PEOPLE_COUNT);
  return resp;
}

export async function getBigScreenPositionPeopleCount() {
  const resp = await request.get(BIG_SCREEN_POSITION_PEOPLE_COUNT);
  return resp;
}

export async function getWarnTypeByTime(params: GetWarnTypeByTimeParams) {
  const resp = await request.get(BIG_SCREEN_WARN_TYPE_BY_TIME, { params });
  return resp;
}

export async function getRoutingData() {
  const resp = await request.get(BIG_SCREEN_ROUTING_TRACK);
  return resp;
}

export async function getRealTimePeopleInfo() {
  const resp = await request.get(BIG_SCREEN_REAL_TIME_PEOPLE_INFO);
  return resp;
}

export async function getInnerOrOuterPeopleCount() {
  const resp = await request.get(BIG_SCREEN_INNER_OR_OUTER_POEPLE_COUNT);
  return resp;
}

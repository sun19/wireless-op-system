import request, { format } from '@/utils/request';
import { message } from 'antd';

import {
  GET_INFO_LIST,
  DEL_INFO_LIST,
  GET_INFO_DETIAL,
  ADD_INFO_LIST,
  EXPORT_INFO_IN,
  EXPORT_INFO_OUT,
  EDIT_INFO_LIST,
  // 任务
  GET_TASK_LIST,
  GRT_TASK_DETAIL,
  DEL_TASK_LIST,
  ADD_TASK_LIST,
  EXPORT_TASK_OUT,
  EXPORT_TASK_IN,
  TASK_LIST_EDIT,
} from '@/config/api';
import {
  GetInfoListParams,
  DeleteInfo,
  GetInfoDetial,
  AddInfoList,
  // 任务
  GetTaskList,
  GetTaskDetail,
  DelTaskList,
  AddTaskList,
} from './index.interfaces';

/*************************************信息牌******************************** */

// 信息牌列表
export async function getInfoListParams(params: GetInfoListParams) {
  const resp = await request.get(GET_INFO_LIST, { params });
  if (resp.code == 500) {
    message.error(`${resp.message}`);
  }
  return resp.result;
}
// 信息牌删除

export async function deleteInfo(data: DeleteInfo) {
  const resp = await request.delete(DEL_INFO_LIST, { data: format(data) });
  if (resp.code == 500) {
    message.error(`${resp.message}`);
  }
  return resp.success === true && resp.code === 200;
}
// 查看详情
export async function getInfoDetial(data: GetInfoDetial) {
  const resp = await request.post(GET_INFO_DETIAL, {
    data,
  });
  return resp.result;
}
// 信息牌添加
export async function addInfoList(data: AddInfoList) {
  const resp = await request.post(ADD_INFO_LIST, {
    // headers: { 'Content-Type': 'application/json;charset=utf-8' },
    data: format(data),
  });
  return resp.success === true && resp.code === 200;
}
// 信息牌编辑
export async function editInfoList(data: AddInfoList) {
  const resp = await request.post(EDIT_INFO_LIST, { data: format(data) });
  return resp.success === true && resp.code === 200;
}

// 导入
export async function exportIn() {
  const resp = await request.post(EXPORT_INFO_IN);
  return resp.success === true && resp.code === 200;
}
// 导出
export async function exportOut() {
  const resp = await request.post(EXPORT_INFO_OUT);
  return resp.success === true && resp.code === 200;
}

/*************************************任务规划******************************** */

// 列表
export async function getTaskList(params: GetTaskList) {
  const resp = await request.get(GET_TASK_LIST, { params });
  // console.log(resp)
  return resp.result;
}
// 查看详情
export async function getTaskDetail(data: GetTaskDetail) {
  const resp = await request.post(GRT_TASK_DETAIL, {
    data,
  });
  return resp.result;
}
//  删除
export async function delTaskList(data: DelTaskList) {
  const resp = await request.delete(DEL_TASK_LIST, { data: format(data) });
  return resp.success === true && resp.code === 200;
}
//  添加
export async function addTaskList(data: AddTaskList) {
  const resp = await request.post(ADD_TASK_LIST, {
    // data ,
    // headers: { 'Content-Type': 'application/json;charset=utf-8' },
    data: format(data),
  });
  return resp.success === true && resp.code === 200;
}

// 导入
export async function exportTaskIn() {
  const resp = await request.post(EXPORT_TASK_IN);
  return resp.success === true && resp.code === 200;
}
// 导出
export async function exportTaskOut() {
  const resp = await request.post(EXPORT_TASK_OUT);
  return resp.success === true && resp.code === 200;
}
//  列表编辑
export async function TaskListEdit(params: GetTaskList) {
  const resp = await request.post(TASK_LIST_EDIT, { data: format(params) });
  return resp.success === true && resp.code === 200;
}

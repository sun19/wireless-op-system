/** -----------------***********-----信息牌设置：信息牌列表——————————————————————————————*******************************/
import { BASE_API_URL } from '../constants';

/**
 *  信息牌列表
 */
export const GET_INFO_LIST =
  `${BASE_API_URL}/jeecg-boot/intf/location/listInformationBoard`;
//  信息牌删除
export const DEL_INFO_LIST =
  `${BASE_API_URL}/jeecg-boot/intf/location/deleteLnformationBoard`;
//  信息牌注销
export const CANCELLATION_INFO_LIST =
  `${BASE_API_URL}/jeecg-boot/intf/location/updateisCancel`;
  

// 查看详情
export const GET_INFO_DETIAL =
  `${BASE_API_URL}/jeecg-boot/intf/location/queryByIdInformationBoard`;
// 信息牌添加
export const ADD_INFO_LIST =
  `${BASE_API_URL}/jeecg-boot/intf/location/addInformationBoard`;
// 编辑
export const EDIT_INFO_LIST =
  `${BASE_API_URL}/jeecg-boot/intf/location/updateInformationBoard`;
// 导入
export const EXPORT_INFO_IN =
  `${BASE_API_URL}/jeecg-boot/intf/location/importExcelInformationBoard`;
//导出
export const EXPORT_INFO_OUT =
  `${BASE_API_URL}/jeecg-boot/intf/location/exportXlsInformationBoard`;

/***************************************************-信息牌设置：任务规划******************************************************************* */
//  任务规划列表
export const GET_TASK_LIST = `${BASE_API_URL}/jeecg-boot/intf/location/listTaskPlan`;
// 根据id查询详情
export const GRT_TASK_DETAIL =
  `${BASE_API_URL}/jeecg-boot/intf/location/queryByIdTaskPlan`;
// 删除
export const DEL_TASK_LIST = `${BASE_API_URL}/jeecg-boot/intf/location/deleteTaskPlan`;
//  添加
export const ADD_TASK_LIST = `${BASE_API_URL}/jeecg-boot/intf/location/addTaskPlan`;
//导出
export const EXPORT_TASK_OUT =
  `${BASE_API_URL}/jeecg-boot/intf/location/exportXlsTaskPlan`;
// 导入
export const EXPORT_TASK_IN =
  `${BASE_API_URL}/jeecg-boot/intf/location/importExcelTaskPlan`;
// 修改
export const TASK_LIST_EDIT  =
  `${BASE_API_URL}/jeecg-boot/intf/location/updateTaskPlan`;
// 所有区域的
export const GET_ALL_REGION =
  `${BASE_API_URL}/jeecg-boot/intf/location/getAllRegion`;

//----------------------人员管理------------------------
import { BASE_API_URL } from '../constants';

/**
 * 人员列表
 */
export const USER_MANAGER_GET_USER_LIST =
  `${BASE_API_URL}/jeecg-boot/intf/location/queryUserInfoList`;

/**
 * 人员新增
 */
export const USER_MANAGER_ADD_USER =
  `${BASE_API_URL}/jeecg-boot/intf/location/addUserInfo`;

/**
 * 人员修改
 */
export const USER_MANAGER_UPDATE_USER =
  `${BASE_API_URL}/jeecg-boot/intf/location/editUserInfo`;

/**
 * 人员删除
 */
export const USER_MANAGER_DELETE_USER =
  `${BASE_API_URL}/jeecg-boot/intf/location/deleteUserInfo`;

/**
 * 获取身份证信息（刷身份证使用）
 */
export const USER_MANAGER_GET_IDCARD_INFO =
  `${BASE_API_URL}/jeecg-boot/intf/location/getIdentityCard`;

/**
 * 人员导出
 */
export const USER_MANAGER_EXPORT_USER =
  `${BASE_API_URL}/jeecg-boot/intf/location/exportUserInfoXls`;

/**
 * 人员导入
 */
export const USER_MANAGER_IMPORT_USER =
  `${BASE_API_URL}/jeecg-boot/intf/location/importUserInfoExcel`;

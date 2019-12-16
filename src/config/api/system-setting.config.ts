// ----------------------系统设置：用户管理——————————————————————————————
import { BASE_API_URL } from '../constants';

/**
 * 获取用户列表
 */
export const GET_USER_LIST = `${BASE_API_URL}/jeecg-boot/intf/location/listUser`

/**
 * 新增/修改用户信息
 */
export const UPDATE_USER_INFO = `${BASE_API_URL}/jeecg-boot/intf/location/saveUser`;

/**
 * 用户删除
 */
export const DELETE_USER = `${BASE_API_URL}/jeecg-boot/intf/location/deleteUser`;

/**
 * 获取所有用户角色
 */
export const GET_ALL_ROLES = `${BASE_API_URL}/jeecg-boot/intf/location/getAllRole`;

// ----------------------系统设置：人员类型——————————————————————————————

/**
 * 人员类型列表
 */
export const GET_USER_TYPES = `${BASE_API_URL}/jeecg-boot/intf/location/listRole`;

/**
 * 人员类型添加
 */
export const ADD_USER_TYPE = `${BASE_API_URL}/jeecg-boot/intf/location/addRole`;

/**
 * 人员类型编辑
 */
export const UPDATE_USER_TYPE = `${BASE_API_URL}/jeecg-boot/intf/location/editRole`;

/**
 * 人员类型删除
 */
export const DELETE_USER_TYPE = `${BASE_API_URL}/jeecg-boot/intf/location/deleteRoleById`;

// ----------------------系统设置：信息牌设置——————————————————————————————

/**
 * 获取部门列表
 */
export const GET_BU_LIST = `${BASE_API_URL}/jeecg-boot/intf/location/listDepartment`;

/**
 * 编辑信息牌
 */
export const EDIT_MESSAGE_CARD = `${BASE_API_URL}/jeecg-boot/intf/location/editDepartment`;

/**
 * 删除信息牌
 */
export const DELETE_MESSAGE_CARD =
  `${BASE_API_URL}/jeecg-boot/intf/location/deleteDepartment`;

// ----------------------系统设置：超级管理员——————————————————————————————

/**
 * 获取超级管理员列表
 */
export const GET_SUPER_ADMIN_LIST = `${BASE_API_URL}/jeecg-boot/intf/location/listDict`;

/**
 * 添加超级管理员
 */
export const ADD_SUPER_ADMIN = `${BASE_API_URL}/jeecg-boot/intf/location/addDict`;

/**
 * 修改超级管理员
 */
export const EDIT_SUPER_ADMIN = `${BASE_API_URL}/jeecg-boot/intf/location/editDict`;

/**
 * 删除超级管理员
 */
export const DELETE_SUPER_ADMIN = `${BASE_API_URL}/jeecg-boot/intf/location/deleteDict`;

/**
 * 导入超级管理员
 */
export const UPLOAD_SUPER_ADMIN =
  `${BASE_API_URL}/jeecg-boot/intf/location/importExcelDict`;




/**
 * 人员类型列表
 */
export const GET_COMPANYNAME = `${BASE_API_URL}/jeecg-boot/intf/location/listDict`;

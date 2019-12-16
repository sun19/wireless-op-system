import { BASE_API_URL } from '../constants';
/**
 * 左侧菜单栏
 */
export const GET_MENUS = '/api/menu';
/**
 * 获取所有人员信息
 */
export const COMMON_GET_ALL_USER_INFO =
  `${BASE_API_URL}/jeecg-boot/intf/location/getAllDeptPeople`;
/**
 * 获取所有地图
 */
export const COMMON_GET_ALL_MAP = `${BASE_API_URL}/jeecg-boot/intf/location/getAllMap`;
/**
 * 获取所有角色
 */
export const COMMON_GET_ALL_ROLES = `${BASE_API_URL}/jeecg-boot/intf/location/getAllRole`;
/**
 * 获取所有区域等级和电子围栏等级
 */
export const COMMON_GET_ALL_LEVELS =
  `${BASE_API_URL}/jeecg-boot/intf/location/getAllLevel`;
/**
 * 获取区域下的所有灯具信息
 */
export const COMMON_GET_ALL_LAMP_ID =
  `${BASE_API_URL}/jeecg-boot/intf/location/getAllLampByRegionId`;

/**
 * 获取所有围栏类型
 */
export const COMMON_GET_ALL_FENCING_TYPES =
  `${BASE_API_URL}/jeecg-boot/intf/location/getAllFenceType`;
/**
 * 获取所有区域
 */
export const COMMON_GET_ALL_AREAS =
  `${BASE_API_URL}/jeecg-boot/intf/location/getAllRegion`;

/**
 *  职务信息列表
 */
export const COMMON_GET_ALL_DUTIES =
  `${BASE_API_URL}/jeecg-boot/intf/location/queryPositionList`;
/**
 * 保密等级列表
 */
export const COMMON_GET_ALL_SECRET_LEVELS =
  `${BASE_API_URL}/jeecg-boot/intf/location/queryAllSecurityLevel`;
/**
 * 获取所有职务
 */
export const COMMON_GET_ALL_POSITION =
  `${BASE_API_URL}/jeecg-boot/intf/location/queryAllPosition`
/**
 * 获取所有部门m
 */
export const COMMON_GET_ALL_DEPARTMENT =
  `${BASE_API_URL}/jeecg-boot/intf/location/queryAllDept`

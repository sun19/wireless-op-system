export const map_manager = ``;
import { BASE_API_URL } from '../constants';

//----------------------地图设置：区域设置--------------------------------

/**
 * 区域设置——查询
 */
export const MAP_MANAGER_AREA_SETTING_QUERY =
  `${BASE_API_URL}/jeecg-boot/intf/location/listRegion`;

/**
 * 区域设置——添加
 */
export const MAP_MANAGER_AREA_SETTING_ADD =
  `${BASE_API_URL}/jeecg-boot/intf/location/addRegion`;

/**
 * 区域设置——修改
 */
export const MAP_MANAGER_AREA_SETTING_UPDATE =
  `${BASE_API_URL}/jeecg-boot/intf/location/editRegion`;

/**
 * 区域设置——删除
 */
export const MAP_MANAGER_AREA_SETTING_DELETE =
  `${BASE_API_URL}/jeecg-boot/intf/location/deleteRegion`;

//----------------------地图设置：电子围栏设置--------------------------------

/**
 * 电子围栏——添加
 */
export const MAP_MANAGER_FENCING_SETTING_ADD =
  `${BASE_API_URL}/jeecg-boot/intf/location/addElectronicFence`;

/**
 * 电子围栏——围栏添加关联人员
 */
export const MAP_MANAGER_FENCING_SETTING_CONNECT =
  `${BASE_API_URL}/jeecg-boot/intf/location/peopleRelateFence`;

/**
 * 电子围栏——删除
 */
export const MAP_MANAGER_FENCING_SETTING_DELETE =
  `${BASE_API_URL}/jeecg-boot/intf/location/deleteElectronicFence`;

/**
 * 电子围栏——查询
 */
export const MAP_MANAGER_FENCING_SETTING_QUERY =
  `${BASE_API_URL}/jeecg-boot/intf/location/listElectronicFence`;

/**
 * 电子围栏——修改
 */
export const MAP_MANAGER_FENCING_SETTING_UPDATE =
  `${BASE_API_URL}/jeecg-boot/intf/location/editElectronicFence`;

//----------------------地图设置：灯具设置--------------------------------

/**
 * 灯具设置——查询
 */
export const MAP_MANAGER_LAMP_SETTING_QUERY =
  `${BASE_API_URL}/jeecg-boot/intf/location/listLamp`;

/**
 * 灯具设置——添加
 */
export const MAP_MANAGER_LAMP_SETTING_ADD =
  `${BASE_API_URL}/jeecg-boot/intf/location/addLamp`;

/**
 * 灯具设置——修改
 */
export const MAP_MANAGER_LAMP_SETTING_UPDATE =
  `${BASE_API_URL}/jeecg-boot/intf/location/updateLamp`;

/**
 * 灯具设置——删除
 */
export const MAP_MANAGER_LAMP_SETTING_DELETE =
  `${BASE_API_URL}/jeecg-boot/intf/location/deleteLamp`;

//----------------------地图设置：巡检点设置--------------------------------
/**
 * 根据名称查询
 */
export const MAP_MANAGER_POLLING_POINT_QUERY =
  `${BASE_API_URL}/jeecg-boot/intf/location/listPoint`;

/**
 * 添加
 */
export const MAP_MANAGER_POLLING_POINT_ADD =
  `${BASE_API_URL}/jeecg-boot/intf/location/addPoint`;

/**
 * 修改
 */
export const MAP_MANAGER_POLLING_POINT_UPDATE =
  `${BASE_API_URL}/jeecg-boot/intf/location/updatePoint`;

/**
 * 删除
 */
export const MAP_MANAGER_POLLING_POINT_DELETE =
  `${BASE_API_URL}/jeecg-boot/intf/location/deletePoint`;

/**
 * 查看详情
 */
export const MAP_MANAGER_POLLING_POINT_DETAIL =
  `${BASE_API_URL}/jeecg-boot/intf/location/queryByIdPoint`;

//----------------------地图设置：巡检线设置--------------------------------

/**
 * 根据名称查询
 */
export const MAP_MANAGER_POLLING_LINE_QUERY =
  `${BASE_API_URL}/jeecg-boot/intf/location/listRoute`;

/**
 * 添加
 */
export const MAP_MANAGER_POLLING_LINE_ADD =
  `${BASE_API_URL}/jeecg-boot/intf/location/addRoute`;

/**
 * 删除
 */
export const MAP_MANAGER_POLLING_LINE_DELETE =
  `${BASE_API_URL}/jeecg-boot/intf/location/deleteRount`;

/**
 * 修改
 */
export const MAP_MANAGER_POLLING_LINE_UPDATE =
  `${BASE_API_URL}/jeecg-boot/intf/location/updateRoute`;

/**
 * 查看详情
 */
export const MAP_MANAGER_POLLING_LINE_DETAIL =
  `${BASE_API_URL}/jeecg-boot/intf/location/queryByIdRoute`;

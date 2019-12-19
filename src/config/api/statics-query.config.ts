// ----------------------统计查询：历史轨迹 ——————————————————————————————
import { BASE_API_URL } from '../constants';

/**
 * 获取历史轨迹
 */
export const GET_STATISTICS_HISTORY_LIST =
  `${BASE_API_URL}/jeecg-boot/intf/location/listByHistoryTrajectory`;

/**
 * 获取所有用户角色
 */
export const GET_ALL_ROLES = `${BASE_API_URL}/jeecg-boot/intf/location/getAllRole`;

/**
 * 历史轨迹--查看详情
 */
export const GET_HISTORY_DETAIL =
  `${BASE_API_URL}/jeecg-boot/intf/location/getHisTrajectory`;


import { BASE_API_URL } from '../constants';

/**
 * 获取大屏人数数据
 */
export const BIG_SCREEN_PEOPLE_COUNT =
  `${BASE_API_URL}/jeecg-boot/intf/location/getScreenPeopleCount`;

/**
 * 获取各保密等级人数
 */
export const BIG_SCREEN_SECRET_LEVEL_PEOPLE_COUNT =
  `${BASE_API_URL}/jeecg-boot/intf/location/getScreenSecurityPeople`;

/**
 * 获取大屏各部门人数
 */
export const BIG_SCREEN_DEPARTMENT_PEOPLE_COUNT =
  `${BASE_API_URL}/jeecg-boot/intf/location/getScreenDeptPeople`;

/**
 * 获取大屏各职称人数
 */
export const BIG_SCREEN_POSITION_PEOPLE_COUNT =
  `${BASE_API_URL}/jeecg-boot/intf/location/findScreenPositionPeople`;

/**
 * 通过指定时间获取本周到指定时间的那天警告类型数量
 */
export const BIG_SCREEN_WARN_TYPE_BY_TIME =
  `${BASE_API_URL}/jeecg-boot/intf/location/getWarnTypeByTime`;

/**
 * 获取历史轨迹
 */
export const BIG_SCREEN_HISTORY_TRACK =
  `${BASE_API_URL}/jeecg-boot/intf/location/listByHistoryTrajectory`;

/**
 * 巡检数据
 */
export const BIG_SCREEN_ROUTING_TRACK =
  `${BASE_API_URL}/jeecg-boot/intf/location/findbyInspectionReports`;

/**
 * 区域内实时人员信息
 */
export const BIG_SCREEN_REAL_TIME_PEOPLE_INFO =
  `${BASE_API_URL}/jeecg-boot/intf/location/listByUserInfo`;

/**
 * 内外部一周人数统计
 */
export const BIG_SCREEN_INNER_OR_OUTER_POEPLE_COUNT =
  `${BASE_API_URL}/jeecg-boot/intf/location/listInnerOut`;

/**
* 获取大屏停留时长
*/
export const BIG_SCREEN_STAY_TIME =
  ` ${BASE_API_URL}/jeecg-boot/intf/location/getStayTime`;


/**
 * 获取区域名称、区域坐标
 */
export const BIG_SCREEN_GET_LIST_REGION = `${BASE_API_URL}/jeecg-boot/intf/location/listScreenRegion`;

/**
 * 获取灯具编号、灯具坐标
 */
export const BIG_SCREEN_GET_LIST_LAMP = `${BASE_API_URL}/jeecg-boot/intf/location/listLamp`;

/**
 * 根据信息牌`infomation`获取详细信息
 */
export const BIG_SCREEN_GET_INFO_BOARD = `${BASE_API_URL}/jeecg-boot/intf/location/queryByNumberInformationBoard`;
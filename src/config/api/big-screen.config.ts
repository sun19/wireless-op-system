/**
 * 获取大屏人数数据
 */
export const BIG_SCREEN_PEOPLE_COUNT =
  'http://47.96.112.31:8086/jeecg-boot/intf/location/getScreenPeopleCount';

/**
 * 获取各保密等级人数
 */
export const BIG_SCREEN_SECRET_LEVEL_PEOPLE_COUNT =
  'http://47.96.112.31:8086/jeecg-boot/intf/location/getScreenSecurityPeople';

/**
 * 获取大屏各部门人数
 */
export const BIG_SCREEN_DEPARTMENT_PEOPLE_COUNT =
  'http://47.96.112.31:8086/jeecg-boot/intf/location/getScreenDeptPeople';

/**
 * 获取大屏各职称人数
 */
export const BIG_SCREEN_POSITION_PEOPLE_COUNT =
  'http://47.96.112.31:8086/jeecg-boot/intf/location/findScreenPositionPeople';

/**
 * 通过指定时间获取本周到指定时间的那天警告类型数量
 */
export const BIG_SCREEN_WARN_TYPE_BY_TIME =
  'http://47.96.112.31:8086/jeecg-boot/intf/location/getWarnTypeByTime';

/**
 * 获取历史轨迹
 */
export const BIG_SCREEN_HISTORY_TRACK =
  'http://47.96.112.31:8086/jeecg-boot/intf/location/listByHistoryTrajectory';

/**
 * 巡检数据
 */
export const BIG_SCREEN_ROUTING_TRACK =
  'http://47.96.112.31:8086/jeecg-boot/intf/location/findbyInspectionReports';

/**
 * 区域内实时人员信息
 */
export const BIG_SCREEN_REAL_TIME_PEOPLE_INFO =
  'http://47.96.112.31:8086/jeecg-boot/intf/location/listByUserInfo';

/**
 * 内外部一周人数统计
 */
export const BIG_SCREEN_INNER_OR_OUTER_POEPLE_COUNT =
  'http://47.96.112.31:8086/jeecg-boot/intf/location/listInnerOut';

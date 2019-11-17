/** -----------------***********----- 告警管理： 告警类型——————————————————————————————*******************************/

//  *  查询
export const WARNING_TYPE_SEARCH = 'http://47.96.112.31:8086/jeecg-boot/intf/location/listWarnType';
//  添加
export const WARNING_TYPE_ADD = 'http://47.96.112.31:8086/jeecg-boot/intf/location/addWarnType';
// 编辑
export const WARNING_TYPE_EDIT = 'http://47.96.112.31:8086/jeecg-boot/intf/location/editWarnType';
// 删除
export const WARNING_TYPE_DEL = 'http://47.96.112.31:8086/jeecg-boot/intf/location/deleteWarnType';

/** -----------------***********----- 告警管理： 告警信息——————————————————————————————*******************************/

//  查询
export const WARNING_INFO_SEARCH = 'http://47.96.112.31:8086/jeecg-boot/intf/location/listAlarm';
// 处理
export const WARNING_INFO_DEAL = 'http://47.96.112.31:8086/jeecg-boot/intf/location/deleteAlarm';

/** -----------------***********----- 告警管理： 告警历史——————————————————————————————*******************************/

// 查询
export const WARNING_HISTORY_SEARCH =
  'http://47.96.112.31:8086/jeecg-boot/intf/location/listHistoryAlarmInfo';

/** -----------------***********----- 告警管理： 告警类型——————————————————————————————*******************************/
import { BASE_API_URL } from '../constants';

//  *  查询
export const WARNING_TYPE_SEARCH = `${BASE_API_URL}/jeecg-boot/intf/location/listWarnType`;
//  添加
export const WARNING_TYPE_ADD = `${BASE_API_URL}/jeecg-boot/intf/location/addWarnType`;
// 编辑
export const WARNING_TYPE_EDIT = `${BASE_API_URL}/jeecg-boot/intf/location/editWarnType`;
// 删除
export const WARNING_TYPE_DEL = `${BASE_API_URL}/jeecg-boot/intf/location/deleteWarnType`;

/** -----------------***********----- 告警管理： 告警信息——————————————————————————————*******************************/

//  查询
export const WARNING_INFO_SEARCH = `${BASE_API_URL}/jeecg-boot/intf/location/listAlarm`;
// 处理
export const WARNING_INFO_DEAL = `${BASE_API_URL}/jeecg-boot/intf/location/deleteAlarm`;

/** -----------------***********----- 告警管理： 告警历史——————————————————————————————*******************************/

// 查询
export const WARNING_HISTORY_SEARCH =
  `${BASE_API_URL}/jeecg-boot/intf/location/listHistoryAlarmInfo`;

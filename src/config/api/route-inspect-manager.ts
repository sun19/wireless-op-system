/** -----------------***********-----巡检管理：巡检列表——————————————————————————————*******************************/
import { BASE_API_URL } from '../constants';
 
// 查询
export const INSPECT_MANAGER_SEARCH = `${BASE_API_URL}/jeecg-boot/intf/location/listUserInspection`;

//  查看详情
export const INSPECT_MANAGER_DETAIL =
  `${BASE_API_URL}/jeecg-boot/intf/location/queryByIdRoute`;

/** -----------------***********-----巡检管理：巡检报表——————————————————————————————*******************************/

// 根据操作时间查询
export const INSPECT_MANAGER_LIST_SEARCH =
  `${BASE_API_URL}/jeecg-boot/intf/location/listReportIntf`;
// 导出
export const INSPECT_MANAGER_LIST_EXPORT =
  `${BASE_API_URL}/jeecg-boot/intf/location/exportXlsInspectionReport`;

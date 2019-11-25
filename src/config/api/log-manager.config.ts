export const log_manager = '';
import { BASE_API_URL } from '../constants';

/**
 * 根据操作时间查询
 */
export const GET_LOG_LIST = `${BASE_API_URL}/jeecg-boot/intf/location/listlogInfo`;

/**
 * 导出日志
 */
export const EXPORT_LOG_LIST = `${BASE_API_URL}/jeecg-boot/intf/location/exportXlsLogInfo`;

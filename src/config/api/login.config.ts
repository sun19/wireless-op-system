//  登录登出
import { BASE_API_URL } from '../constants';
export const LOGIN_OUT = `${BASE_API_URL}/jeecg-boot/intf/location/logout`;



// 获取左侧菜单
export const LEFT_MENU_LIST = `${BASE_API_URL}/jeecg-boot/intf/location/queryMenuAndParentListByRoleId`
// 根据当前登录用户查询拥有的菜单key
export const MENU_LIST = `${BASE_API_URL}/jeecg-boot/intf/location/listMenuByRoleId`;
// 查询所有菜单
export const PEOPLE_MENUS = `${BASE_API_URL}/jeecg-boot/intf/location/queryMenuList`;
// 编辑菜单权限
export const EDIT_MENUS = `${BASE_API_URL}/jeecg-boot/intf/location/insertMenuAndRole`;


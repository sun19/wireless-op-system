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
// 获取组织
export const GET_DEPARTMENT = `${BASE_API_URL}/jeecg-boot/intf/location/listDepartmentChild`;
// 修改组织
export const EDIT_DEPARTMENT = `${BASE_API_URL}/jeecg-boot/intf/location/saveDepartment`;
// 删除组织
export const DELECT_DEPARTMENT = `${BASE_API_URL}/jeecg-boot/intf/location/deleteDepartment`;
// 组织头名
export const GET_DEPARTMENT_NAME = `${BASE_API_URL}/jeecg-boot/intf/location/getDictNameByType`;
export const GET_FIRST_NAME = `${BASE_API_URL}/jeecg-boot/intf/location/getDictNameByType?type=title_first`;
export const GET_SECOND_NAME = `${BASE_API_URL}/jeecg-boot/intf/location/getDictNameByType?type=title_second`;
// http://47.96.112.31:8086/jeecg-boot/intf/location/getDictNameByType?type=title_first



/**
 * 左侧菜单栏
 */

export const GET_MENUS = '/api/menu';

// ----------------------系统设置：用户管理——————————————————————————————

/**
 * 获取用户列表
 */
export const GET_USER_LIST = 'http://47.95.195.189:8086/jeecg-boot/intf/location/listUser';

/**
 * 新增/修改用户信息
 */
export const UPDATE_USER_INFO = 'http://47.95.195.189:8086/jeecg-boot/intf/location/saveUser';

/**
 * 用户删除
 */
export const DELETE_USER = 'http://47.95.195.189:8086/jeecg-boot/intf/location/deleteUser';

/**
 * 获取所有用户角色
 */
export const GET_ALL_ROLES = 'http://47.95.195.189:8086/jeecg-boot/intf/location/getAllRole';

// ----------------------系统设置：人员类型——————————————————————————————

/**
 * 人员类型列表
 */
export const GET_USER_TYPES = 'http://47.95.195.189:8086/jeecg-boot/intf/location/listRole';

/**
 * 人员类型添加
 */
export const ADD_USER_TYPE = 'http://47.95.195.189:8086/jeecg-boot/intf/location/addRole';

/**
 * 人员类型编辑
 */
export const UPDATE_USER_TYPE = 'http://47.95.195.189:8086/jeecg-boot/intf/location/editRole';

/**
 * 人员类型删除
 */
export const DELETE_USER_TYPE = 'http://47.95.195.189:8086/jeecg-boot/intf/location/deleteRoleById';

/**
 * 获取部门列表
 */
export const GET_BU_LIST = 'http://47.95.195.189:8086/jeecg-boot/intf/location/listDepartment';

/**
 * 编辑信息牌
 */
export const EDIT_MESSAGE_CARD =
  'http://47.95.195.189:8086/jeecg-boot/intf/location/editDepartment';

/**
 * 删除信息牌
 */
export const DELETE_MESSAGE_CARD =
  'http://47.95.195.189:8086/jeecg-boot/intf/location/deleteDepartment';

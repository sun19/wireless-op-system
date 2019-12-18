// 信息牌列表
export interface GetInfoListParams {
  userName: string;
  name: string;
  type: string;
  isCancel:string;
  pageNo?: number;
  pageSize?: number;
  regionId?: string;
}
// 信息牌删除
export interface DeleteInfo {
  id: string;
}
// 信息牌注销
export interface CancellationInfo {
  id: string;
  isCancel:number
}
// 查看详情
export interface GetInfoDetial {
  id: string;

}
// 信息牌添加
export interface AddInfoList {
  userName: string;
  cardNo: string;
  sex: string;
  address: string;
  phone: string;
  departmentId: string;
  positionName: string;
  type: string;
  incumbency: string;
  security_levelName: string;
  name: string;
  id: string;
  note: string;
}

/***************************************任务规划********************************************************/


  // 表格
export interface GetTaskList {
  remark?: string;
  informationBoardName?: string;
  task?: string;
  pageNo?: number;
  pageSize?: number;
}
// 详情
export interface GetTaskDetail {
  id: string;
}
// 删除
export interface DelTaskList {
  id: string;
}

// 添加
export interface AddTaskList {
  remark: string;
  informationBoardName: string;
  task: string;
  startTime: string;
  endTime: string;
}

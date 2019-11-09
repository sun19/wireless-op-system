// 查询
export interface WarningTypeSearch {
  name: string;
  pageNo?: number;
  pageSize?: number;
}
// 添加
export interface WraningTypeAdd {
  name: string;
  mapName: string;
  regionalName: string;
  informationBoardName: string;
  startTime: string;
  endTime: string;
  repeatType: string;
  warnMode: string;
  aggregateRadius: string;
  overrunNum: string;
  overrunTime: string;
}
// 编辑
export interface WraningTypeEdit {
  name: string;
  mapName: string;
  regionalName: string;
  informationBoardName: string;
  startTime: string;
  aggregateRadius: string;
  endTime: string;
  overrunNum: string;
  id: string;
  repeatType: string;
  warnMode: string;
  overrunTime: string;

}
// 删除
export interface WraningTypeDel {
  id: string;
}

/***************************************警告类型********************************************************/


  // 查询
export interface  WarningInfoSearch {
  pageNo?: number;
  pageSize?: number;
  name: string;
  alarmStartTime: string;
  alarmEndTime: string;
}
// 处理
export interface WarningInfoDeal {
  id: string;
}
/***************************************历史警告********************************************************/

// 查询
export interface WarningHistorySearch {
  pageNo?: number;
  pageSize?: number;
  warnModeName: string;
  alarmStartTime: string;
  alarmEndTime: string;
}


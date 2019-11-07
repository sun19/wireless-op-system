// 信息牌列表
export interface GetInfoListParams {
  userName: string;
  name: string;
  type:string;
  pageNo?: number;
  pageSize?: number;
}
// 信息牌删除
export interface DeleteInfo {
  id: string;
}
// 查看详情
export interface GetInfoDetial {
  id: string;

}
// 信息牌添加
export interface AddInfoList{
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


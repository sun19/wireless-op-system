export interface GetInspectListParams {
  inspectionRoute?: string;
  createId?: string;
  startTime?: string;
  endTime?: string;
  pageSize?: string;
  pageNo?: string;
}

export interface GetInspectDetailParams {
  id: string;
}

export interface GetInspectReportsParams {
  createtime?: string;
  inspectionTime?: string;
  pageNo?: string;
  pageSize?: string;
}

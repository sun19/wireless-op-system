interface Params {
  pageSize?: number;
  pageNo?: number;
}

export interface GetMapAreaParams extends Params {
  regionalLevelId?: string;
  regionName?: string;
}

export interface UpdateMapAreaParams {
  id?: string;
  mapId?: string;
  mapName?: string;
  regionalLevelId?: string;
  regionalLevelName?: string;
  regionName?: string;
  operatTime?: string;
  remark?: string;
}

export interface DeleteMapAreaParams {
  id: string;
}

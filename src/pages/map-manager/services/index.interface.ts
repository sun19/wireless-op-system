interface Params {
  pageSize?: number;
  pageNo?: number;
}

export interface GetMapAreaParams extends Params {
  regionalLevelId?: string;
  regionName?: string;
}
export interface AddMapAreaParams extends Params {
  mapId?: string;
  regionalLevelId?: string;
  regionName?: string;
  operatTime?: string;
  remark?: string;

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

export interface AddMapAreaParams {
  mapId?: string;
  regionalLevelId?: string;
  regionName?: string;
  operatTime?: string;
  remark?: string;
}

export interface AddMapFencingAreaParams {
  mapId?: string;
  mapName?: string;
  name?: string;
  typeId?: string;
  type?: string;
  level?: string;
  isForever?: string;
  maxUser?: string;
  effectiveTime?: string;
  failureTime?: string;
  regionalName?: string;
  regionalId?: string;
}

export interface AddMapFencingConnectUserParams {
  userId?: string;
  userName?: string;
}

export interface DeleteFencingAreaParams {
  id?: string;
}

export interface QueryFencingAreaParams extends Params {
  typeId?: string;
  name?: string;
}

export interface UpdateFencingAreaParams {
  id?: string;
  mapId?: string;
  mapName?: string;
  name?: string;
  typeId?: string;
  type?: string;
  level?: string;
  isForever?: string;
  maxUser?: string;
  effectiveTime?: string;
  failureTime?: string;
  regionalName?: string;
  regionalId?: string;
}

export interface GetMapLampsParams extends Params {
  regionalId?: string;
  lampCode?: string;
}

export interface AddMapLampsParams {
  mapId?: string;
  mapName?: string;
  lampCode?: string;
  model?: string;
  xCoordinate?: string;
  yCoordinate?: string;
  regionalId?: string;
  regionalName?: string;
  entranceExit?: string;
  sort?: string;
  remark?: string;
}

export interface UpdateMapLampsParams {
  id?: string;
  mapId?: string;
  mapName?: string;
  lampCode?: string;
  model?: string;
  xCoordinate?: string;
  yCoordinate?: string;
  regionalId?: string;
  regionalName?: string;
  entranceExit?: string;
  sort?: string;
  remark?: string;
}

export interface DeleteMapLampsParams {
  id: string;
}

export interface GetPollingPointByNameParams extends Params {
  name?: string;
}

export interface AddPollingPointParams {
  mapName?: string;
  name?: string;
  address?: string;
  startTime?: string;
  endTime?: string;
  xCoordinate?: string;
  yCoordinate?: string;
  remark?: string;
}

export interface UpdatePollingPointParams {
  id?: string;
  mapName?: string;
  name?: string;
  address?: string;
  startTime?: string;
  endTime?: string;
  xCoordinate?: string;
  yCoordinate?: string;
  remark?: string;
}

export interface DeletePollingPointParams {
  id: string;
}

export interface GetPollingPointDetailParams {
  id: string;
}

export interface GetPollingLineByNameParams extends Params {
  name?: string;
}

export interface AddPollingLineParams {
  mapName?: string;
  login_id?: string;
  informationBoardId?: string;
  startTime?: string;
  endTime?: string;
  remark?: string;
  inspectionRoute?: string;
  alarmName?: string;
}

export interface UpdatePollingLineParams {
  id?: string;
  mapName?: string;
  login_id?: string;
  informationBoardId?: string;
  startTime?: string;
  endTime?: string;
  remark?: string;
  inspectionRoute?: string;
  alarmName?: string;
}

export interface DeletePollingLineParams {
  id: string;
}

export interface GetPollingLineDetailParams {
  id: string;
}

export interface GetAllLampsParams {
  id?: string;
}

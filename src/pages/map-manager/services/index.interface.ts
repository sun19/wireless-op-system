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

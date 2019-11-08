export interface Params {
  pageSize?: number;
  pageNo?: number;
}

export interface GetUserListParams extends Params {
  name?: string;
  cardNo?: string;
}

export interface UpdateUserParams extends Params {
  id?: string;
  name?: string;
  cardNo?: string;
  sex?: string;
  address?: string;
  phone?: string;
  departmentId?: string;
  departmentName?: string;
  positionId?: string;
  positionName?: string;
  securityLevelId?: string;
  securityLevelName?: string;
  informationBoardId?: string;
  informationBoardName?: string;
}

export interface DeleteUserParams extends Params {
  id?: string;
}

export interface AddUserParams {
  name?: string;
  cardNo?: string;
  sex?: string;
  address?: string;
  phone?: string;
  departmentId?: string;
  departmentName?: string;
  positionId?: string;
  positionName?: string;
  securityLevelId?: string;
  securityLevelName?: string;
  informationBoardId?: string;
  informationBoardName?: string;
}

export interface ImportUserParams {
  file?: string;
}

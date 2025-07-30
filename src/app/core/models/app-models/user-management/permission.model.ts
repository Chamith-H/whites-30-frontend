export interface GetPermissionModel {
  _id: string;
  module: number;
  section: number;
  name: string;
  permissionNo: number;
}

export interface FilterPermissionModel {
  module: number;
  section: number;
}

export interface RolePermissionModel {
  _id: string;
  name: string;
  permissions: any[];
}

export interface PermissionSectionModel {
  _id: number;
  name: string;
}

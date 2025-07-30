export interface RoleModel {
  roleId?: string,
  name: string;
  description: string;
  status: boolean;
}

export interface FilterRoleModel {
  name: string;
  status: any;
}

export enum fPermissions {
  //!--> User management module...........................................|
  // Users -> 0
  VIEW_USERS_LIST = 1,
  ADD_USER = 2,
  EDIT_USER = 3,
  CHANGE_USER_STATUS = 5,
  DETAIL_USER = 4,
  DELETE_USER = 6,

  // User roles -> 10
  VIEW_ROLES_LIST = 11,
  ADD_ROLE = 12,
  EDIT_ROLE = 13,
  DELETE_ROLE = 14,
  CHANGE_ROLE_STATUS = 15,
  DETAIL_ROLE = 16,

  // Permissions -> 20
  VIEW_PERMISSION_LIST = 21,
  MANAGE_PERMISSIONS = 22,
}

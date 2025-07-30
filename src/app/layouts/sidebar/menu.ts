import { fPermissions } from "src/app/core/enums/system-enums/permission.enum";
import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: "Menu",
    isTitle: true,
  },
  {
    id: 2,
    label: "Dashboard",
    icon: "fas fa-chart-bar",
    subItems: [],
  },
  {
    id: 7,
    label: "Security In",
    icon: "far fa-credit-card",
    subItems: [
      {
        id: 8,
        label: "Gate Pass",
        link: "/gate-pass",
        parentId: 7,
        permission: fPermissions.VIEW_USERS_LIST,
      },
      {
        id: 9,
        label: "Weighbridge",
        link: "/gate-pass/weigh-bridge",
        parentId: 7,
        permission: fPermissions.VIEW_USERS_LIST,
      },
    ],
  },
  {
    id: 10,
    label: "Quality Control",
    icon: "fas fa-anchor",
    subItems: [
      {
        id: 11,
        label: "QC Eligible Entities",
        parentId: 10,
        permission: fPermissions.VIEW_USERS_LIST,
        subItems: [
          {
            id: 12,
            label: "Items",
            link: "/quality-control/eligible-items",
            parentId: 11,
            permission: fPermissions.VIEW_USERS_LIST,
          },
          {
            id: 13,
            label: "Warehouses",
            link: "/quality-control/eligible-warehouses",
            parentId: 11,
            permission: fPermissions.VIEW_USERS_LIST,
          },
        ],
      },
      {
        id: 14,
        label: "QC Parameters",
        link: "/quality-control/qc-parameters",
        parentId: 10,
        permission: fPermissions.VIEW_USERS_LIST,
      },
      {
        id: 15,
        label: "Stages",
        link: "/quality-control/stages",
        parentId: 10,
        permission: fPermissions.VIEW_USERS_LIST,
      },
      {
        id: 16,
        label: "Inspections",
        parentId: 10,
        link: "/quality-control/inspections",
        permission: fPermissions.VIEW_USERS_LIST,
      },
    ],
  },
  {
    id: 17,
    label: "Master Data",
    icon: "fas fa-sitemap",
    subItems: [
      {
        id: 18,
        label: "Items",
        link: "/master-data/items",
        parentId: 17,
        permission: fPermissions.VIEW_USERS_LIST,
      },
    ],
  },
  {
    id: 3,
    label: "User Management",
    icon: "fas fa-user-cog",
    subItems: [
      {
        id: 4,
        label: "System Users",
        link: "/user-management/users",
        parentId: 3,
        permission: fPermissions.VIEW_USERS_LIST,
      },
      {
        id: 5,
        label: "User Roles",
        link: "/user-management/roles",
        parentId: 3,
        permission: fPermissions.VIEW_ROLES_LIST,
      },
      {
        id: 6,
        label: "Permissions",
        link: "/user-management/permissions",
        parentId: 3,
        permission: fPermissions.VIEW_PERMISSION_LIST,
      },
    ],
  },
];

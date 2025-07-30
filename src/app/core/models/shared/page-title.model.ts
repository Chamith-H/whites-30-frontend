export enum OpenType {
  OPEN_NULL = 0,
  OPEN_PAGE = 1,
  OPEN_POPUP = 2,
}

export interface ButtonItem {
  show: boolean;
  permission?: number;
  action: OpenType;
  name: string;
  target: any;
}

export interface BreadcrumbItems {
  name: string;
  link: string;
  active: boolean;
}

//!--> Shared prop model................................................|
export class HeaderItems {
  title: string;
  button: ButtonItem;
  breadcrumb: BreadcrumbItems[];
}

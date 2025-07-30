import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Behavior } from "src/app/core/enums/shared-enums/behavior.enum";
import { fPermissions } from "src/app/core/enums/system-enums/permission.enum";
import {
  HeaderItems,
  OpenType,
} from "src/app/core/models/shared/page-title.model";
import { RoleService } from "src/app/core/services/app-services/user-management/role.service";
import { ARoleFormComponent } from "./a-role-form/a-role-form.component";
import {
  FilterRoleModel,
  RoleModel,
} from "src/app/core/models/app-models/user-management/role.model";
import {
  EvalType,
  FilterType,
} from "src/app/core/enums/shared-enums/filter-table.enum";
import { TAction } from "src/app/core/models/shared/filter-table.model";
import { sMsg } from "src/app/core/models/shared/success-response.model";
import { SuccessMessage } from "src/app/core/services/shared/success-message.service";
import { ARoleViewComponent } from "./a-role-view/a-role-view.component";
import { DetailButtonModel } from "src/app/core/models/shared/detail-button.model";
import { ControlAction } from "src/app/core/enums/shared-enums/action.enum";

@Component({
  selector: "app-roles",
  templateUrl: "./roles.component.html",
  styleUrls: ["./roles.component.scss"],
})
export class RolesComponent {
  // Basic handlers
  currentPage: number = 1;
  isLoading: boolean = false;
  modalRef?: BsModalRef;

  // Data structures
  roles: any;
  selectedRole: any;

  // For filters
  filterData: FilterRoleModel = {
    name: "",
    status: "",
  };

  //!--> Page tiele data structure...................................................|
  headerItems: HeaderItems = {
    title: "USER ROLES",
    button: {
      show: true,
      permission: fPermissions.ADD_ROLE,
      action: OpenType.OPEN_POPUP,
      name: "Create user role",
      target: Behavior.CREATE_MODE,
    },
    breadcrumb: [
      {
        name: "User management",
        link: "",
        active: false,
      },
      {
        name: "User roles",
        link: "",
        active: true,
      },
    ],
  };

  //!--> Open create role popup.....................................................|
  open_CreateRolePOPUP(requestedBehavior: Behavior) {
    this.modalRef = this.modalService.show(ARoleFormComponent, {
      initialState: {
        mode: requestedBehavior || Behavior.CREATE_MODE,
      },

      class: "modal-md modal-dialog-centered",
    });

    this.modalRef.content.closePopup.subscribe(() => {
      this.close_isOpenedPOPUPS();
    });

    this.modalRef.content.closePopupAndReload.subscribe(() => {
      this.close_isOpenPopupAndRELOAD();
    });
  }

  //!--> Open edit role popup.......................................................|
  open_EditRolePOPUP(requestedID: string) {
    const roleObject = this.filterTable.tableItems.tDescriptions.find(
      (item) => item._id === requestedID
    );

    // Current Role ID
    const id = roleObject._id;

    this.modalRef = this.modalService.show(ARoleFormComponent, {
      initialState: {
        mode: Behavior.EDIT_MODE,
        targetID: id,
        data: roleObject,
      },

      class: "modal-md modal-dialog-centered",
    });

    this.modalRef.content.closePopup.subscribe(() => {
      this.close_isOpenedPOPUPS();
    });

    this.modalRef.content.closePopupAndReload.subscribe(() => {
      this.close_isOpenPopupAndRELOAD();
    });
  }

  //!--> Open view role popup.......................................................|
  open_ViewRolePOPUP(requestedID: string) {
    const roleObject = this.filterTable.tableItems.tDescriptions.find(
      (item) => item._id === requestedID
    );

    // Current Role ID
    const id = roleObject._id;

    this.modalRef = this.modalService.show(ARoleViewComponent, {
      initialState: {
        mode: Behavior.VIEW_MODE,
        targetID: id,
        data: roleObject,
      },

      class: "modal-lg modal-dialog-centered",
    });

    this.modalRef.content.getAction.subscribe((event) => {
      this.handle_DetailButtonActions(event);
    });

    this.modalRef.content.closePopup.subscribe(() => {
      this.close_isOpenedPOPUPS();
    });
  }

  //!--> Close popups...............................................................|
  close_isOpenedPOPUPS() {
    this.modalRef.hide();
  }

  close_isOpenPopupAndRELOAD() {
    this.modalRef.hide();
    this.getRoles(1, this.filterData);
  }

  //!--> Handle detail view buttons................................................|
  handle_DetailButtonActions(task: DetailButtonModel) {
    this.modalRef.hide();

    setTimeout(() => {
      if (task.action === ControlAction.Edit) {
        this.open_EditRolePOPUP(task.targetId);
      }
    }, 300);
  }

  //!--> Pagination table..........................................................|
  filterTable = {
    //For filters.......
    //!->>
    filters: {
      show: true,
      buttonCol: "col-xxl-6 col-lg-4 d-flex align-items-end justify-content-end",
      options: [
        {
          type: FilterType.INPUT,
          label: "Search role",
          name: "name",
          placeholder: "Enter role name",
          value: this.filterData.name,
        },
        {
          type: FilterType.DROPDOWN,
          label: "Status",
          name: "status",
          placeholder: "Select status",
          value: this.filterData.status,
          drops: [
            {
              name: "Active",
              _id: true,
            },
            {
              name: "Inactive",
              _id: false,
            },
          ],
        },
      ],
    },

    // For table.......
    tableItems: {
      tHeads: [
        {
          name: "Role ID",
          filter: false,
        },
        {
          name: "Role Name",
          filter: false,
        },

        {
          name: "No of Permissions",
          filter: false,
        },
        {
          name: "Status",
          filter: false,
        },
      ],

      tDescriptions: null,

      tContents: [
        {
          type: EvalType.TEXT,
          value: ["roleId"],
        },
        {
          type: EvalType.TEXT,
          value: ["name"],
        },

        {
          type: EvalType.COUNT,
          value: ["permissions"],
        },
        {
          type: EvalType.BOOLEAN,
          value: ["status"],
          true: "Active",
          false: "Inactive",
        },
      ],

      actions: {
        show: true,
        target: "role",
        options: {
          detail: {
            status: true,
            permission: fPermissions.DETAIL_ROLE,
          },
          edit: {
            status: true,
            permission: fPermissions.EDIT_ROLE,
          },
          delete: {
            status: true,
            permission: fPermissions.DELETE_ROLE,
          },
        },
      },
    },

    // For paginations.....
    paginationItems: {
      currentPage: 1,
      dataCount: 0,
      pageCount: 0,
    },
  };

  constructor(
    private roleService: RoleService,
    private modalService: BsModalService,
    private successMessage: SuccessMessage
  ) {}

  //!--> Get user roles list.....................................................................|
  getRoles(page: number, filter: FilterRoleModel) {
    this.isLoading = true;
    this.currentPage = page;
    this.roleService.getAll(page, filter).subscribe({
      next: (res) => {
        this.filterTable.paginationItems.currentPage = res.currentPage;
        this.filterTable.paginationItems.pageCount = res.pageCount;
        this.filterTable.paginationItems.dataCount = res.dataCount;
        this.filterTable.tableItems.tDescriptions = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  //!--> Clicking pagination buttons.............................................................|
  changePage(page: number) {
    this.filterTable.paginationItems.currentPage = page;
    this.getRoles(page, this.filterData);
  }

  //!--> Filter table actions....................................................................|
  async do_TableAction(option: TAction) {
    if (option.action === "detail") {
      this.open_ViewRolePOPUP(option.id);
    } else if (option.action === "edit") {
      this.open_EditRolePOPUP(option.id);
    } else if (option.action === "delete") {
      this.isLoading = true;
      this.roleService.deleteRole(option.id).subscribe({
        next: (res: sMsg) => {
          this.successMessage.show(res.message);
          this.getRoles(this.currentPage, this.filterData);
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
    }
  }

  //!--> Change filter input values.............................................................|
  change_filters(data: any) {
    this.filterData[data.key] = data.value;
  }

  //!--> Filters activated and reload filtered data.............................................|
  act_filterTable() {
    this.getRoles(1, this.filterData);
  }

  //!--> Reset table to default..................................................................|
  act_resetTable() {
    location.reload();
  }

  //!-->
  ngOnInit() {
    this.getRoles(1, this.filterData);
  }
}

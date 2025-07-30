import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {
  EvalType,
  FilterType,
} from "src/app/core/enums/shared-enums/filter-table.enum";
import { fPermissions } from "src/app/core/enums/system-enums/permission.enum";
import { FilterRoleModel } from "src/app/core/models/app-models/user-management/role.model";
import { TAction } from "src/app/core/models/shared/filter-table.model";
import {
  HeaderItems,
  OpenType,
} from "src/app/core/models/shared/page-title.model";
import { sMsg } from "src/app/core/models/shared/success-response.model";
import { RoleService } from "src/app/core/services/app-services/user-management/role.service";
import { UserService } from "src/app/core/services/app-services/user-management/user.service";
import { SuccessMessage } from "src/app/core/services/shared/success-message.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent {
  currentPage: number = 1;
  isLoading: boolean = false;

  // For filters
  filterData: FilterRoleModel = {
    name: "",
    status: "",
  };

  //!--> Page tiele data structure...................................................|
  headerItems: HeaderItems = {
    title: "SYSTEM USERS",
    button: {
      show: true,
      permission: fPermissions.ADD_USER,
      action: OpenType.OPEN_PAGE,
      name: "Create System User",
      target: "/user-management/users/add",
    },
    breadcrumb: [
      {
        name: "User management",
        link: "",
        active: false,
      },
      {
        name: "System Users",
        link: "",
        active: true,
      },
    ],
  };

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
          label: "Search user",
          name: "name",
          placeholder: "Enter user name",
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
          name: "User ID",
          filter: false,
        },
        {
          name: "User Name",
          filter: false,
        },
        {
          name: "Role",
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
          value: ["userId"],
        },
        {
          type: EvalType.TEXT,
          value: ["name"],
        },
        {
          type: EvalType.TEXT,
          value: ["role", "name"],
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
            permission: fPermissions.DETAIL_USER,
          },
          edit: {
            status: true,
            permission: fPermissions.EDIT_USER,
          },
          delete: {
            status: true,
            permission: fPermissions.DELETE_USER,
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
    private router: Router,
    private userService: UserService,
    private successMessage: SuccessMessage,
    private roleService: RoleService
  ) {}

  //!--> Get users list........................................................................|
  getUsers(page: number, filter: FilterRoleModel) {
    this.isLoading = true;
    this.currentPage = page;
    this.userService.getAllUsers(page, filter).subscribe({
      next: (res) => {
        this.filterTable.paginationItems.currentPage = res.currentPage;
        this.filterTable.paginationItems.pageCount = res.pageCount;
        this.filterTable.paginationItems.dataCount = res.dataCount;

        const userData = res.data.map((item) => {
          return { ...item.values, image: item.image };
        });

        this.filterTable.tableItems.tDescriptions = userData;
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
    this.getUsers(page, this.filterData);
  }

  //!--> Filter table actions....................................................................|
  async do_TableAction(option: TAction) {
    if (option.action === "detail") {
      this.router.navigate([`/user-management/users/detail/${option.id}`]);
    } else if (option.action === "edit") {
      this.router.navigate([`/user-management/users/edit/${option.id}`]);
    } else if (option.action === "delete") {
      this.isLoading = true;
      this.roleService.deleteRole(option.id).subscribe({
        next: (res: sMsg) => {
          this.successMessage.show(res.message);
          this.getUsers(this.currentPage, this.filterData);
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
    this.getUsers(1, this.filterData);
  }

  //!--> Reset table to default..................................................................|
  act_resetTable() {
    location.reload();
  }

  //!-->
  ngOnInit() {
    this.getUsers(1, this.filterData);
  }
}

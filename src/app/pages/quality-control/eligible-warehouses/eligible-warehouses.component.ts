import { Component } from "@angular/core";
import {
  EvalType,
  FilterType,
} from "src/app/core/enums/shared-enums/filter-table.enum";
import { fPermissions } from "src/app/core/enums/system-enums/permission.enum";
import {
  HeaderItems,
  OpenType,
} from "src/app/core/models/shared/page-title.model";
import { EligibleService } from "src/app/core/services/app-services/quality-control/eligible.service";

@Component({
  selector: "app-eligible-warehouses",
  templateUrl: "./eligible-warehouses.component.html",
  styleUrls: ["./eligible-warehouses.component.scss"],
})
export class EligibleWarehousesComponent {
  currentPage: number = 1;
  isLoading: boolean = false;

  // For filters
  filterData = {
    WarehouseCode: "",
    WarehouseName: "",
  };

  //!--> Page tiele data structure...................................................|
  headerItems: HeaderItems = {
    title: "QC ELIGIBLE WAREHOUSES",
    button: {
      show: !true,
      permission: fPermissions.ADD_USER,
      action: OpenType.OPEN_POPUP,
      name: "Create Item",
      target: "/user-management/users/add",
    },
    breadcrumb: [
      {
        name: "Quality Control",
        link: "",
        active: false,
      },
      {
        name: "QC Eligible Entities",
        link: "",
        active: false,
      },
      {
        name: "Warehouses",
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
      buttonCol:
        "col-xxl-6 col-lg-4 d-flex align-items-end justify-content-end",
      options: [
        {
          type: FilterType.INPUT,
          label: "Warehouse Code",
          name: "WarehouseCode",
          placeholder: "Enter warehouse code",
          value: this.filterData.WarehouseCode,
        },
        {
          type: FilterType.INPUT,
          label: "Warehouse Name",
          name: "WarehouseName",
          placeholder: "Enter warehouse name",
          value: this.filterData.WarehouseCode,
        },
      ],
    },

    // For table.......
    tableItems: {
      tHeads: [
        {
          name: "Warehouse Code",
          filter: false,
        },
        {
          name: "Warehouse Name",
          filter: false,
        },
        {
          name: "Warehouse Type",
          filter: false,
        },
      ],

      tDescriptions: null,

      tContents: [
        {
          type: EvalType.TEXT,
          value: ["WarehouseCode"],
        },
        {
          type: EvalType.TEXT,
          value: ["WarehouseName"],
        },
        {
          type: EvalType.TEXT,
          value: ["whType"],
        },
      ],

      actions: {
        show: !true,
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

  constructor(private eligibleService: EligibleService) {}

  //!--> Get items list.....................................................................|
  getItems(page: number, filter: any) {
    this.isLoading = true;
    this.currentPage = page;
    this.eligibleService.getAllWarehouses(page, filter).subscribe({
      next: (res) => {
        console.log(res);
        this.filterTable.paginationItems.currentPage = res.currentPage;
        this.filterTable.paginationItems.pageCount = res.pageCount;
        this.filterTable.paginationItems.dataCount = res.dataCount;

        const responseMapper = res.data.map((des: any) => {
          if (des.U_RejectWH === "Y") {
            des.whType = "Rejection Warehouse";
          } else {
            des.whType = "Approval Warehouse";
          }

          return des;
        });

        this.filterTable.tableItems.tDescriptions = responseMapper;

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
    this.getItems(page, this.filterData);
  }

  //!--> Change filter input values.............................................................|
  change_filters(data: any) {
    this.filterData[data.key] = data.value;
  }

  //!--> Filters activated and reload filtered data.............................................|
  act_filterTable() {
    this.getItems(1, this.filterData);
  }

  //!--> Reset table to default..................................................................|
  act_resetTable() {
    location.reload();
  }

  //!-->
  ngOnInit() {
    this.getItems(1, this.filterData);
  }
}

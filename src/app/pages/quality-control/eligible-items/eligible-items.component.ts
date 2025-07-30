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
  selector: "app-eligible-items",
  templateUrl: "./eligible-items.component.html",
  styleUrls: ["./eligible-items.component.scss"],
})
export class EligibleItemsComponent {
  currentPage: number = 1;
  isLoading: boolean = false;

  // For filters
  filterData = {
    ItemCode: "",
    ItemName: "",
  };

  //!--> Page tiele data structure...................................................|
  headerItems: HeaderItems = {
    title: "QC ELIGIBLE ITEMS",
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
        name: "Items",
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
          label: "Item Code",
          name: "ItemCode",
          placeholder: "Enter item code",
          value: this.filterData.ItemCode,
        },
        {
          type: FilterType.INPUT,
          label: "Item Name",
          name: "ItemName",
          placeholder: "Enter item name",
          value: this.filterData.ItemName,
        },
      ],
    },

    // For table.......
    tableItems: {
      tHeads: [
        {
          name: "Item Code",
          filter: false,
        },
        {
          name: "Item Name",
          filter: false,
        },
      ],

      tDescriptions: null,

      tContents: [
        {
          type: EvalType.TEXT,
          value: ["ItemCode"],
        },
        {
          type: EvalType.TEXT,
          value: ["ItemName"],
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
    this.eligibleService.getAll(page, filter).subscribe({
      next: (res) => {
        console.log(res);
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

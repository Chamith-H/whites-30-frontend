import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {
  EvalType,
  FilterType,
} from "src/app/core/enums/shared-enums/filter-table.enum";
import { fPermissions } from "src/app/core/enums/system-enums/permission.enum";
import { TAction } from "src/app/core/models/shared/filter-table.model";
import {
  HeaderItems,
  OpenType,
} from "src/app/core/models/shared/page-title.model";
import { sMsg } from "src/app/core/models/shared/success-response.model";
import { GatePassService } from "src/app/core/services/app-services/gate-pass/gate-pass.service";
import { SuccessMessage } from "src/app/core/services/shared/success-message.service";

@Component({
  selector: "app-gate-pass",
  templateUrl: "./gate-pass.component.html",
  styleUrls: ["./gate-pass.component.scss"],
})
export class GatePassComponent {
  currentPage: number = 1;
  isLoading: boolean = false;

  //!--> Page tiele data structure...................................................|
  headerItems: HeaderItems = {
    title: "GATE PASSES",
    button: {
      show: true,
      permission: fPermissions.ADD_USER,
      action: OpenType.OPEN_PAGE,
      name: "Create Gate Pass",
      target: "/gate-pass/create",
    },
    breadcrumb: [
      {
        name: "Security In",
        link: "",
        active: false,
      },
      {
        name: "Gate Pass",
        link: "",
        active: true,
      },
    ],
  };

  filterData = {
    driverName: "",
    driverNic: "",
    po: "",
    vehicleType: "",
    vehicleNumber: "",
    state: "",
  };

  filterTable = {
    //For filters.......
    //!->>
    filters: {
      show: true,
      buttonCol: "col-xxl-6 d-flex align-items-end justify-content-end",
      options: [
        {
          type: FilterType.INPUT,
          label: "Driver name",
          name: "driverName",
          placeholder: "Enter driver name",
          value: this.filterData.driverName,
        },
        {
          type: FilterType.INPUT,
          label: "Driver NIC",
          name: "driverNic",
          placeholder: "Enter driver NIC number",
          value: this.filterData.driverNic,
        },
        {
          type: FilterType.INPUT,
          label: "Purchase Order",
          name: "po",
          placeholder: "Enter PO number",
          value: this.filterData.po,
        },
        {
          type: FilterType.DROPDOWN,
          label: "Vehicle type",
          name: "vehicleType",
          placeholder: "Select vehicle type",
          value: this.filterData.vehicleType,
          drops: [
            {
              _id: "Lorry",
              name: "Lorry",
            },
            {
              _id: "Truck",
              name: "Truck",
            },
            {
              _id: "Container",
              name: "Container",
            },
          ],
        },
        {
          type: FilterType.INPUT,
          label: "Vehicle number",
          name: "vehicleNumber",
          placeholder: "Enter vehicle number",
          value: this.filterData.vehicleNumber,
        },
        {
          type: FilterType.DROPDOWN,
          label: "Status",
          name: "status",
          placeholder: "Select status",
          value: this.filterData.state,
          drops: [
            {
              name: "Draft",
              _id: "Draft",
            },
            {
              name: "Completed",
              _id: "Completed",
            },
            {
              name: "Cancelled",
              _id: "Cancelled",
            },
          ],
        },
      ],
    },

    // For table.......
    tableItems: {
      tHeads: [
        {
          name: "Gatepass ID",
          filter: false,
        },
        {
          name: "Purchase Order",
          filter: false,
        },
        {
          name: "Driver Name",
          filter: false,
        },
        {
          name: "Vehicle Number",
          filter: false,
        },
        {
          name: "Created By",
          filter: false,
        },
        {
          name: "Created Date",
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
          value: ["gatePassId"],
        },
        {
          type: EvalType.TEXT,
          value: ["po"],
        },
        {
          type: EvalType.TEXT,
          value: ["driverName"],
        },
        {
          type: EvalType.TEXT,
          value: ["vehicleNumber"],
        },
        {
          type: EvalType.TEXT,
          value: ["createdBy", "name"],
        },
        {
          type: EvalType.TEXT,
          value: ["createdDate"],
        },
        {
          type: EvalType.CUSTOM,
          value: ["state"],
          options: [
            {
              optValue: "Draft",
              class: 1,
            },
            {
              optValue: "Completed",
              class: 2,
            },
          ],
        },
      ],

      actions: {
        show: true,
        target: "gate pass",
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
    private gatePassService: GatePassService,
    private successMessage: SuccessMessage
  ) {}

  getGatePasses(page: number, filter: any) {
    this.isLoading = true;
    this.currentPage = page;
    this.gatePassService.getAllGatepasses(page, filter).subscribe({
      next: (res) => {
        this.filterTable.paginationItems.currentPage = res.currentPage;
        this.filterTable.paginationItems.pageCount = res.pageCount;
        this.filterTable.paginationItems.dataCount = res.dataCount;

        const dataMapper = res.data.map((item: any) => {
          if (item.state === "Draft") {
            item.showEdit = "Y";
          } else {
            item.showEdit = "N";
          }

          item.createdDate = item.createdDate.split("T")[0];

          return item;
        });

        this.filterTable.tableItems.tDescriptions = dataMapper;
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
    this.getGatePasses(page, this.filterData);
  }

  //!--> Filter table actions....................................................................|
  async do_TableAction(option: TAction) {
    if (option.action === "detail") {
      this.router.navigate([`/gate-pass/detail/${option.id}`]);
    } else if (option.action === "edit") {
      this.router.navigate([`/gate-pass/edit/${option.id}`]);
    } else if (option.action === "delete") {
      this.isLoading = true;
      this.gatePassService.deleteGatePass(option.id).subscribe({
        next: (res: sMsg) => {
          this.successMessage.show(res.message);
          this.getGatePasses(
            this.filterTable.paginationItems.currentPage,
            this.filterData
          );
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
    this.getGatePasses(1, this.filterData);
  }

  //!--> Reset table to default..................................................................|
  act_resetTable() {
    location.reload();
  }

  //!-->
  ngOnInit() {
    this.getGatePasses(1, this.filterData);
  }
}

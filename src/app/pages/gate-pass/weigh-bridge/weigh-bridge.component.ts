import { Component } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Behavior } from "src/app/core/enums/shared-enums/behavior.enum";
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
import { WeighBridgeService } from "src/app/core/services/app-services/gate-pass/weigh-bridge.service";
import { SuccessMessage } from "src/app/core/services/shared/success-message.service";
import { WeightRecordComponent } from "./weight-record/weight-record.component";
import { ViewWeightComponent } from "./view-weight/view-weight.component";

@Component({
  selector: "app-weigh-bridge",
  templateUrl: "./weigh-bridge.component.html",
  styleUrls: ["./weigh-bridge.component.scss"],
})
export class WeighBridgeComponent {
  // For filters
  filterData = {
    gatePassId: "",
    po: "",
    itemCode: "",
  };

  isLoading: boolean = false;
  modalRef?: BsModalRef;

  //!--> Page tiele data structure...................................................|
  headerItems: HeaderItems = {
    title: "Weighbridge",
    button: {
      show: !true,
      permission: fPermissions.ADD_ROLE,
      action: OpenType.OPEN_POPUP,
      name: "Create user role",
      target: Behavior.CREATE_MODE,
    },
    breadcrumb: [
      {
        name: "Security In",
        link: "",
        active: false,
      },
      {
        name: "Weighbridge",
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
        "col-xxl-3 col-lg-12 col-md-6 col-sm-6 d-flex align-items-end justify-content-end",
      options: [
        {
          type: FilterType.INPUT,
          label: "Gatepass ID",
          name: "gatePassId",
          placeholder: "Enter Gatepass ID",
          value: this.filterData.gatePassId,
        },
        {
          type: FilterType.INPUT,
          label: "Purchase Order",
          name: "po",
          placeholder: "Enter Purchase-Order Number",
          value: this.filterData.po,
        },
        {
          type: FilterType.INPUT,
          label: "Item Code",
          name: "itemCode",
          placeholder: "Enter Item Code",
          value: this.filterData.itemCode,
        },
      ],
    },

    // For table.......
    tableItems: {
      tHeads: [
        {
          name: "Gate Pass ID",
          filter: false,
        },
        {
          name: "PO Number",
          filter: false,
        },
        {
          name: "Item Code",
          filter: false,
        },
        {
          name: "First Weight (fWg)",
          filter: false,
        },
        {
          name: "Second Weight (sWg)",
          filter: false,
        },
        {
          name: "Actual Weight (sWg - fWg)",
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
          value: ["itemCode"],
        },
        {
          type: EvalType.TEXT,
          value: ["fWeight"],
        },
        {
          type: EvalType.TEXT,
          value: ["sWeight"],
        },
        {
          type: EvalType.TEXT,
          value: ["aWeight"],
        },

        {
          type: EvalType.CUSTOM,
          value: ["status"],
          options: [
            {
              optValue: "Open",
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
        target: "Weigh-Bridge",
        options: {
          detail: {
            status: true,
            permission: fPermissions.DETAIL_ROLE,
          },
          config: {
            status: true,
            permission: fPermissions.EDIT_ROLE,
          },
          edit: {
            status: !true,
            permission: fPermissions.EDIT_ROLE,
          },
          delete: {
            status: !true,
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
    private weighBridgeService: WeighBridgeService,
    private modalService: BsModalService,
    private successMessage: SuccessMessage
  ) {}

  open_weightRecordPopup(option: TAction) {
    this.modalRef = this.modalService.show(WeightRecordComponent, {
      initialState: {
        id: option.id,
        data: option.data,
      },

      class: "modal-lg modal-dialog-centered",
    });

    this.modalRef.content.closePopup.subscribe(() => {
      this.modalRef.hide();
    });

    this.modalRef.content.closePopupAndReload.subscribe(() => {
      this.modalRef.hide();
      this.getRoles(
        this.filterTable.paginationItems.currentPage,
        this.filterData
      );
    });
  }

  open_weightViewPopup(option: TAction) {
    this.modalRef = this.modalService.show(ViewWeightComponent, {
      initialState: {
        id: option.id,
        data: option.data,
      },

      class: "modal-lg modal-dialog-centered",
    });

    this.modalRef.content.closePopup.subscribe(() => {
      this.modalRef.hide();
    });
  }

  //!--> Get user roles list.....................................................................|
  getRoles(page: number, filter: any) {
    this.isLoading = true;
    this.weighBridgeService.getAll(page, filter).subscribe({
      next: (res) => {
        this.filterTable.paginationItems.currentPage = res.currentPage;
        this.filterTable.paginationItems.pageCount = res.pageCount;
        this.filterTable.paginationItems.dataCount = res.dataCount;

        const resMapper = res.data.map((r_data: any) => {
          if (r_data.status === "Completed") {
            r_data.showConfig = "N";
          } else {
            r_data.showConfig = "Y";
          }

          if (
            r_data.firstWeight &&
            r_data.firstWeight !== "" &&
            r_data.secondWeight &&
            r_data.secondWeight !== ""
          ) {
            r_data.fWeight = `${r_data.firstWeight} Kg`;
            r_data.sWeight = `${r_data.secondWeight} Kg`;
            r_data.aWeight = `${r_data.firstWeight - r_data.secondWeight} Kg`;
          }

          if (r_data.firstWeight && r_data.firstWeight !== "") {
            r_data.fWeight = `${r_data.firstWeight} Kg`;
          } else {
            r_data.fWeight = "__";
            r_data.aWeight = "__";
          }

          if (r_data.secondWeight && r_data.secondWeight !== "") {
            r_data.sWeight = `${r_data.secondWeight} Kg`;
          } else {
            r_data.sWeight = "__";
            r_data.aWeight = "__";
          }

          return r_data;
        });
        this.filterTable.tableItems.tDescriptions = resMapper;
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
    if (option.action === "config") {
      this.open_weightRecordPopup(option);
    } else if (option.action === "detail") {
      this.open_weightViewPopup(option);
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

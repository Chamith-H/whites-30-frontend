import { Component } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
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
import { InspectionService } from "src/app/core/services/app-services/operations/inspection.service";
import { InspectionConfComponent } from "./inspection-conf/inspection-conf.component";
import { InspectionViewComponent } from "./inspection-view/inspection-view.component";

@Component({
  selector: "app-inspections",
  templateUrl: "./inspections.component.html",
  styleUrls: ["./inspections.component.scss"],
})
export class InspectionsComponent {
  modalRef?: BsModalRef;

  headerItems: HeaderItems = {
    title: "QC INSPECTIONS",
    button: {
      show: false,
      permission: fPermissions.ADD_USER,
      action: OpenType.OPEN_POPUP,
      name: "Create QC-Parameter",
      target: null,
    },
    breadcrumb: [
      {
        name: "Quality Control",
        link: "",
        active: false,
      },
      {
        name: "Inspections",
        link: "",
        active: true,
      },
    ],
  };

  filterData = {
    stage: "",
    DocNum: "",
    ItemCode: "",
    U_Approval: "",
  };

  filterTable = {
    //For filters.......
    //!->>
    filters: {
      show: true,
      buttonCol: "col-xxl-12 col-lg-8 d-flex align-items-end justify-content-end",
      options: [
        {
          type: FilterType.DROPDOWN,
          label: "Stage",
          name: "stage",
          placeholder: "Select stage",
          value: this.filterData.stage,
          drops: [
            {
              name: "Good Receipt Note",
              _id: "GRN",
            },
            {
              name: "Inventory Transfer",
              _id: "IVR",
            },
          ],
        },
        {
          type: FilterType.INPUT,
          label: "Base Document",
          name: "DocNum",
          placeholder: "Enter item name",
          value: this.filterData.DocNum,
        },
        {
          type: FilterType.INPUT,
          label: "Item Code",
          name: "ItemCode",
          placeholder: "Enter item code",
          value: this.filterData.ItemCode,
        },

        {
          type: FilterType.DROPDOWN,
          label: "Approval Status",
          name: "U_Approval",
          placeholder: "Select approval status",
          value: this.filterData.U_Approval,
          drops: [
            {
              name: "Open",
              _id: "Open",
            },
            {
              name: "Pending",
              _id: "Pending",
            },
            {
              name: "Approved",
              _id: "Approved",
            },
            {
              name: "Rejected",
              _id: "Rejected",
            },
          ],
        },
      ],
    },

    // For table.......
    tableItems: {
      tHeads: [
        {
          name: "Request No",
          filter: false,
        },
        {
          name: "Base Type",
          filter: false,
        },
        {
          name: "Base Document",
          filter: false,
        },
        {
          name: "Line Number",
          filter: false,
        },
        {
          name: "Item Code",
          filter: false,
        },
        {
          name: "Batch",
          filter: false,
        },
        {
          name: "Created Date",
          filter: false,
        },
        {
          name: "Approval Status",
          filter: false,
        },
      ],

      tDescriptions: null,

      tContents: [
        {
          type: EvalType.TEXT,
          value: ["reqNo"],
        },
        {
          type: EvalType.TEXT,
          value: ["stage"],
        },
        {
          type: EvalType.TEXT,
          value: ["DocNum"],
        },
        {
          type: EvalType.TEXT,
          value: ["Line"],
        },
        {
          type: EvalType.TEXT,
          value: ["ItemCode"],
        },
        {
          type: EvalType.TEXT,
          value: ["Batch"],
        },
        {
          type: EvalType.TEXT,
          value: ["CreationDate"],
        },
        {
          type: EvalType.CUSTOM,
          value: ["U_Approval"],
          options: [
            {
              optValue: "Open",
              class: 1,
            },
            {
              optValue: "Pending",
              class: 4,
            },
            {
              optValue: "Approved",
              class: 2,
            },
            {
              optValue: "Rejected",
              class: 5,
            },
          ],
        },
      ],

      actions: {
        show: true,
        target: "UOM",
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
            status: false,
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

  isLoading: boolean = false;

  constructor(
    private modalService: BsModalService,
    private inspectionService: InspectionService
  ) {}

  //!--> Get data
  getData(page: number, filter: any) {
    this.isLoading = true;

    this.inspectionService.getAll(page, filter).subscribe({
      next: (res) => {
        console.log(res);
        this.filterTable.paginationItems.currentPage = res.currentPage;
        this.filterTable.paginationItems.pageCount = res.pageCount;
        this.filterTable.paginationItems.dataCount = res.dataCount;
        this.filterTable.tableItems.tDescriptions = res.data;

        const dataMapper = res.data.map((r_data: any) => {
          r_data.reqNo = `${r_data.stage}-${r_data.DocNum}-L${r_data.Line}-R${r_data.U_Round}`;

          if (r_data.U_Approval === "Open" || r_data.U_Approval === "Pending") {
            r_data.showConfig = "Y";
          } else {
            r_data.showConfig = "N";
          }

          return r_data;
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

  changePage(page: number) {
    this.filterTable.paginationItems.currentPage = page;
    this.getData(page, this.filterData);
  }

  async do_TableAction(option: TAction) {
    if (option.action === "detail") {
      this.modalRef = this.modalService.show(InspectionViewComponent, {
        initialState: {
          data: option.data,
          stage: option.data.stage,
        },
        backdrop: "static",

        class: "modal-xl modal-dialog-centered",
      });

      this.modalRef.content.closePopup.subscribe(() => {
        this.modalRef.hide();
      });

      this.modalRef.content.closePopupAndReload.subscribe(() => {
        this.modalRef.hide();
        this.getData(
          this.filterTable.paginationItems.currentPage,
          this.filterData
        );
      });
    } else if (option.action === "config") {
      this.modalRef = this.modalService.show(InspectionConfComponent, {
        initialState: {
          data: option.data,
          stage: option.data.stage,
        },
        backdrop: "static",

        class: "modal-xl modal-dialog-centered",
      });

      this.modalRef.content.closePopup.subscribe(() => {
        this.modalRef.hide();
      });

      this.modalRef.content.closePopupAndReload.subscribe(() => {
        this.modalRef.hide();
        this.getData(
          this.filterTable.paginationItems.currentPage,
          this.filterData
        );
      });
    }
  }

  change_filters(data: any) {
    this.filterData[data.key] = data.value;
  }

  act_filterTable() {
    this.getData(1, this.filterData);
  }

  act_resetTable() {
    // this.filterData.code = "";
    // this.filterData.name = "";
    this.getData(1, {});
  }

  ngOnInit() {
    this.getData(1, this.filterData);
  }
}

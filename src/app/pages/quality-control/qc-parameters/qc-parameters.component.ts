import { Component } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Behavior } from "src/app/core/enums/shared-enums/behavior.enum";
import { fPermissions } from "src/app/core/enums/system-enums/permission.enum";
import {
  HeaderItems,
  OpenType,
} from "src/app/core/models/shared/page-title.model";
import { ParametersFormComponent } from "./parameters-form/parameters-form.component";
import {
  EvalType,
  FilterType,
} from "src/app/core/enums/shared-enums/filter-table.enum";
import { QcParameterService } from "src/app/core/services/app-services/quality-control/qc-parameter.service";
import { TAction } from "src/app/core/models/shared/filter-table.model";
import { sMsg } from "src/app/core/models/shared/success-response.model";
import { SuccessMessage } from "src/app/core/services/shared/success-message.service";

@Component({
  selector: "app-qc-parameters",
  templateUrl: "./qc-parameters.component.html",
  styleUrls: ["./qc-parameters.component.scss"],
})
export class QcParametersComponent {
  modalRef?: BsModalRef;

  headerItems: HeaderItems = {
    title: "QUALITY CONTROL PARAMETERS",
    button: {
      show: true,
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
        name: "QC Parameters",
        link: "",
        active: true,
      },
    ],
  };

  constructor(
    private modalService: BsModalService,
    private qcParameterService: QcParameterService,
    private successMessage: SuccessMessage
  ) {}

  createRecord() {
    this.modalRef = this.modalService.show(ParametersFormComponent, {
      initialState: {
        mode: Behavior.CREATE_MODE,
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

  editRecord(id: string, data: any) {
    this.modalRef = this.modalService.show(ParametersFormComponent, {
      initialState: {
        mode: Behavior.EDIT_MODE,
        id: id,
        data: data,
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

  viewRecord(id: string, data: any) {}

  filterData = {
    code: "",
    name: "",
    category: "",
    type: "",
  };

  filterTable = {
    //For filters.......
    //!->>
    filters: {
      show: true,
      buttonCol: "col-xxl-12 col-lg-8 d-flex align-items-end justify-content-end",
      options: [
        {
          type: FilterType.INPUT,
          label: "Parameter Code",
          name: "code",
          placeholder: "Enter parameter code",
          value: this.filterData.code,
        },
        {
          type: FilterType.INPUT,
          label: "Parameter Name",
          name: "name",
          placeholder: "Enter parameter name",
          value: this.filterData.code,
        },
        {
          type: FilterType.DROPDOWN,
          label: "Parameter Category",
          name: "category",
          placeholder: "Select parameter category",
          value: this.filterData.category,
          drops: [
            {
              name: "Fixed",
              _id: "Fixed",
            },
            {
              name: "Range",
              _id: "Range",
            },
            {
              name: "Grater-Than",
              _id: "Grater-Than",
            },
            {
              name: "Less-Than",
              _id: "Less-Than",
            },
          ],
        },
        {
          type: FilterType.DROPDOWN,
          label: "Parameter Type",
          name: "type",
          placeholder: "Select parameter type",
          value: this.filterData.type,
          drops: [
            {
              name: "Numeric",
              _id: "Numeric",
            },
            {
              name: "Non-Numeric",
              _id: "Non-Numeric",
            },
            {
              name: "Percentage",
              _id: "Percentage",
            },
            {
              name: "Boolean",
              _id: "Boolean",
            },
          ],
        },
      ],
    },

    // For table.......
    tableItems: {
      tHeads: [
        {
          name: "Parameter Code",
          filter: false,
        },
        {
          name: "Parameter Name",
          filter: false,
        },
        {
          name: "Category",
          filter: false,
        },
        {
          name: "Type",
          filter: false,
        },
        {
          name: "UOM",
          filter: false,
        },
        {
          name: "Equipment",
          filter: false,
        },
      ],

      tDescriptions: null,

      tContents: [
        {
          type: EvalType.TEXT,
          value: ["code"],
        },
        {
          type: EvalType.TEXT,
          value: ["name"],
        },
        {
          type: EvalType.TEXT,
          value: ["category"],
        },
        {
          type: EvalType.TEXT,
          value: ["type"],
        },
        {
          type: EvalType.TEXT,
          value: ["uom", "name"],
        },
        {
          type: EvalType.TEXT,
          value: ["equipment", "name"],
        },
      ],

      actions: {
        show: true,
        target: "QC Parameter",
        options: {
          detail: {
            status: !true,
            permission: fPermissions.DETAIL_ROLE,
          },
          edit: {
            status: true,
            permission: fPermissions.EDIT_ROLE,
          },
          delete: {
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

  isLoading: boolean = false;

  //!--> Get data
  getData(page: number, filter: any) {
    this.isLoading = true;

    this.qcParameterService.getAllParameters(page, filter).subscribe({
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

  changePage(page: number) {
    this.filterTable.paginationItems.currentPage = page;
    this.getData(page, this.filterData);
  }

  async do_TableAction(option: TAction) {
    if (option.action === "detail") {
      // this.viewItem(option.data);
    } else if (option.action === "edit") {
      this.editRecord(option.id, option.data);
    } else if (option.action === "delete") {
      this.isLoading = true;
      this.qcParameterService.deleteQcParameter(option.id).subscribe({
        next: (res: sMsg) => {
          this.successMessage.show(res.message);
          this.getData(
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

  change_filters(data: any) {
    this.filterData[data.key] = data.value;
  }

  act_filterTable() {
    this.getData(1, this.filterData);
  }

  act_resetTable() {
    this.filterData.code = "";
    this.filterData.name = "";
    this.getData(1, {});
  }

  ngOnInit() {
    this.getData(1, this.filterData);
  }
}

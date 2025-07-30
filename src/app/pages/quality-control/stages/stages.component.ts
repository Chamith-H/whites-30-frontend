import { Component } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { fPermissions } from "src/app/core/enums/system-enums/permission.enum";
import {
  HeaderItems,
  OpenType,
} from "src/app/core/models/shared/page-title.model";
import { RelationSetterComponent } from "./relation-setter/relation-setter.component";
import { Behavior } from "src/app/core/enums/shared-enums/behavior.enum";
import {
  EvalType,
  FilterType,
} from "src/app/core/enums/shared-enums/filter-table.enum";
import { StageService } from "src/app/core/services/app-services/quality-control/stage.service";
import { TAction } from "src/app/core/models/shared/filter-table.model";
import { EditStageComponent } from "./edit-stage/edit-stage.component";
import { ViewStageComponent } from "./view-stage/view-stage.component";
import { sMsg } from "src/app/core/models/shared/success-response.model";
import { SuccessMessage } from "src/app/core/services/shared/success-message.service";

@Component({
  selector: "app-stages",
  templateUrl: "./stages.component.html",
  styleUrls: ["./stages.component.scss"],
})
export class StagesComponent {
  selectedStage = "GRN";
  modalRef?: BsModalRef;

  headerItems: HeaderItems = {
    title: "QUALITY CHECKING STAGES",
    button: {
      show: !true,
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
        name: "Stages",
        link: "",
        active: true,
      },
    ],
  };

  constructor(
    private modalService: BsModalService,
    private stageService: StageService,
    private successMessage: SuccessMessage
  ) {}

  createRelation() {
    this.modalRef = this.modalService.show(RelationSetterComponent, {
      initialState: {
        mode: Behavior.CREATE_MODE,
        stage: this.selectedStage,
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

  editRelation(id: string, data: any) {
    this.modalRef = this.modalService.show(EditStageComponent, {
      initialState: {
        id: id,
        stage: data.stageName,
        itemCode: data.itemCode,
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

  viewRelation(id: string, data: any) {
    this.modalRef = this.modalService.show(ViewStageComponent, {
      initialState: {
        id: id,
        stage: data.stageName,
        itemCode: data.itemCode,
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

  filterData = {
    itemCode: "",
    method: "",
    sampleCount: "",
  };

  filterTable = {
    //For filters.......
    //!->>
    filters: {
      show: true,
      buttonCol: "col-xxl-3 col-lg-12 col-md-6 col-sm-6 d-flex align-items-end justify-content-end",
      options: [
        {
          type: FilterType.INPUT,
          label: "Item Code",
          name: "ItemCode",
          placeholder: "Enter item code",
          value: this.filterData.itemCode,
        },

        {
          type: FilterType.INPUT,
          label: "Checking Method",
          name: "method",
          placeholder: "Enter checking method",
          value: this.filterData.method,
        },
        {
          type: FilterType.INPUT,
          label: "Sample Count",
          name: "sampleCount",
          placeholder: "Enter sample count",
          value: this.filterData.sampleCount,
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
          name: "Checking Method",
          filter: false,
        },
        {
          name: "Sample Count",
          filter: false,
        },
      ],

      tDescriptions: null,

      tContents: [
        {
          type: EvalType.TEXT,
          value: ["itemCode"],
        },
        {
          type: EvalType.TEXT,
          value: ["method"],
        },
        {
          type: EvalType.TEXT,
          value: ["sampleCount"],
        },
      ],

      actions: {
        show: true,
        target: "item-parameter relation",
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

    let convertedFilter = { stageName: this.selectedStage, ...filter };

    this.stageService.getAll(page, convertedFilter).subscribe({
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
      this.viewRelation(option.id, option.data);
    } else if (option.action === "edit") {
      this.editRelation(option.id, option.data);
    } else if (option.action === "delete") {
      this.isLoading = true;
      this.stageService.deleteStage(option.id).subscribe({
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
    // this.filterData.code = "";
    // this.filterData.name = "";
    this.getData(1, {});
  }

  setStage(stage: string) {
    this.selectedStage = stage;
    this.getData(1, this.filterData);
  }

  ngOnInit() {
    this.getData(1, this.filterData);
  }
}

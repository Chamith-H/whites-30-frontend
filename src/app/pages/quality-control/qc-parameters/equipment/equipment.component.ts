import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Behavior } from "src/app/core/enums/shared-enums/behavior.enum";
import {
  EvalType,
  FilterType,
} from "src/app/core/enums/shared-enums/filter-table.enum";
import { fPermissions } from "src/app/core/enums/system-enums/permission.enum";
import { QcParameterService } from "src/app/core/services/app-services/quality-control/qc-parameter.service";
import { TAction } from "src/app/core/models/shared/filter-table.model";
import { EquipmentFormComponent } from "./equipment-form/equipment-form.component";
import { sMsg } from "src/app/core/models/shared/success-response.model";
import { SuccessMessage } from "src/app/core/services/shared/success-message.service";

@Component({
  selector: "app-equipment",
  templateUrl: "./equipment.component.html",
  styleUrls: ["./equipment.component.scss"],
})
export class EquipmentComponent {
  @Input() mode: Behavior.CREATE_MODE;
  @Input() data: any;

  @Output() closePopup = new EventEmitter<any>();
  @Output() closePopupAndReload = new EventEmitter<any>();

  modalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private qcParameterService: QcParameterService,
    private successMessage: SuccessMessage
  ) {}

  create() {
    this.modalRef = this.modalService.show(EquipmentFormComponent, {
      initialState: {
        mode: Behavior.CREATE_MODE,
      },
      backdrop: "static",

      class: "modal-md modal-dialog-centered",
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

  edit(id: string, data: any) {
    this.modalRef = this.modalService.show(EquipmentFormComponent, {
      initialState: {
        mode: Behavior.EDIT_MODE,
        id: id,
        data: data,
      },
      backdrop: "static",

      class: "modal-md modal-dialog-centered",
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
    code: "",
    name: "",
  };

  filterTable = {
    //For filters.......
    //!->>
    filters: {
      show: true,
      buttonCol: "col-6 d-flex align-items-end justify-content-end",
      options: [
        {
          type: FilterType.INPUT,
          label: "Item Code",
          name: "ItemCode",
          placeholder: "Enter item code",
          value: this.filterData.code,
        },
        {
          type: FilterType.INPUT,
          label: "Item Name",
          name: "ItemName",
          placeholder: "Enter item name",
          value: this.filterData.code,
        },
      ],
    },

    // For table.......
    tableItems: {
      tHeads: [
        {
          name: "Equipment Code",
          filter: false,
        },
        {
          name: "Equipment Name",
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
      ],

      actions: {
        show: true,
        target: "Equipment",
        options: {
          delete: {
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

  isLoading: boolean = false;

  //!--> Get data
  getData(page: number, filter: any) {
    this.isLoading = true;

    this.qcParameterService.getAllEquipment(page, filter).subscribe({
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
    if (option.action === "delete") {
      this.isLoading = true;
      this.qcParameterService.deletEquipment(option.id).subscribe({
        next: (data: sMsg) => {
          this.successMessage.show(data.message);
          this.getData(
            this.filterTable.paginationItems.currentPage,
            this.filterData
          );
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else if (option.action === "edit") {
      this.edit(option.id, option.data);
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

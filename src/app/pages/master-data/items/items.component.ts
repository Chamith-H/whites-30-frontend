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
import { ItemService } from "src/app/core/services/app-services/master-data/item.service";
import { ItemFormComponent } from "./item-form/item-form.component";
import { Behavior } from "src/app/core/enums/shared-enums/behavior.enum";
import { ItemViewComponent } from "./item-view/item-view.component";

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.scss"],
})
export class ItemsComponent {
  //!--> Page variables..............................................................|
  currentPage: number = 1;
  isLoading: boolean = false;

  modalRef?: BsModalRef;

  // For filters
  filterData = {
    ItemCode: "",
    ItemName: "",
  };

  //!--> Page tiele data structure...................................................|
  headerItems: HeaderItems = {
    title: "ITEMS",
    button: {
      show: true,
      permission: fPermissions.ADD_USER,
      action: OpenType.OPEN_POPUP,
      name: "Create Item",
      target: "/user-management/users/add",
    },
    breadcrumb: [
      {
        name: "Master Data",
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
    private itemService: ItemService,
    private modalService: BsModalService
  ) {}

  //!--> Get items list.....................................................................|
  getItems(page: number, filter: any) {
    this.isLoading = true;
    this.currentPage = page;
    this.itemService.getAll(page, filter).subscribe({
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
    this.getItems(page, this.filterData);
  }

  //!--> Filter table actions....................................................................|
  async do_TableAction(option: TAction) {
    if (option.action === "detail") {
      this.viewItem(option.data);
    } else if (option.action === "edit") {
      this.editItem(option.data);
    }
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

  //!--> Close opened popups....................................................................|
  closeOpenPopus() {
    this.modalRef.hide();
  }

  closeOpenPopupsAndReload() {
    this.modalRef.hide();
    this.getItems(
      this.filterTable.paginationItems.currentPage,
      this.filterData
    );
  }

  //!--> Open create item popup.................................................................|
  createItem() {
    this.modalRef = this.modalService.show(ItemFormComponent, {
      initialState: {
        mode: Behavior.CREATE_MODE,
      },
      backdrop: "static",

      class: "modal-lg modal-dialog-centered",
    });

    this.modalRef.content.closePopup.subscribe(() => {
      this.closeOpenPopus();
    });

    this.modalRef.content.closePopupAndReload.subscribe(() => {
      this.closeOpenPopupsAndReload();
    });
  }

  //!--> Open view item popup...................................................................|
  viewItem(data: any) {
    this.modalRef = this.modalService.show(ItemViewComponent, {
      initialState: {
        data: data,
      },
      backdrop: "static",

      class: "modal-lg modal-dialog-centered",
    });

    this.modalRef.content.closePopup.subscribe(() => {
      this.closeOpenPopus();
    });
  }

  //!--> Open edit item popup...................................................................|
  editItem(data: any) {
    this.modalRef = this.modalService.show(ItemFormComponent, {
      initialState: {
        mode: Behavior.EDIT_MODE,
        targetId: data._id,
        data: data,
      },
      backdrop: "static",

      class: "modal-lg modal-dialog-centered",
    });

    this.modalRef.content.closePopup.subscribe(() => {
      this.closeOpenPopus();
    });

    this.modalRef.content.closePopupAndReload.subscribe(() => {
      this.closeOpenPopupsAndReload();
    });
  }

  //!-->
  ngOnInit() {
    this.getItems(1, this.filterData);
  }
}

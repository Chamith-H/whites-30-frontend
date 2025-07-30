import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Behavior } from "src/app/core/enums/shared-enums/behavior.enum";
import { sMsg } from "src/app/core/models/shared/success-response.model";
import { ItemService } from "src/app/core/services/app-services/master-data/item.service";
import { SapMasterService } from "src/app/core/services/app-services/master-data/sap-master.service";
import { SuccessMessage } from "src/app/core/services/shared/success-message.service";

@Component({
  selector: "app-item-form",
  templateUrl: "./item-form.component.html",
  styleUrls: ["./item-form.component.scss"],
})
export class ItemFormComponent {
  @Input() mode: Behavior;
  @Input() targetId: string;
  @Input() data: any;

  isSubmitting: boolean = false;
  itemForm: FormGroup;
  isSubmit: boolean = false;

  loadingNumberSeqs: boolean = false;
  loadingItemGroups: boolean = false;
  loadingUomGroups: boolean = false;

  numberSeqs = [];
  itemGroups = [];
  uomGroups = [];

  itemTypes = [
    {
      _id: "I",
      name: "Items",
      recover: "itItems",
    },
    {
      _id: "L",
      name: "Labor",
      recover: "itLabor",
    },
    {
      _id: "T",
      name: "Travel",
      recover: "itTravel",
    },
    {
      _id: "F",
      name: "Fixed Assets",
      recover: "itFixedAssets",
    },
  ];

  valuationMethods = [
    {
      _id: "A",
      name: "Moving Average",
      recover: "bis_MovingAverage",
    },
    {
      _id: "S",
      name: "Labor",
      recover: "bis_Labor",
    },
    {
      _id: "F",
      name: "FIFO",
      recover: "bis_FIFO",
    },
    {
      _id: "B",
      name: "Serial/Batch",
      recover: "bis_Batch",
    },
  ];

  inventoryMethods = [
    {
      _id: "W",
      name: "Warehouse",
      recover: "glm_WH",
    },
    {
      _id: "C",
      name: "Item Group",
      recover: "glm_ItemClass",
    },
    {
      _id: "L",
      name: "Item Level",
      recover: "glm_ItemLevel",
    },
  ];

  planningMethods = [
    {
      _id: "M",
      name: "MRP",
      recover: "bop_MRP",
    },
    {
      _id: "N",
      name: "None",
      recover: "bop_None",
    },
  ];

  procumentMethods = [
    {
      _id: "B",
      name: "Buy",
      recover: "bom_Buy",
    },
    {
      _id: "M",
      name: "Make",
      recover: "bom_Make",
    },
  ];

  issueMethods = [
    {
      _id: "B",
      name: "Backflush",
      recover: "im_Backflush",
    },
    {
      _id: "M",
      name: "Manual",
      recover: "im_Manual",
    },
  ];

  itemCategories = [
    {
      _id: "inventory",
      name: "Inventory Item",
    },
    {
      _id: "purchasing",
      name: "Purchasing Item",
    },
    {
      _id: "sales",
      name: "Sales Item",
    },
  ];

  @Output() closePopup = new EventEmitter<any>();
  @Output() closePopupAndReload = new EventEmitter<any>();

  closeModal() {
    this.closePopup.emit();
  }

  closeModelAndReload() {
    this.closePopupAndReload.emit();
  }

  constructor(
    public fb: FormBuilder,
    private sapMasterService: SapMasterService,
    private itemService: ItemService,
    public toastr: ToastrService,
    private successMessage: SuccessMessage
  ) {
    this.itemForm = this.fb.group({
      category: [[], [Validators.required]],
      seq: [null, [Validators.required]],
      code: ["", [Validators.required]],
      name: ["", [Validators.required]],
      type: [null, [Validators.required]],
      group: [null, [Validators.required]],
      uomGroup: [null, [Validators.required]],
      invMethod: [null, [Validators.required]],
      valMethod: [null, [Validators.required]],
      planMethod: [null, [Validators.required]],
      procumentMethod: [null, [Validators.required]],
      issueMethod: [null, [Validators.required]],
      status: [true],
    });
  }

  resetFields() {}

  onSubmit() {
    this.isSubmit = true;

    // Show error when form is invalid
    if (this.itemForm.invalid) {
      this.toastr.error("Please fill the details correctly.");
      return;
    }

    this.isSubmitting = true;

    if (this.mode !== Behavior.EDIT_MODE) {
      this.itemService.createItem(this.itemForm.value).subscribe({
        next: (data: sMsg) => {
          this.isSubmitting = false;
          this.successMessage.show(data.message);
          this.closeModelAndReload();
        },
        error: (err) => {
          console.log(err);
          this.isSubmitting = false;
        },
      });
    } else {
      this.itemService.updateItem(this.itemForm.value).subscribe({
        next: (data: sMsg) => {
          this.isSubmitting = false;
          this.successMessage.show(data.message);
          this.closeModelAndReload();
        },
        error: (err) => {
          console.log(err);
          this.isSubmitting = false;
        },
      });
    }
  }

  getSapMasters() {
    this.loadingNumberSeqs = true;
    this.loadingItemGroups = true;
    this.loadingUomGroups = true;
    this.sapMasterService.getMastersForItem().subscribe({
      next: (data: any) => {
        this.numberSeqs = data.numberSeqs;
        this.itemGroups = data.itemGroups;
        this.uomGroups = data.uomGroups;

        this.loadingNumberSeqs = false;
        this.loadingItemGroups = false;
        this.loadingUomGroups = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //!-->
  ngOnInit() {
    this.getSapMasters();

    if (this.mode === Behavior.EDIT_MODE) {
      let itemCategory = [];

      if (this.data.InventoryItem === "tYES") {
        itemCategory.push("inventory");
      }

      if (this.data.PurchaseItem === "tYES") {
        itemCategory.push("purchasing");
      }

      if (this.data.SalesItem === "tYES") {
        itemCategory.push("sales");
      }

      const formValues = {
        category: itemCategory,
        seq: "M",
        code: this.data.ItemCode,
        name: this.data.ItemName,
        type: this.itemTypes.find(
          (type: any) => type.recover === this.data.ItemType
        )?._id,
        group: this.data.ItemsGroupCode,
        uomGroup: this.data.UoMGroupEntry,

        invMethod: this.inventoryMethods.find(
          (method: any) => method.recover === this.data.GLMethod
        )?._id,

        valMethod: this.valuationMethods.find(
          (method: any) => method.recover === this.data.CostAccountingMethod
        )?._id,

        planMethod: this.planningMethods.find(
          (method: any) => method.recover === this.data.PlanningSystem
        )?._id,

        procumentMethod: this.procumentMethods.find(
          (method: any) => method.recover === this.data.ProcurementMethod
        )?._id,

        issueMethod: this.issueMethods.find(
          (method: any) => method.recover === this.data.IssueMethod
        )?._id,
      };

      this.itemForm.patchValue(formValues);

      console.log(this.data);
    }
  }
}

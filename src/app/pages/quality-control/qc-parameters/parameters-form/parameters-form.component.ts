import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Behavior } from "src/app/core/enums/shared-enums/behavior.enum";
import { UomComponent } from "../uom/uom.component";
import { EquipmentComponent } from "../equipment/equipment.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { SuccessMessage } from "src/app/core/services/shared/success-message.service";
import { QcParameterService } from "src/app/core/services/app-services/quality-control/qc-parameter.service";
import { sMsg } from "src/app/core/models/shared/success-response.model";

@Component({
  selector: "app-parameters-form",
  templateUrl: "./parameters-form.component.html",
  styleUrls: ["./parameters-form.component.scss"],
})
export class ParametersFormComponent {
  @Input() mode = Behavior.CREATE_MODE;
  @Input() id: string;
  @Input() data: any;

  @Output() closePopup = new EventEmitter<any>();
  @Output() closePopupAndReload = new EventEmitter<any>();

  modalRef?: BsModalRef;

  manageUom() {
    this.modalRef = this.modalService.show(UomComponent, {
      backdrop: "static",
      class: "modal-lg modal-dialog-centered",
    });

    this.modalRef.content.closePopup.subscribe(() => {
      this.modalRef.hide();
    });

    this.modalRef.content.closePopupAndReload.subscribe(() => {
      this.modalRef.hide();
    });
  }

  manageEquipment() {
    this.modalRef = this.modalService.show(EquipmentComponent, {
      backdrop: "static",
      class: "modal-lg modal-dialog-centered",
    });

    this.modalRef.content.closePopup.subscribe(() => {
      this.modalRef.hide();
    });

    this.modalRef.content.closePopupAndReload.subscribe(() => {
      this.modalRef.hide();
    });
  }

  dataForm: FormGroup;
  isSubmit: boolean = false;
  isSaving: boolean = false;

  constructor(
    private modalService: BsModalService,
    public fb: FormBuilder,
    public toastr: ToastrService,
    private successMessage: SuccessMessage,
    private qcParameterService: QcParameterService
  ) {
    this.dataForm = this.fb.group({
      name: ["", [Validators.required]],
      code: ["", [Validators.required]],
      uom: [null, [Validators.required]],
      equipment: [null, [Validators.required]],
      category: [null, [Validators.required]],
      type: [null, [Validators.required]],
    });
  }

  uoms: any[] = [];
  equipments: any[] = [];

  categories = [
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
  ];

  types = [];

  loadUoms: boolean = false;
  loadEquipments: boolean = false;

  getUoms() {
    this.loadUoms = true;

    this.qcParameterService.dropdownUom().subscribe({
      next: (data: any[]) => {
        this.loadUoms = false;
        this.uoms = data;
      },
      error: (err) => {
        console.log(err);
        this.loadUoms = false;
      },
    });
  }

  getEquipments() {
    this.loadEquipments = true;

    this.qcParameterService.dropdownEquipment().subscribe({
      next: (data: any[]) => {
        this.loadEquipments = false;
        this.equipments = data;
      },
      error: (err) => {
        console.log(err);
        this.loadEquipments = false;
      },
    });
  }

  changeCategory() {
    const category = this.dataForm.value.category;

    if (category === "Fixed") {
      this.types = [
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
      ];
    } else {
      this.types = [
        {
          name: "Numeric",
          _id: "Numeric",
        },
        {
          name: "Percentage",
          _id: "Percentage",
        },
      ];
    }
  }

  onSubmit() {
    this.isSubmit = true;

    if (this.dataForm.invalid) {
      this.toastr.error("Please fill the details correctly.");
      return;
    }

    this.isSaving = true;

    if (this.mode === Behavior.CREATE_MODE) {
      // Creating
      this.qcParameterService.createParameter(this.dataForm.value).subscribe({
        next: (data: sMsg) => {
          this.isSaving = false;
          this.successMessage.show(data.message);
          this.closePopupAndReload.emit();
        },
        error: (err) => {
          console.log(err);
          this.isSaving = false;
        },
      });
    } else {
      // Editing
      this.qcParameterService
        .editQcParameter(this.id, this.dataForm.value)
        .subscribe({
          next: (data: sMsg) => {
            this.isSaving = false;
            this.successMessage.show(data.message);
            this.closePopupAndReload.emit();
          },
          error: (err) => {
            console.log(err);
            this.isSaving = false;
          },
        });
    }
  }

  onReset() {}

  ngOnInit() {
    this.getUoms();
    this.getEquipments();

    if (this.mode === Behavior.EDIT_MODE) {
      this.dataForm.patchValue({
        name: this.data.name,
        code: this.data.code,
        uom: this.data.uom?._id,
        equipment: this.data.equipment?._id,
        category: this.data.category,
        type: this.data.type,
      });
      this.changeCategory();
    }
  }
}

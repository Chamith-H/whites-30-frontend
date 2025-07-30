import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Behavior } from "src/app/core/enums/shared-enums/behavior.enum";
import { sMsg } from "src/app/core/models/shared/success-response.model";
import { QcParameterService } from "src/app/core/services/app-services/quality-control/qc-parameter.service";
import { SuccessMessage } from "src/app/core/services/shared/success-message.service";

@Component({
  selector: "app-equipment-form",
  templateUrl: "./equipment-form.component.html",
  styleUrls: ["./equipment-form.component.scss"],
})
export class EquipmentFormComponent {
  @Input() mode = Behavior.CREATE_MODE;
  @Input() id: string;
  @Input() data: any;

  @Output() closePopup = new EventEmitter<any>();
  @Output() closePopupAndReload = new EventEmitter<any>();

  dataForm: FormGroup;
  isSubmit: boolean = false;
  isSaving: boolean = false;

  constructor(
    public fb: FormBuilder,
    public toastr: ToastrService,
    private successMessage: SuccessMessage,
    private qcParameterService: QcParameterService
  ) {
    this.dataForm = this.fb.group({
      name: [[], [Validators.required]],
      code: [[], [Validators.required]],
    });
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
      this.qcParameterService.createEquipment(this.dataForm.value).subscribe({
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
        .editEquipment(this.id, this.dataForm.value)
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
    if (this.mode === Behavior.EDIT_MODE) {
      this.dataForm.patchValue({
        name: this.data.name,
        code: this.data.code,
      });
    }
  }
}

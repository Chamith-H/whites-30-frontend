import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { sMsg } from "src/app/core/models/shared/success-response.model";
import { InspectionService } from "src/app/core/services/app-services/operations/inspection.service";
import { EligibleService } from "src/app/core/services/app-services/quality-control/eligible.service";
import { SuccessMessage } from "src/app/core/services/shared/success-message.service";

@Component({
  selector: "app-get-action",
  templateUrl: "./get-action.component.html",
  styleUrls: ["./get-action.component.scss"],
})
export class GetActionComponent {
  @Input() action: string = "";
  @Input() data: any = null;
  @Input() id: string = "";
  @Input() stage: string = "";

  @Output() closePopup = new EventEmitter<any>();
  @Output() closePopupAndReload = new EventEmitter<any>();

  isLoading: boolean = false;
  isSubmitting: boolean = false;
  dataForm: FormGroup;
  isSubmit: boolean = false;

  warehouses: any[] = [];

  constructor(
    public fb: FormBuilder,
    public toastr: ToastrService,
    private inspectionService: InspectionService,
    private eligibleService: EligibleService,
    private successMessage: SuccessMessage
  ) {
    this.dataForm = this.fb.group({
      warehouse: [null, [Validators.required]],
      note: ["", [Validators.maxLength(1000)]],
    });
  }

  loadingWarehouses: boolean = false;
  actionSet: string = "";
  passAction: string = "";

  getApprovalWarehouses(rejection: string) {
    this.loadingWarehouses = true;

    const body = {
      U_RejectWH: rejection,
    };

    this.eligibleService.warehouseDrop(body).subscribe({
      next: (data: any[]) => {
        this.loadingWarehouses = false;
        this.warehouses = data;
      },
      error: (err) => {
        console.log(err);
        this.loadingWarehouses = false;
      },
    });
  }

  onSubmit() {
    this.isSubmit = true;
    this.isSubmitting = true;

    const body = {
      U_Approval: this.passAction,
      U_ActionedWarehouse: this.dataForm.value.warehouse,
      U_ActionedNote: this.dataForm.value.note,
    };

    this.inspectionService.setAction(this.id, body).subscribe({
      next: (data: sMsg) => {
        this.successMessage.show(data.message);
        this.isSubmit = !true;
        this.isSubmitting = !true;
        this.closePopupAndReload.emit();
      },
      error: (err) => {
        this.isSubmit = !true;
        this.isSubmitting = !true;
      },
    });
  }

  resetFields() {}

  ngOnInit() {
    if (this.action === "Approve") {
      this.getApprovalWarehouses("N");
      this.actionSet = "Approval";
      this.passAction = "Approved";
    } else {
      this.getApprovalWarehouses("Y");
      this.actionSet = "Rejection";
      this.passAction = "Rejected";
    }
  }
}

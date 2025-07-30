import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Behavior } from "src/app/core/enums/shared-enums/behavior.enum";
import { RoleModel } from "src/app/core/models/app-models/user-management/role.model";
import { sMsg } from "src/app/core/models/shared/success-response.model";
import { RoleService } from "src/app/core/services/app-services/user-management/role.service";
import { SuccessMessage } from "src/app/core/services/shared/success-message.service";

@Component({
  selector: "app-a-role-form",
  templateUrl: "./a-role-form.component.html",
  styleUrls: ["./a-role-form.component.scss"],
})
export class ARoleFormComponent {
  @Input() mode: Behavior;
  @Input() targetID: string;
  @Input() data: RoleModel;

  @Output() closePopup = new EventEmitter<any>();
  @Output() closePopupAndReload = new EventEmitter<any>();

  closeModal() {
    this.closePopup.emit();
  }

  closeModelAndReload() {
    this.closePopupAndReload.emit();
  }

  isLoading: boolean = false;
  isSubmitting: boolean = false;
  roleForm: FormGroup;
  isSubmit: boolean = false;
  defaultStatus: boolean = true;

  constructor(
    public fb: FormBuilder,
    public toastr: ToastrService,
    private roleService: RoleService,
    private successMessage: SuccessMessage
  ) {
    this.roleForm = this.fb.group({
      name: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9/ ]+$"),
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      description: ["", [Validators.maxLength(1000)]],
      status: [false],
    });
  }

  //!--> Reset form........................................................|
  resetFields() {
    this.roleForm.reset({
      name: "",
      description: "",
      status: false,
    });
  }

  //!--> Form submition....................................................|
  onSubmit() {
    this.isSubmitting = true;
    this.isSubmit = true;
    if (this.roleForm.invalid) {
      this.toastr.error("Please fill the form correctly!", "Error");
      this.isSubmitting = false;
      return;
    } else {
      // Create Role.......................................................
      if (this.mode === Behavior.CREATE_MODE) {
        this.roleService.create(this.roleForm.value).subscribe({
          next: (res: sMsg) => {
            this.successMessage.show(res.message);
            this.closeModelAndReload();
            this.isSubmit = false;
            this.isSubmitting = false;
          },
          error: (err) => {
            console.log(err);
            this.isSubmitting = false;
          },
        });
      }

      // Edit Role.......................................................
      else if (this.mode === Behavior.EDIT_MODE) {
        this.roleService
          .updateRole(this.targetID, this.roleForm.value)
          .subscribe({
            next: (res: sMsg) => {
              this.successMessage.show(res.message);
              this.closeModelAndReload();
              this.isSubmit = false;
              this.isSubmitting = false;
            },
            error: (err) => {
              console.log(err);
              this.isSubmitting = false;
            },
          });
      }
    }
  }

  //!--> Patch values....................................................|
  patchRole() {
    const selectedRole: RoleModel = {
      name: this.data.name,
      description: this.data.description,
      status: this.data.status,
    };

    this.roleForm.patchValue(selectedRole);
  }

  //!-->
  ngOnInit() {
    if (this.mode === Behavior.EDIT_MODE) {
      this.patchRole();
    }
  }
}

import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  CreateUserModel,
  EditUserModel,
} from "src/app/core/models/app-models/user-management/user.model";
import { genderOptions } from "./utils/gender-options.data";
import { DropDownModel } from "src/app/core/models/shared/dropdown.model";
import { verificationOptions } from "./utils/verification-types.data";
import { ToastrService } from "ngx-toastr";
import { RoleService } from "src/app/core/services/app-services/user-management/role.service";
import { SingleFileUploadModel } from "src/app/core/models/shared/file-upload.model";

@Component({
  selector: "app-a-user-form",
  templateUrl: "./a-user-form.component.html",
  styleUrls: ["./a-user-form.component.scss"],
})
export class AUserFormComponent {
  @Input() edit: boolean = false;
  @Input() data: EditUserModel = null;
  @Input() isSaving: boolean = false;
  @Input() defaultStatus: boolean = true;

  @Output() saveData = new EventEmitter<any>();
  @Output() buttonLoader = new EventEmitter<any>();

  isLoading: boolean = false;
  isSubmit: boolean = false;
  userForm: FormGroup;

  genders: DropDownModel[] = genderOptions;
  verificationTypes: DropDownModel[] = verificationOptions;
  userRoles: DropDownModel[];

  constructor(
    public fb: FormBuilder,
    public toastr: ToastrService,
    private roleService: RoleService
  ) {
    this.userForm = this.fb.group({
      // Personal details............................................
      name: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9/ ]+$"),
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      dob: [""],
      houseNo: [""],
      street: [""],
      city: [""],
      state: [""],
      country: [""],
      zipCode: [null],
      verificationType: [null, [Validators.required]],
      verificationNumber: ["", [Validators.required]],
      gender: [null],
      description: [""],
      role: [null, [Validators.required]],

      // Office details..............................................
      officeMobile: [
        {
          countryCode: "",
          dialCode: "",
          e164Number: "",
          internationalNumber: "",
          nationalNumber: "",
          number: "",
        },
        [Validators.required],
      ],
      officeEmail: ["", [Validators.required]],
      employeeId: ["", [Validators.required]],

      // Config details..............................................
      status: [false],
    });
  }

  //!--> ProfilePicture...........................................................|
  imageFile: SingleFileUploadModel;
  imageLink: string;

  getImageFile(file: SingleFileUploadModel) {
    this.imageFile = file;
  }

  //!--> Reset the Form...........................................................|
  resetFields() {}

  //!--> Submit form data.........................................................|
  onSubmit() {
    this.isSubmit = true;

    // Show error when form is invalid
    if (this.userForm.invalid) {
      this.toastr.error("Please fill the details correctly.");
      return;
    }

    this.buttonLoader.emit();

    // Initialize structure to append in formData
    const formValues: string = JSON.stringify(this.userForm.value);
    const formFiles: SingleFileUploadModel[] = [this.imageFile];

    // Create formData instanse
    const formData = new FormData();

    //!--> Appendings............................................................|
    // - append form -
    formData.append("values", formValues);

    // - append files -
    if (formFiles && formFiles.length !== 0 && formFiles[0]) {
      formFiles.forEach((image) => {
        formData.append(
          "images",
          image.file,
          `profile${image.name}.${image.type}`
        );
      });
    }

    // Pass to parent component
    this.saveData.emit(formData);
  }

  //!--> Get user roles...........................................................|
  getRoles() {
    this.isLoading = true;
    this.roleService.getRolesDropdown().subscribe({
      next: (data: DropDownModel[]) => {
        this.userRoles = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  //!--> Patch values to form.....................................................|
  patchValues() {
    this.userForm.patchValue(this.data);
    this.imageLink = this.data.profileImage;
  }

  //!-->
  ngOnInit() {
    this.getRoles();

    if (this.edit) {
      this.patchValues();
    }
  }
}

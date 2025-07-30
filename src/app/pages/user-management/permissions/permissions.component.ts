import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  FilterPermissionModel,
  GetPermissionModel,
  PermissionSectionModel,
  RolePermissionModel,
} from "src/app/core/models/app-models/user-management/permission.model";
import { SavedUserModel } from "src/app/core/models/app-models/user-management/user.model";
import { DropDownModel } from "src/app/core/models/shared/dropdown.model";
import {
  HeaderItems,
  OpenType,
} from "src/app/core/models/shared/page-title.model";
import { AuthenticationService } from "src/app/core/services/app-services/authentication/authentication.service";
import { PermissionService } from "src/app/core/services/app-services/user-management/permission.service";
import { RoleService } from "src/app/core/services/app-services/user-management/role.service";
import { SuccessMessage } from "src/app/core/services/shared/success-message.service";
import { data_permissionModules } from "./utils/permission-modules.data";

@Component({
  selector: "app-permissions",
  templateUrl: "./permissions.component.html",
  styleUrls: ["./permissions.component.scss"],
})
export class PermissionsComponent {
  isLoading: boolean = false;
  isSaving: boolean = false;

  roles: DropDownModel[];
  permissions: GetPermissionModel[];
  activePermissions: string[];
  modules: PermissionSectionModel[];
  sections: PermissionSectionModel[];

  permissionForm: FormGroup;

  //!--> Page title data structure...................................................|
  headerItems: HeaderItems = {
    title: "PERMISSIONS",
    button: {
      show: false,
      action: OpenType.OPEN_NULL,
      name: "",
      target: "",
    },
    breadcrumb: [
      {
        name: "User management",
        link: "",
        active: false,
      },
      {
        name: "Permissions",
        link: "",
        active: true,
      },
    ],
  };

  constructor(
    public fb: FormBuilder,
    private permissionService: PermissionService,
    private roleService: RoleService,
    private successMessage: SuccessMessage,
    private authService: AuthenticationService
  ) {
    this.permissionForm = this.fb.group({
      role: [""],
      module: [0],
      section: [null],
    });
  }

  //!--> Get user roles list........................................................|
  getRoles() {
    this.isLoading = true;
    const user: SavedUserModel = this.authService.loggedUser;
    const currentRole = user.roleId;

    this.roleService.getCustoms(currentRole).subscribe({
      next: (res: RolePermissionModel[]) => {
        this.roles = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  //!--> Get permission list........................................................|
  getPermissions(filter: FilterPermissionModel) {
    this.isLoading = true;
    this.permissionService.getFilteredPermissions(filter).subscribe({
      next: (res: GetPermissionModel[]) => {
        this.permissions = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  // Dropdown role selected
  roleChange() {
    this.activePermissions = [];

    this.isLoading = true;
    this.roleService.getPermissions(this.permissionForm.value.role).subscribe({
      next: (res: { _id: string; permissions: string[] }) => {
        this.activePermissions = res.permissions;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  //Get modules
  moduleFinder() {
    const fetchModules = data_permissionModules.map(
      ({ sections, ...rest }) => rest
    );

    this.modules = fetchModules;
  }

  //Dropdown module selected
  moduleSelected() {
    this.permissionForm.get("section")?.setValue(null);

    let module = this.permissionForm.value.module;
    if (typeof module === "string") {
      module = parseInt(module);
    }

    this.getPermissions({ module: module, section: 0 });
    this.permissionForm.get("module")?.setValue(module);

    const moduleObject = data_permissionModules.find(
      (object) => object._id === module
    );

    this.sections = moduleObject.sections;

    if (module === 0 || module === "0") {
      this.permissionForm.get("section")?.setValue(0);
    }
  }

  //Dropdown section selected
  sectionSelected() {
    let module = this.permissionForm.value.module;
    if (typeof module === "string") {
      module = parseInt(module);
    }

    let section = this.permissionForm.value.section;
    if (typeof section === "string") {
      section = parseInt(section);
    }

    this.getPermissions({ module: module, section: section });
  }

  //Active-deactive toggler finder
  findCheck(permissionId: string) {
    return this.activePermissions.some(
      (permission) => permission === permissionId
    );
  }

  toggleSwitch(permissionId: string) {
    const hasPermission = this.activePermissions.some(
      (permission) => permission === permissionId
    );

    if (!hasPermission) {
      this.activePermissions.push(permissionId);
    } else {
      const index = this.activePermissions.indexOf(permissionId);
      this.activePermissions.splice(index, 1);
    }
  }

  //!--> Save data..................................................................|
  assignPermissions() {
    this.isSaving = true;
    this.roleService
      .managePermissions(this.permissionForm.value.role, {
        permissions: this.activePermissions,
      })
      .subscribe({
        next: (res: { _id: string; permissions: string[] }) => {
          this.activePermissions = res.permissions;
          this.isSaving = false;
          this.successMessage.show("Permissions updated successfully!");
        },
        error: (err) => {
          console.log(err);
          this.isSaving = false;
        },
      });
  }

  //!--> Reset data.................................................................|
  resetPermissions() {
    this.roleChange();
  }

  //!--> Default handlers...........................................................|
  ngOnInit() {
    this.getRoles();
    this.getPermissions({ module: 0, section: 0 });
    this.moduleFinder();
  }
}

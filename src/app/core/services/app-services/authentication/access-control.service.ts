import { Injectable } from "@angular/core";
import { AuthenticationService } from "./authentication.service";
import { ChangePermissionModel } from "src/app/core/models/app-models/authentication/change-permission.model";
import { SavedUserModel } from "src/app/core/models/app-models/user-management/user.model";
import { RefreshPermissionInterface } from "src/app/core/models/app-models/authentication/refresh-permission.model";

@Injectable({ providedIn: "root" })
export class AccessControlService {
  constructor(private authenticationService: AuthenticationService) {}

  //!--> Check single exact want true.................................|
  confirm_exactOneAccess(requestPermissionNo: number) {
    if (requestPermissionNo === 0) {
      return true;
    }

    const activePermissions: number[] =
      this.authenticationService.accessPermissions;

    const status = activePermissions.some(
      (permissionNo) => permissionNo === requestPermissionNo
    );

    return status;
  }

  //!--> Check multiple only one want true............................|
  confirm_leastOneAccess(requiredPermissions: number[]) {
    const tempAccess = requiredPermissions.some(
      (permissionNo) => permissionNo === 0
    );

    if (tempAccess) {
      return true;
    }

    const activePermissions: number[] =
      this.authenticationService.accessPermissions;

    const status = requiredPermissions.some((permissionNo) =>
      activePermissions.includes(permissionNo)
    );

    return status;
  }

  //!--> Reload when permission changed........................................|
  reload(changedPermissionModel: RefreshPermissionInterface) {
    const currentUser: SavedUserModel = this.authenticationService.loggedUser;

    if (currentUser.roleId === changedPermissionModel.requestedRole) {
      this.authenticationService.updatePermissions(
        changedPermissionModel.accessNumbers
      );

      return true;
    } else {
      return false;
    }
  }

  //!--> Remove self permissions.......................................|
  //   selfPermissions(checkout: string, id: string) {
  //     const activeUser = localStorage.getItem(MainConfigure.LOGGED_USER);
  //     const userData: SavedUserModel = JSON.parse(activeUser);

  //     console.log(userData);
  //     console.log(id, "Role id");

  //     if (checkout === "ROLE" && userData.accessType === id) {
  //       return false;
  //     }

  //     if (checkout === "USER" && userData.userId === id) {
  //       return false;
  //     }

  //     return true;
  //   }
}

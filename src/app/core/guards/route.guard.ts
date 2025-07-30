import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { AuthenticationService } from "../services/app-services/authentication/authentication.service";
import { AccessControlService } from "../services/app-services/authentication/access-control.service";

@Injectable({
  providedIn: "root",
})
export class RouteGuard {
  constructor(
    private accessControlService: AccessControlService,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const permission: number = route.data["permission"];
    const access = this.accessControlService.confirm_exactOneAccess(permission);

    if (!access) {
      this.authenticationService.logout();
    }

    return access;
  }
}

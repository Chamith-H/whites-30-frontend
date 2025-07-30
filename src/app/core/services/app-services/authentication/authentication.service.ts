import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MainConfigure } from "src/app/core/enums/system-enums/main-configure.enum";
import { LoginReqModel } from "src/app/core/models/app-models/authentication/login-req.model";
import { ConfigService } from "../../shared/config.service";
import { SavedUserModel } from "src/app/core/models/app-models/user-management/user.model";
import { LoginResModel } from "src/app/core/models/app-models/authentication/login-res.model";
import { Router } from "@angular/router";
import { RefreshUserInterface } from "src/app/core/models/app-models/authentication/refresh-user.interface";
import { RefreshRoleInterface } from "src/app/core/models/app-models/authentication/refresh-role.interface";
import { ResetPasswordInterface } from "src/app/core/models/app-models/authentication/reset-password.model";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  baseUrl = "";

  constructor(
    private http: HttpClient,
    private apiConfig: ConfigService,
    private router: Router
  ) {
    this.baseUrl = apiConfig.getBaseUrl() + "/auth";
  }

  //!--> Backend health checker......................................................|
  health(): Observable<any> {
    return this.http.get<any>(this.apiConfig.getBaseUrl() + `/health`);
  }

  //!--> Login to system.............................................................|
  login(credentials: LoginReqModel): Observable<any> {
    const path = "/login";
    return this.http.post<any>(this.baseUrl + path, credentials);
  }

  //!--> Validate token..............................................................|
  validate() {
    const path = "/access-route";
    return this.http.get<any>(this.baseUrl + path);
  }

  //!--> Get OTP code................................................................|
  getOtp(emailAddress: string) {
    const data = { email: emailAddress };

    const path = "/get-otp";
    return this.http.post<any>(this.baseUrl + path, data);
  }

  //!--> Reset password..............................................................|
  resetPassword(data: ResetPasswordInterface) {
    const path = "/reset-password";
    return this.http.post<any>(this.baseUrl + path, data);
  }

  //---------
  //---------
  //---------
  //---------
  //---------
  //---------

  //!--> Getters......................................................................|
  // Get authentication token
  public get authToken() {
    return localStorage.getItem(MainConfigure.JWT_TOKEN);
  }

  // Get logged user data
  public get loggedUser() {
    const activeUser = localStorage.getItem(MainConfigure.LOGGED_USER);
    const userData: SavedUserModel = JSON.parse(activeUser);
    return userData;
  }

  // Get access permission numbers
  public get accessPermissions() {
    const permissions = localStorage.getItem(MainConfigure.ACCESS_PERMISSIONS);
    const accessNumbers: number[] = JSON.parse(permissions);
    return accessNumbers;
  }

  //---------
  //---------

  //!--> Main configuration setter....................................................|
  public setConfigurationData(loggedUser: LoginResModel) {
    // Save JWT token
    localStorage.setItem(MainConfigure.JWT_TOKEN, loggedUser.jwtToken);

    // Save currently logged user data
    localStorage.setItem(MainConfigure.LOGGED_USER, loggedUser.userData);

    // Save logged user permissions
    localStorage.setItem(
      MainConfigure.ACCESS_PERMISSIONS,
      loggedUser.accessNumbers
    );
  }

  //!--> Update access numbers.......................................................|
  public updatePermissions(newPermissions: string) {
    localStorage.setItem(MainConfigure.ACCESS_PERMISSIONS, newPermissions);
  }

  //---------
  //---------

  //!--> Logout from system..........................................................|
  logout() {
    localStorage.removeItem(MainConfigure.JWT_TOKEN);
    localStorage.removeItem(MainConfigure.LOGGED_USER);
    localStorage.removeItem(MainConfigure.ACCESS_PERMISSIONS);
    this.router.navigate(["/account/login"]);
  }

  //!--> Backend live triggers | Hidden actions | Update user........................|
  refreshUser(data: RefreshUserInterface) {
    const activeUser = localStorage.getItem(MainConfigure.LOGGED_USER);
    const userData: SavedUserModel = JSON.parse(activeUser);

    if (userData.userId === data.requestedUser) {
      // Update user data
      localStorage.setItem(MainConfigure.LOGGED_USER, data.userData);

      // Update user permissions
      localStorage.setItem(
        MainConfigure.ACCESS_PERMISSIONS,
        data.accessNumbers
      );

      return true;
    } else {
      return false;
    }
  }

  //!--> Backend live triggers | Hidden actions | Update role.......................|
  refreshRole(data: RefreshRoleInterface) {
    const activeUser = localStorage.getItem(MainConfigure.LOGGED_USER);
    const userData: SavedUserModel = JSON.parse(activeUser);

    if (userData.roleId === data.requestedRole) {
      const newUserData: SavedUserModel = {
        userId: userData.userId,
        name: userData.name,
        type: userData.type,
        roleId: data.requestedRole,
        roleName: data.roleName,
        profileImage: userData.profileImage,
      };

      const loggedUser: string = JSON.stringify(newUserData);
      localStorage.setItem(MainConfigure.LOGGED_USER, loggedUser);

      return true;
    } else {
      return false;
    }
  }
}

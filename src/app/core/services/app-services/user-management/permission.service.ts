import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FilterPermissionModel } from "src/app/core/models/app-models/user-management/permission.model";
import { ConfigService } from "../../shared/config.service";

@Injectable({
  providedIn: "root",
})
export class PermissionService {
  baseUrl = "";
  constructor(private http: HttpClient, private apiConfig: ConfigService) {
    this.baseUrl = apiConfig.getBaseUrl() + "/permission";
  }

  // !--> Filter permissions ......................................................
  getFilteredPermissions(filter: FilterPermissionModel): Observable<any> {
    return this.http.post(this.baseUrl + "/all", filter);
  }
}

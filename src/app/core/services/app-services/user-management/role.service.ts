import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "../../shared/config.service";
import {
  FilterRoleModel,
  RoleModel,
} from "src/app/core/models/app-models/user-management/role.model";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  baseUrl = "";
  constructor(private http: HttpClient, private apiConfig: ConfigService) {
    this.baseUrl = apiConfig.getBaseUrl() + "/role";
  }

  create(data: RoleModel): Observable<any> {
    return this.http.post(this.baseUrl + "/create", data);
  }

  getAll(page: number, filter: FilterRoleModel): Observable<any> {
    let params = new HttpParams();
    params = params.append("page", page.toString());
    return this.http.post(this.baseUrl + "/all", filter, { params: params });
  }

  getCustoms(id: string): Observable<any> {
    return this.http.get(this.baseUrl + `/customs/${id}`);
  }

  getPermissions(id: string): Observable<any> {
    return this.http.get(this.baseUrl + `/permissions/${id}`);
  }

  managePermissions(
    id: string,
    data: { permissions: string[] }
  ): Observable<any> {
    return this.http.put(this.baseUrl + `/manage/${id}`, data);
  }

  getRoleForEdit(id: string): Observable<any> {
    return this.http.get(this.baseUrl + `/role/${id}`);
  }

  updateRole(id: string, data: RoleModel): Observable<any> {
    return this.http.put(this.baseUrl + `/edit/${id}`, data);
  }

  detailRole(id: string): Observable<any> {
    return this.http.get(this.baseUrl + `/detail/${id}`);
  }

  getRolesDropdown(): Observable<any> {
    return this.http.get(this.baseUrl + `/dropdown`);
  }

  deleteRole(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + `/delete/${id}`);
  }

  changeRoleStatus(id: string): Observable<any> {
    return this.http.get(this.baseUrl + `/change/${id}`);
  }
}

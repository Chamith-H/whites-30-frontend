import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "../../shared/config.service";

@Injectable({
  providedIn: "root",
})
export class EligibleService {
  baseUrl = "";
  constructor(private http: HttpClient, private apiConfig: ConfigService) {
    this.baseUrl = apiConfig.getBaseUrl() + "/eligible";
  }

  getAll(page: number, filter: any): Observable<any> {
    let params = new HttpParams();
    params = params.append("page", page.toString());
    return this.http.post(this.baseUrl + "/qc-items", filter, {
      params: params,
    });
  }

  getAllWarehouses(page: number, filter: any): Observable<any> {
    let params = new HttpParams();
    params = params.append("page", page.toString());
    return this.http.post(this.baseUrl + "/qc-warehouses", filter, {
      params: params,
    });
  }

  warehouseDrop(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "/warehouse-drop", data);
  }
}

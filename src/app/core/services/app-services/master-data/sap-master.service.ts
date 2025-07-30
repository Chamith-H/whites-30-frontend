import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "../../shared/config.service";

@Injectable({
  providedIn: "root",
})
export class SapMasterService {
  baseUrl = "";
  constructor(private http: HttpClient, private apiConfig: ConfigService) {
    this.baseUrl = apiConfig.getBaseUrl() + "/sap-master";
  }

  getMastersForItem(): Observable<any> {
    return this.http.get(this.baseUrl + "/item-msaters");
  }

  getActualData(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "/item-actual", data);
  }
}

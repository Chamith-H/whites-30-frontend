import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "../../shared/config.service";

@Injectable({
  providedIn: "root",
})
export class GatePassService {
  baseUrl = "";
  constructor(private http: HttpClient, private apiConfig: ConfigService) {
    this.baseUrl = apiConfig.getBaseUrl() + "/gate-pass";
  }

  getAllPO(page: number, filter: any): Observable<any> {
    let params = new HttpParams();
    params = params.append("page", page.toString());
    return this.http.post(this.baseUrl + "/all-po", filter, { params: params });
  }

  create(data: FormData): Observable<any> {
    return this.http.post(this.baseUrl + "/create", data);
  }

  checkPo(po: number): Observable<any> {
    return this.http.get(this.baseUrl + "/check-po/" + po);
  }

  updateGatePass(id: string, data: any): Observable<any> {
    return this.http.put(this.baseUrl + "/update/" + id, data);
  }

  getAllGatepasses(page: number, filter: any): Observable<any> {
    let params = new HttpParams();
    params = params.append("page", page.toString());

    return this.http.post(this.baseUrl + "/all", filter, {
      params: params,
    });
  }

  getSelectedGatePass(id: string): Observable<any> {
    return this.http.get(this.baseUrl + "/gate-pass/" + id);
  }

  deleteGatePass(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + "/remove/" + id);
  }

  viewSelectedGatePass(id: string): Observable<any> {
    return this.http.get(this.baseUrl + "/gate-pass-view/" + id);
  }
}

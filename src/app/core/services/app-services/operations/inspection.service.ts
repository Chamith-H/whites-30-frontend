import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "../../shared/config.service";

@Injectable({
  providedIn: "root",
})
export class InspectionService {
  baseUrl = "";
  constructor(private http: HttpClient, private apiConfig: ConfigService) {
    this.baseUrl = apiConfig.getBaseUrl() + "/inspection";
  }

  //   getAll(page: number, filter: any): Observable<any> {
  //     let params = new HttpParams();
  //     params = params.append("page", page.toString());
  //     return this.http.post(this.baseUrl + "/all", filter, { params: params });
  //   }

  getAll(page: number, filter: any): Observable<any> {
    let params = new HttpParams();
    params = params.append("page", page.toString());
    return this.http.post(this.baseUrl + "/all", filter, { params: params });
  }

  startConf(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "/start-conf", data);
  }

  startInspection(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "/start", data);
  }

  checkingItems(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "/start-config", data);
  }

  updateObserveds(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "/update-observeds", data);
  }

  createSamples(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "/create-samples", data);
  }

  saveData(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "/save-data", data);
  }

  setAction(id: string, data: any): Observable<any> {
    return this.http.put(this.baseUrl + `/set-action/${id}`, data);
  }

  viewDocuments(id: string): Observable<any> {
    return this.http.get(this.baseUrl + `/get-doc/${id}`);
  }

  uploadDocuments(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "/upload-doc", data);
  }

  deleteDocuments(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + `/remove-doc/${id}`);
  }
}

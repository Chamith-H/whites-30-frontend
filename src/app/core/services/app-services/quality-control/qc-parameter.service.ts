import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "../../shared/config.service";

@Injectable({
  providedIn: "root",
})
export class QcParameterService {
  baseUrl = "";
  constructor(private http: HttpClient, private apiConfig: ConfigService) {
    this.baseUrl = apiConfig.getBaseUrl() + "/qc-parameter";
  }

  //!--> UOMs
  getAllUom(page: number, filter: any): Observable<any> {
    let params = new HttpParams();
    params = params.append("page", page.toString());
    return this.http.post(this.baseUrl + "/all-uom", filter, {
      params: params,
    });
  }

  createUom(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "/create-uom", data);
  }

  editUom(id: string, data: any): Observable<any> {
    return this.http.put(this.baseUrl + "/update-uom/" + id, data);
  }

  deleteUom(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + "/delete-uom/" + id);
  }

  dropdownUom(): Observable<any> {
    return this.http.get(this.baseUrl + "/uom-dropdown");
  }

  //!--> Equipments
  getAllEquipment(page: number, filter: any): Observable<any> {
    let params = new HttpParams();
    params = params.append("page", page.toString());
    return this.http.post(this.baseUrl + "/all-equipment", filter, {
      params: params,
    });
  }

  createEquipment(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "/create-equipment", data);
  }

  editEquipment(id: string, data: any): Observable<any> {
    return this.http.put(this.baseUrl + "/update-equipment/" + id, data);
  }

  deletEquipment(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + "/delete-equipment/" + id);
  }

  dropdownEquipment(): Observable<any> {
    return this.http.get(this.baseUrl + "/equipment-dropdown");
  }

  //!--> QC parameters
  getAllParameters(page: number, filter: any): Observable<any> {
    let params = new HttpParams();
    params = params.append("page", page.toString());
    return this.http.post(this.baseUrl + "/all-parameters", filter, {
      params: params,
    });
  }

  createParameter(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "/create-parameter", data);
  }

  editQcParameter(id: string, data: any): Observable<any> {
    return this.http.put(this.baseUrl + "/update-parameter/" + id, data);
  }

  dropdownParameter(): Observable<any> {
    return this.http.get(this.baseUrl + "/parameter-dropdown");
  }

  deleteQcParameter(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + "/delete-parameter/" + id);
  }
}

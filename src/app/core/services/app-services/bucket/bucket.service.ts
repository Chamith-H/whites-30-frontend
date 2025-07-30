import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "../../shared/config.service";

@Injectable({
  providedIn: "root",
})
export class BucketService {
  baseUrl = "";
  token = "0jH4bviaHBJ9BYz24Ac9kVyMXsb8gRQT";

  constructor(private http: HttpClient, private apiConfig: ConfigService) {
    this.baseUrl = apiConfig.getBucketUrl();
  }

  uploadFile(data: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.post(this.baseUrl + "/uploadfile", data, { headers });
  }
}

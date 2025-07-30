import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class ConfigService {
  private baseUrl: string = environment.apiUrl;
  private bucketUrl: string = environment.bucketUrl;

  constructor() {}
  getBaseUrl(): any {
    return this.baseUrl;
  }
  getBucketUrl(): any {
    return this.bucketUrl;
  }
}

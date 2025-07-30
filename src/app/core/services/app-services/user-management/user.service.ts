import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ConfigService } from "../../shared/config.service";

@Injectable({ providedIn: "root" })
export class UserService {
  baseUrl = "";
  constructor(private http: HttpClient, private apiConfig: ConfigService) {
    this.baseUrl = apiConfig.getBaseUrl() + "/user";
  }

  // !--> Add user .........................................................................................
  addUser(newUser: FormData): Observable<any> {
    return this.http.post(this.baseUrl + "/create", newUser);
  }

  // !--> Get all users .........................................................................................
  getAllUsers(page: number, filter: any): Observable<any> {
    let params = new HttpParams();
    params = params.append("page", page.toString());

    return this.http.post(this.baseUrl + "/all", filter, {
      params: params,
    });
  }

  // !--> Get single user for edit.........................................................................................
  getUserForEdit(id: string): Observable<any> {
    return this.http.get(this.baseUrl + `/for-edit/${id}`);
  }

  // !--> Update user .........................................................................................
  updateUser(id: string, updatedUser: FormData): Observable<any> {
    return this.http.put(this.baseUrl + `/edit/${id}`, updatedUser);
  }

  // !--> Get single user for view .........................................................................................
  getUser(id: string): Observable<any> {
    return this.http.get(this.baseUrl + `/detailed-user/${id}`);
  }

  // !--> Delete user .........................................................................................
  deleteUser(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + `/remove/${id}`);
  }

  // !--> Disable | Enable user ..................................................................................
  changeStatus(id: string): Observable<any> {
    return this.http.get(this.baseUrl + `/change/${id}`);
  }
}

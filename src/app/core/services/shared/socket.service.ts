import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { io, Socket } from "socket.io-client";
import { RefreshPermissionInterface } from "../../models/app-models/authentication/refresh-permission.model";
import { RefreshUserInterface } from "../../models/app-models/authentication/refresh-user.interface";
import { RefreshRoleInterface } from "../../models/app-models/authentication/refresh-role.interface";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  private socket: Socket;

  constructor(private apiConfig: ConfigService) {
    this.socket = io(apiConfig.getBaseUrl(), {
      rejectUnauthorized: false,
    });
  }

  //!--> Refresh user | header data | sync with realtime DB......................................|
  refreshUser(callback: (data: RefreshUserInterface) => void) {
    this.socket.on("refresh-user", callback);
  }

  //!--> Refresh role | header & system | sync with realtime DB..................................|
  refreshRole(callback: (data: RefreshRoleInterface) => void) {
    this.socket.on("refresh-role", callback);
  }

  //!--> Refresh permissions | system | sync with realtime DB....................................|
  refreshPermissions(callback: (data: RefreshPermissionInterface) => void) {
    this.socket.on("refresh-permissions", callback);
  }
}

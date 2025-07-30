import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable({ providedIn: "root" })
export class SuccessMessage {
  show(message: string) {
    Swal.fire({
      icon: "success",
      title: "Done!",
      text: message,
    });
  }
}

import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ControlAction } from "src/app/core/enums/shared-enums/action.enum";
import { DetailButtonModel } from "src/app/core/models/shared/detail-button.model";
import Swal from "sweetalert2";

@Component({
  selector: "app-detail-button",
  templateUrl: "./detail-button.component.html",
  styleUrls: ["./detail-button.component.scss"],
})
export class DetailButtonComponent {
  @Input() uniqueness: boolean = true;
  @Input() uniqueKey: string = "";
  @Input() uniqueValue: string = "";
  @Input() target: string = "";
  @Input() id: string = "";
  @Input() status: boolean = false;

  // for permissions
  @Input() edit: number = -1;
  @Input() manage: number = -1;
  @Input() delete: number = -1;

  @Output() handleAction = new EventEmitter();

  setAction(action: string) {
    const handler: DetailButtonModel = {
      targetId: this.id,
      action: action,
    };

    if (action === ControlAction.Edit) {
      this.handleAction.emit(handler);
    }

    if (action === ControlAction.Manage) {
      let task = null;

      if (this.status === false) {
        task = "enable";
      } else {
        task = "disable";
      }

      Swal.fire({
        title: "Confirmation",
        text: `Are you sure you want to ${task} this ${this.target}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          this.handleAction.emit(handler);
        } else {
          console.log("closed");
        }
      });
    }

    if (action === ControlAction.Delete) {
      Swal.fire({
        title: "Confirmation",
        text: `Are you sure you want to delete this ${this.target}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          this.handleAction.emit(handler);
        } else {
          console.log("closed");
        }
      });
    }
  }
}

import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Behavior } from "src/app/core/enums/shared-enums/behavior.enum";
import { fPermissions } from "src/app/core/enums/system-enums/permission.enum";
import { RoleModel } from "src/app/core/models/app-models/user-management/role.model";
import { DetailButtonModel } from "src/app/core/models/shared/detail-button.model";

@Component({
  selector: "app-a-role-view",
  templateUrl: "./a-role-view.component.html",
  styleUrls: ["./a-role-view.component.scss"],
})
export class ARoleViewComponent {
  @Input() mode: Behavior;
  @Input() targetID: string;
  @Input() data: RoleModel;

  @Output() getAction = new EventEmitter<any>();
  @Output() closePopup = new EventEmitter<any>();

  closeModal() {
    this.closePopup.emit();
  }

  //!--> Give button permissions
  accessPermissions() {
    return {
      edit: fPermissions.EDIT_ROLE,
      manage: fPermissions.DETAIL_ROLE,
      delete: fPermissions.DELETE_ROLE,
    };
  }

  handleAction(event: DetailButtonModel) {
    this.getAction.emit(event);
  }
}

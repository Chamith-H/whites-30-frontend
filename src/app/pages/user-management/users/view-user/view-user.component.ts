import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ControlAction } from "src/app/core/enums/shared-enums/action.enum";
import { fPermissions } from "src/app/core/enums/system-enums/permission.enum";
import {
  HeaderItems,
  OpenType,
} from "src/app/core/models/shared/page-title.model";
import { UserService } from "src/app/core/services/app-services/user-management/user.service";
import { SuccessMessage } from "src/app/core/services/shared/success-message.service";
import Swal from "sweetalert2";
import { sMsg } from "src/app/core/models/shared/success-response.model";

@Component({
  selector: "app-view-user",
  templateUrl: "./view-user.component.html",
  styleUrls: ["./view-user.component.scss"],
})
export class ViewUserComponent {
  isLoading: boolean = false;
  currentId: string = null;
  selectedUser: any = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private successMessage: SuccessMessage
  ) {}

  //!--> Header data structure.....................................................|
  headerItems: HeaderItems = {
    title: "SYSTEM USER DETAILS",
    button: {
      show: false,
      action: OpenType.OPEN_NULL,
      name: "",
      target: "",
    },
    breadcrumb: [
      {
        name: "User management",
        link: "",
        active: false,
      },
      {
        name: "System users",
        link: "/user-management/users",
        active: false,
      },
      {
        name: "Details",
        link: "",
        active: true,
      },
    ],
  };

  //!--> Give button permissions
  accessPermissions() {
    return {
      edit: fPermissions.EDIT_USER,
      manage: fPermissions.CHANGE_USER_STATUS,
    };
  }

  getDetails() {
    this.isLoading = true;
    const id = this.activeRoute.snapshot.paramMap.get("id");

    this.userService.getUser(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.isLoading = false;
        this.selectedUser = res;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  handleAction(task: any) {
    if (task.action === ControlAction.Edit) {
      this.router.navigate([`/user-management/users/edit/${task.targetId}`]);
    }

    if (task.action === ControlAction.Manage) {
      this.isLoading = true;
      this.userService.changeStatus(task.targetId).subscribe({
        next: (res: sMsg) => {
          this.successMessage.show(res.message);
          this.getDetails();
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
    }
  }

  ngOnInit() {
    this.getDetails();
  }
}

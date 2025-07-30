import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {
  HeaderItems,
  OpenType,
} from "src/app/core/models/shared/page-title.model";
import { sMsg } from "src/app/core/models/shared/success-response.model";
import { UserService } from "src/app/core/services/app-services/user-management/user.service";
import { SuccessMessage } from "src/app/core/services/shared/success-message.service";

@Component({
  selector: "app-create-user",
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.scss"],
})
export class CreateUserComponent {
  submittedUser: any;
  isSaving: boolean = false;

  constructor(
    private userService: UserService,
    private successMessage: SuccessMessage,
    private router: Router
  ) {}

  //!--> Page tiele data structure...................................................|
  headerItems: HeaderItems = {
    title: "CREATE SYSTEM USER",
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
        name: "System Users",
        link: "/user-management/users",
        active: false,
      },
      {
        name: "Create",
        link: "",
        active: true,
      },
    ],
  };

  //!--> Save data to the backend
  sumbitData(appendedForm: FormData) {
    this.userService.addUser(appendedForm).subscribe({
      next: (data: sMsg) => {
        this.successMessage.show(data.message);
        this.router.navigate(["/user-management/users"]);
        this.isSaving = false;
      },
      error: (err) => {
        console.log(err);
        this.isSaving = false;
      },
    });
  }
}

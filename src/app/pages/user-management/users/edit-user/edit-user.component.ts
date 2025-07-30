import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EditUserModel } from "src/app/core/models/app-models/user-management/user.model";
import {
  HeaderItems,
  OpenType,
} from "src/app/core/models/shared/page-title.model";
import { sMsg } from "src/app/core/models/shared/success-response.model";
import { UserService } from "src/app/core/services/app-services/user-management/user.service";
import { SuccessMessage } from "src/app/core/services/shared/success-message.service";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"],
})
export class EditUserComponent {
  isSaving: boolean = false;
  isLoading: boolean = false;
  currentId: string = null;

  // editable data
  data: EditUserModel = null;

  constructor(
    private userService: UserService,
    private successMessage: SuccessMessage,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  //!--> Page tiele data structure...................................................|
  headerItems: HeaderItems = {
    title: "EDIT SYSTEM USER",
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
        name: "Edit",
        link: "",
        active: true,
      },
    ],
  };

  //!--> Get user data..............................................................|
  getUser() {
    this.isLoading = true;
    const id = this.activeRoute.snapshot.paramMap.get("id");
    this.currentId = id;

    this.userService.getUserForEdit(id).subscribe({
      next: (data: EditUserModel) => {
        this.data = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  //!--> Save data to the backend...................................................|
  sumbitData(appendedForm: FormData) {
    this.userService.updateUser(this.currentId, appendedForm).subscribe({
      next: (data: sMsg) => {
        console.log(data);
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

  //!-->
  ngOnInit() {
    this.getUser();
  }
}

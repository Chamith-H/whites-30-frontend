import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";

import { OwlOptions } from "ngx-owl-carousel-o";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { AuthenticationService } from "src/app/core/services/app-services/authentication/authentication.service";
import { LoginReqModel } from "src/app/core/models/app-models/authentication/login-req.model";
import { LoginResModel } from "src/app/core/models/app-models/authentication/login-res.model";

@Component({
  selector: "app-login2",
  templateUrl: "./login2.component.html",
  styleUrls: ["./login2.component.scss"],
})
export class Login2Component implements OnInit {
  loginForm: UntypedFormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  error: string = "";
  returnUrl: string;
  pwdType = "password";
  year: number = new Date().getFullYear();

  carouselOption: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: false,
    dots: true,
    responsive: {
      680: {
        items: 1,
      },
    },
  };

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  //!--> Convenience getter for easy access to form fields .........................................|
  get f() {
    return this.loginForm.controls;
  }

  //!--> Show hide password ........................................................................|
  changeVisibility(type: string) {
    if (type === "password") {
      this.pwdType = "text";
    } else {
      this.pwdType = "password";
    }
  }

  //!--> Form submit ................................................................................|
  onSubmit() {
    this.submitted = true;

    // Stop the form when it is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      // this.isLoading = true;
      const user: LoginReqModel = {
        username: this.f.username.value,
        password: this.f.password.value,
      };

      this.isLoading = true;
      this.authenticationService.login(user).subscribe({
        next: (data: LoginResModel) => {
          if (data) {
            this.authenticationService.setConfigurationData(data);
            this.router.navigate([""]);
            this.isLoading = false;
          }
        },

        error: (err) => {
          console.log(err);
          this.isLoading = false;
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: err,
          });
        },
      });
    }
  }

  //!--> Component load ............................................................................|
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }
}

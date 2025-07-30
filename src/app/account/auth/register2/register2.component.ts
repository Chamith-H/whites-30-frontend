import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { OwlOptions } from "ngx-owl-carousel-o";
import { first } from "rxjs/operators";
import { AuthenticationService } from "src/app/core/services/app-services/authentication/authentication.service";

@Component({
  selector: "app-register2",
  templateUrl: "./register2.component.html",
  styleUrls: ["./register2.component.scss"],
})
export class Register2Component implements OnInit {
  signupForm: UntypedFormGroup;
  submitted: boolean = false;
  error: string = "";
  successmsg: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}
  // set the currenr year
  year: number = new Date().getFullYear();

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.signupForm.controls;
  }

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

  /**
   * On submit form
   */
  onSubmit() {}
}

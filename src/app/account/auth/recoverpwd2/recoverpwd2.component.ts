import { Component, OnInit } from "@angular/core";
import { OwlOptions } from "ngx-owl-carousel-o";
import {
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "src/app/core/services/app-services/authentication/authentication.service";
import { OtpChangeModel } from "src/app/core/models/app-models/authentication/otp-change.model";
import { Subscription, interval } from "rxjs";
import { ResetPasswordInterface } from "src/app/core/models/app-models/authentication/reset-password.model";
import { sMsg } from "src/app/core/models/shared/success-response.model";
import { SuccessMessage } from "src/app/core/services/shared/success-message.service";

@Component({
  selector: "app-recoverpwd2",
  templateUrl: "./recoverpwd2.component.html",
  styleUrls: ["./recoverpwd2.component.scss"],
})
export class Recoverpwd2Component implements OnInit {
  // set the currenr year
  year: number = new Date().getFullYear();

  resetForm: UntypedFormGroup;
  otpForm: FormGroup;
  submitted: boolean = false;
  resetted: boolean = false;
  error: string = "";
  success: string = "";
  loading: boolean = false;
  isLoading: boolean = false;
  showOtpPopup: boolean = false;
  time: number = 60;
  timerSubscription: Subscription;
  forgotUserdata: OtpChangeModel = null;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private successMesssage: SuccessMessage
  ) {}

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
    });

    this.otpForm = this.formBuilder.group({
      otp: ["", [Validators.required]],
    });
  }

  private startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      this.time--; // Decrement time every second
      if (this.time === 0) {
        this.stopTimer(); // Stop the timer when time reaches 0
      }
    });
  }

  private stopTimer(): void {
    if (this.timerSubscription) {
      this.showOtpPopup = false;
      this.timerSubscription.unsubscribe();
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.resetForm.controls;
  }

  get o() {
    return this.otpForm.controls;
  }
  /**
   * On submit form
   */
  onSubmit() {
    this.success = "";
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.authenticationService.getOtp(this.f.email.value).subscribe({
      next: (data: OtpChangeModel) => {
        if (data) {
          this.isLoading = false;
          this.forgotUserdata = data;
          this.time = 60;
          this.otpForm.get("otp").setValue("");
          this.showOtpPopup = true;
          this.startTimer();
        }
      },

      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  confirmOtp() {
    this.resetted = true;

    if (this.otpForm.invalid) {
      return;
    }

    this.isLoading = true;

    const resetPwdObject: ResetPasswordInterface = {
      id: this.forgotUserdata.userId,
      otp: this.o.otp.value,
    };

    this.authenticationService.resetPassword(resetPwdObject).subscribe({
      next: (res: sMsg) => {
        if (res) {
          this.isLoading = false;
          this.showOtpPopup = false;
          this.router.navigate(["/account/login"]);
          this.successMesssage.show(res.message);
        }
      },

      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
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
}

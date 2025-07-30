import { Injectable } from "@angular/core";
import { Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../services/app-services/authentication/authentication.service";

@Injectable({ providedIn: "root" })
export class AuthGuard {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(state: RouterStateSnapshot) {
    // Get current access token
    const jwtToken = this.authenticationService.authToken;

    // Check the token is available
    if (jwtToken) {
      // Check the token is activated
      this.authenticationService.validate().subscribe({
        next: (access: boolean) => {
          if (access) {
            // Token activated && Backend enabled
            return true;
          } else {
            // Token activated && Backend blocked
            this.router.navigate(["/account/login"], {
              queryParams: { returnUrl: state.url },
            });
            return false;
          }
        },

        error: (err) => {
          // Token available but expired
          console.log(err);

          this.router.navigate(["/account/login"], {
            queryParams: { returnUrl: state.url },
          });
          return false;
        },
      });

      // No token available
    } else {
      this.router.navigate(["/account/login"], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
  }
}

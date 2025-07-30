import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from "ngx-intl-tel-input";

@Component({
  selector: "app-tel-input-field",
  templateUrl: "./tel-input-field.component.html",
  styleUrls: ["./tel-input-field.component.scss"],
})
export class TelInputFieldComponent {
  //!--> Default options.................................................................|
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.SriLanka];

  //!-->
  //!--> Dynamic form options............................................................|
  @Input() inputId = "";
  @Input() label = "";
  @Input() control = new FormControl();
  @Input() customPlaceholder: string = "";
  @Input() emptyError = "";
  @Input() validationError = "";
  @Input() mandatory = false;
  @Input() isSubmit = false;

  viewEmptyError() {
    return this.emptyError;
  }
}

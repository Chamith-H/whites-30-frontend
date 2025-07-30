import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";


@Component({
  selector: "app-input-field",
  templateUrl: "./input-field.component.html",
  styleUrls: ["./input-field.component.scss"],
})
export class InputFieldComponent {
  @Input() inputId = "";
  @Input() type = "text";
  @Input() label = "";
  @Input() placeHolder = "";
  @Input() mandatory = false;
  @Input() readonly = false;
  @Input() isSubmit = false;
  @Input() emptyError = "";
  @Input() validationError = "";
  @Input() control = new FormControl();
}

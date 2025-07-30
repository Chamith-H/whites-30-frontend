import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-quantity-input",
  templateUrl: "./quantity-input.component.html",
  styleUrls: ["./quantity-input.component.scss"],
})
export class QuantityInputComponent {
  @Input() type = "number";
  @Input() inputId = "";
  @Input() control = new FormControl();
  @Input() isSubmit = false;
  @Input() placeHolder = "";
  @Input() mandatory = false;
  @Input() customClass = "";
  @Input() readonly = false;
}

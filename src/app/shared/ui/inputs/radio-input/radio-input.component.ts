import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DropDownModel } from "src/app/core/models/shared/dropdown.model";

@Component({
  selector: "app-radio-input",
  templateUrl: "./radio-input.component.html",
  styleUrls: ["./radio-input.component.scss"],
})
export class RadioInputComponent {
  @Input() inputId = "";
  @Input() label = "";
  @Input() mandatory = false;
  @Input() readonly = false;
  @Input() isSubmit = false;
  @Input() emptyError = "";
  @Input() control = new FormControl();
  @Input() options: DropDownModel[] = [];
}

import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-description-box",
  templateUrl: "./description-box.component.html",
  styleUrls: ["./description-box.component.scss"],
})
export class DescriptionBoxComponent {
  @Input() inputId = "";
  @Input() emptyError = "";
  @Input() validationError = "";
  @Input() control = new FormControl();
  @Input() label = "";
  @Input() isSubmit = false;
  @Input() height = "100px";
  @Input() placeHolder = "";
  @Input() mandatory = false;
}

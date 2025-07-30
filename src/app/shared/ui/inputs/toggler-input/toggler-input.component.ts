import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-toggler-input",
  templateUrl: "./toggler-input.component.html",
  styleUrls: ["./toggler-input.component.scss"],
})
export class TogglerInputComponent {
  @Input() value: boolean = false;
  @Input() control = new FormControl();
}

import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-single-check",
  templateUrl: "./single-check.component.html",
  styleUrls: ["./single-check.component.scss"],
})
export class SingleCheckComponent {
  @Input() control = new FormControl();
}

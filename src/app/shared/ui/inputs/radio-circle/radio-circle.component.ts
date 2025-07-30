import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-radio-circle",
  templateUrl: "./radio-circle.component.html",
  styleUrls: ["./radio-circle.component.scss"],
})
export class RadioCircleComponent {
  @Input() inputId = "";
  @Input() readonly = false;
  @Input() isSubmit = false;
  @Input() value = null;
  @Input() control = new FormControl();

  @Output() onChange = new EventEmitter();

  changeSelection() {
    this.onChange.emit();
  }
}

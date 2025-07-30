import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl } from "@angular/forms";

interface IOption {
  _id: string;
  name: string;
}
@Component({
  selector: "app-dropdown-field",
  templateUrl: "./dropdown-field.component.html",
  styleUrls: ["./dropdown-field.component.scss"],
})
export class DropdownFieldComponent {
  @Input() dropdownId = "";
  @Input() emptyError = "";
  @Input() control = new FormControl();
  @Input() label = "";
  @Input() value = "";
  @Input() isSubmit = false;
  @Input() options: IOption[] = [];
  @Input() mandatory = false;
  @Input() buttonName = "";
  @Input() isDisabled = false;

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
 
  onChanged(event: any) {
    this.onChange.emit(event.target.value);
  }
}

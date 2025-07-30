import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DropDownModel } from "src/app/core/models/shared/dropdown.model";

@Component({
  selector: "app-checkbox-input",
  templateUrl: "./checkbox-input.component.html",
  styleUrls: ["./checkbox-input.component.scss"],
})
export class CheckboxInputComponent {
  @Input() inputId = "";
  @Input() label = "";
  @Input() mandatory = false;
  @Input() readonly = false;
  @Input() isSubmit = false;
  @Input() emptyError = "";
  @Input() control = new FormControl();
  @Input() options: DropDownModel[] = [];

  onCheckboxChange(event: Event, value: string) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const currentValues = this.control.value as string[];

    if (isChecked) {
      this.control.setValue([...currentValues, value]);
    } else {
      this.control.setValue(currentValues.filter((v) => v !== value));
    }
  }

  isChecked(value: string): boolean {
    return this.control.value.includes(value);
  }
}

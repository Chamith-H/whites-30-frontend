import { DatePipe } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-date-picker",
  templateUrl: "./date-picker.component.html",
  styleUrls: ["./date-picker.component.scss"],
})
export class DatePickerComponent {
  @Input() label = "";
  @Input() inputId = "";
  @Input() mandatory = false;
  @Input() customClass = "";
  @Input() isSubmit = false;
  @Input() control = new FormControl();
  @Input() max = "";
  @Input() min = "";
  @Input() emptyError = "";
  @Input() validationError = "";
  @Input() readonly = false;
  @Output() dateChange = new EventEmitter<Date>();

  formattedDate: string;

  onDateChange(dateString: string) {
    const selectedDate = new Date(dateString);
    this.dateChange.emit(selectedDate);
  }
}

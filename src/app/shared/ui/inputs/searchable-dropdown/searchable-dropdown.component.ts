import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { DropDownModel } from "src/app/core/models/shared/dropdown.model";

@Component({
  selector: "app-searchable-dropdown",
  templateUrl: "./searchable-dropdown.component.html",
  styleUrls: ["./searchable-dropdown.component.scss"],
})
export class SearchableDropdownComponent {
  @Input() options: DropDownModel[] = [];
  @Input() value = "";
  @Input() label = "";
  @Input() mandatory = false;
  @Input() dropdownId = "";
  @Input() control = new FormControl();
  @Input() placeHolder = "Please select";
  @Input() emptyError = "";
  @Input() validationError = "";
  @Input() isSubmit = false;
  @Input() isLoading = false;
  @Input() loadingMessage = "Loading...";
  @Input() multiple = false;
  @Input() readonly = false;
  @Input() isDisabled = false;

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  onChanged(event: any) {
    this.onChange.emit(event?._id);
  }
}

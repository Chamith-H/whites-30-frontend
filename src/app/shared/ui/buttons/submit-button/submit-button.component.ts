import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-submit-button",
  templateUrl: "./submit-button.component.html",
  styleUrls: ["./submit-button.component.scss"],
})
export class SubmitButtonComponent {
  @Input() isSaving: boolean = false;
  @Input() defaultText = "Save";
  @Input() loaderText: string = "Saving";
  @Input() saveType: string = "button";
  @Input() reset: boolean = true;

  @Output() saveData = new EventEmitter();
  @Output() resetData = new EventEmitter();

  resetAction() {
    this.resetData.emit();
  }

  saveAction() {
    if (this.saveType !== "submit") {
      this.saveData.emit();
    }
  }
}

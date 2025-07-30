import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-popup-title",
  templateUrl: "./popup-title.component.html",
  styleUrls: ["./popup-title.component.scss"],
})
export class PopupTitleComponent {
  @Input() title: string = "";
  @Output() close = new EventEmitter<any>();

  closeAction() {
    this.close.emit();
  }
}

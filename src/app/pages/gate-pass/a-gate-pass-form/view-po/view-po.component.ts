import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-view-po",
  templateUrl: "./view-po.component.html",
  styleUrls: ["./view-po.component.scss"],
})
export class ViewPoComponent {
  @Input() data: any = null;
  @Output() closePopup = new EventEmitter<any>();

  closeModal() {
    this.closePopup.emit();
  }
}

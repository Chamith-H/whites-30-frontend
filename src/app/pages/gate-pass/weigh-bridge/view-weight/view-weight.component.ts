import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-view-weight",
  templateUrl: "./view-weight.component.html",
  styleUrls: ["./view-weight.component.scss"],
})
export class ViewWeightComponent {
  @Input() id: string;
  @Input() data: any;

  @Output() closePopup = new EventEmitter<any>();
  @Output() closePopupAndReload = new EventEmitter<any>();
}

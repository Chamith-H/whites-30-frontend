import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import {
  HeaderItems,
  OpenType,
} from "src/app/core/models/shared/page-title.model";

@Component({
  selector: "app-page-title",
  templateUrl: "./page-title.component.html",
  styleUrls: ["./page-title.component.scss"],
})
export class PageTitleComponent {
  @Input() content: HeaderItems;
  @Output() openPopup = new EventEmitter<any>();

  constructor(private router: Router) {}

  printWindow() {
    window.print();
  }

  headerAction() {
    if (this.content.button.action === OpenType.OPEN_NULL) {
      return;
    } else if (this.content.button.action === OpenType.OPEN_PAGE) {
      this.router.navigate([`${this.content.button.target}`]);
    } else if (this.content.button.action === OpenType.OPEN_POPUP) {
      this.openPopup.emit(this.content.button.target);
    }
  }
}

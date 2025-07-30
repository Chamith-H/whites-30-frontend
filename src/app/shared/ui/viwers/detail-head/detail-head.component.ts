import { Component, Input } from "@angular/core";

@Component({
  selector: "app-detail-head",
  templateUrl: "./detail-head.component.html",
  styleUrls: ["./detail-head.component.scss"],
})
export class DetailHeadComponent {
  @Input() name: string = "";
  @Input() showStatus: boolean = true;
  @Input() status: boolean = false;
}


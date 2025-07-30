import { Component, Input } from "@angular/core";

@Component({
  selector: "app-paragraph-viwer",
  templateUrl: "./paragraph-viwer.component.html",
  styleUrls: ["./paragraph-viwer.component.scss"],
})
export class ParagraphViwerComponent {
  @Input() text = "";
  @Input() height = "100px";
  @Input() noData = "";
}

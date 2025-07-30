import { Component } from "@angular/core";
import {
  HeaderItems,
  OpenType,
} from "src/app/core/models/shared/page-title.model";

@Component({
  selector: "app-create-gate-pass",
  templateUrl: "./create-gate-pass.component.html",
  styleUrls: ["./create-gate-pass.component.scss"],
})
export class CreateGatePassComponent {
  //!--> Page tiele data structure...................................................|
  headerItems: HeaderItems = {
    title: "CREATE GATE PASS",
    button: {
      show: false,
      action: OpenType.OPEN_NULL,
      name: "",
      target: "",
    },
    breadcrumb: [
      {
        name: "Security In",
        link: "",
        active: false,
      },
      {
        name: "Gate Pass",
        link: "/gate-pass",
        active: false,
      },
      {
        name: "Create",
        link: "",
        active: true,
      },
    ],
  };
}

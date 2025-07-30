import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  HeaderItems,
  OpenType,
} from "src/app/core/models/shared/page-title.model";
import { GatePassService } from "src/app/core/services/app-services/gate-pass/gate-pass.service";

@Component({
  selector: "app-edit-gate-pass",
  templateUrl: "./edit-gate-pass.component.html",
  styleUrls: ["./edit-gate-pass.component.scss"],
})
export class EditGatePassComponent {
  loadingGatePass: boolean = false;
  gatePassData: any = null;

  //!--> Page tiele data structure...................................................|
  headerItems: HeaderItems = {
    title: "EDIT GATE PASS",
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
        name: "Edit",
        link: "",
        active: true,
      },
    ],
  };

  constructor(
    private gatePassService: GatePassService,
    private activeRoute: ActivatedRoute
  ) {}

  getGatePassData() {
    this.loadingGatePass = true;
    const id = this.activeRoute.snapshot.paramMap.get("id");
    this.gatePassService.getSelectedGatePass(id).subscribe({
      next: (res: any) => {
        this.gatePassData = res;
        this.loadingGatePass = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //!-->
  ngOnInit() {
    this.getGatePassData();
  }
}

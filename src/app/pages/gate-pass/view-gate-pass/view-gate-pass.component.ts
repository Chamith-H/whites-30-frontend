import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  HeaderItems,
  OpenType,
} from "src/app/core/models/shared/page-title.model";
import { GatePassService } from "src/app/core/services/app-services/gate-pass/gate-pass.service";

@Component({
  selector: "app-view-gate-pass",
  templateUrl: "./view-gate-pass.component.html",
  styleUrls: ["./view-gate-pass.component.scss"],
})
export class ViewGatePassComponent {
  loadingGatePass: boolean = false;
  gatePassData: any = null;
  currentId: string = "";

  //!--> Page tiele data structure...................................................|
  headerItems: HeaderItems = {
    title: "GATE PASS DETAILS",
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
        name: "Detail",
        link: "",
        active: true,
      },
    ],
  };

  constructor(
    private gatePassService: GatePassService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  getGatePassData() {
    this.loadingGatePass = true;
    const id = this.activeRoute.snapshot.paramMap.get("id");
    this.currentId = id;
    this.gatePassService.viewSelectedGatePass(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.gatePassData = res;
        this.loadingGatePass = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  navigateEdit() {
    this.router.navigate([`/gate-pass/edit/${this.currentId}`]);
  }

  //!-->
  ngOnInit() {
    this.getGatePassData();
  }
}

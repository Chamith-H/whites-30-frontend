import { Component, TemplateRef, ViewChild } from "@angular/core";
import { ChartType, NgApexchartsModule } from "ng-apexcharts";
import {
  BsModalRef,
  BsModalService,
  ModalDirective,
  ModalModule,
} from "ngx-bootstrap/modal";
import { EventService } from "src/app/core/services/shared/event.service";
import { emailSentBarChart, monthlyEarningChart } from "./data";
import { ConfigService2 } from "src/app/core/services/config.service2";
import { TransactionComponent } from "src/app/shared/widget/transaction/transaction.component";
import {
  HeaderItems,
  OpenType,
} from "src/app/core/models/shared/page-title.model";
import { fPermissions } from "src/app/core/enums/system-enums/permission.enum";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
  isLoading: boolean = false;

  headerItems: HeaderItems = {
    title: "DASHBOARD",
    button: {
      show: false,
      permission: fPermissions.ADD_USER,
      action: OpenType.OPEN_POPUP,
      name: "Create QC-Parameter",
      target: null,
    },
    breadcrumb: [
      {
        name: "Home",
        link: "",
        active: false,
      },
      {
        name: "Dashboard",
        link: "",
        active: true,
      },
    ],
  };

  modalRef?: BsModalRef;
  isVisible: string;

  emailSentBarChart: any;
  monthlyEarningChart: any;
  transactions: any;
  statData: any;
  config: any = {
    backdrop: true,
    ignoreBackdropClick: true,
  };

  isActive: string;

  @ViewChild("content") content;
  @ViewChild("center", { static: false }) center?: ModalDirective;
  constructor(
    private modalService: BsModalService,
    private configService: ConfigService2,
    private eventService: EventService
  ) {}

  ngOnInit() {
    /**
     * horizontal-vertical layput set
     */
    const attribute = document.body.getAttribute("data-layout");

    this.isVisible = attribute;
    const vertical = document.getElementById("layout-vertical");
    if (vertical != null) {
      vertical.setAttribute("checked", "true");
    }
    if (attribute == "horizontal") {
      const horizontal = document.getElementById("layout-horizontal");
      if (horizontal != null) {
        horizontal.setAttribute("checked", "true");
      }
    }

    /**
     * Fetches the data
     */
    this.fetchData();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.center?.show();
    }, 2000);
  }

  /**
   * Fetches the data
   */
  private fetchData() {
    this.emailSentBarChart = emailSentBarChart;
    this.monthlyEarningChart = monthlyEarningChart;

    this.isActive = "year";
    this.configService.getConfig().subscribe((data) => {
      this.transactions = data.transactions;
      this.statData = data.statData;
    });
  }
  opencenterModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  weeklyreport() {
    this.isActive = "week";
    this.emailSentBarChart.series = [
      {
        name: "Good Receipt Note",
        data: [44, 55, 41, 67, 22, 43, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Inventory Transfer",
        data: [11, 17, 15, 15, 21, 14, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Production Receipt",
        data: [13, 23, 20, 8, 13, 27, 0, 0, 0, 0, 0, 0],
      },
    ];
  }

  monthlyreport() {
    this.isActive = "month";
    this.emailSentBarChart.series = [
      {
        name: "Good Receipt Note",
        data: [44, 55, 41, 67, 22, 43, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Inventory Transfer",
        data: [13, 23, 20, 8, 13, 27, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Production Receipt",
        data: [11, 17, 15, 15, 21, 14, 0, 0, 0, 0, 0, 0],
      },
    ];
  }

  yearlyreport() {
    this.isActive = "year";
    this.emailSentBarChart.series = [
      {
        name: "Good Receipt Note",
        data: [13, 23, 20, 8, 13, 27, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Inventory Transfer",
        data: [11, 17, 15, 15, 21, 14, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Production Receipt",
        data: [44, 55, 41, 67, 22, 43, 0, 0, 0, 0, 0, 0],
      },
    ];
  }

  /**
   * Change the layout onclick
   * @param layout Change the layout
   */
  changeLayout(layout: string) {
    this.eventService.broadcast("changeLayout", layout);
  }
}

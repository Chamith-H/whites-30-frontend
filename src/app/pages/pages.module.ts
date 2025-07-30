import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { LightboxModule } from "ngx-lightbox";
import { FullCalendarModule } from "@fullcalendar/angular";
import { NgApexchartsModule } from "ng-apexcharts";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ModalModule } from "ngx-bootstrap/modal";
import { HttpClientModule } from "@angular/common/http";
import { UIModule } from "../shared/ui/ui.module";
import { WidgetModule } from "../shared/widget/widget.module";
import { TabsModule } from "ngx-bootstrap/tabs";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { SimplebarAngularModule } from "simplebar-angular";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "user-management",
    loadChildren: () =>
      import("./user-management/user-management.module").then(
        (m) => m.UserManagementModule
      ),
  },
  {
    path: "master-data",
    loadChildren: () =>
      import("./master-data/master-data.module").then(
        (m) => m.MasterDataModule
      ),
  },
  {
    path: "gate-pass",
    loadChildren: () =>
      import("./gate-pass/gate-pass.module").then((m) => m.GatePassModule),
  },
  {
    path: "quality-control",
    loadChildren: () =>
      import("./quality-control/quality-control.module").then(
        (m) => m.QualityControlModule
      ),
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    NgApexchartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UIModule,
    WidgetModule,
    FullCalendarModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    SimplebarAngularModule,
    LightboxModule,
    PickerModule,
  ],
})
export class PagesModule {}

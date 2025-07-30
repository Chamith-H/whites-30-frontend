import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GatePassComponent } from "./gate-pass.component";
import { CreateGatePassComponent } from "./create-gate-pass/create-gate-pass.component";
import { EditGatePassComponent } from "./edit-gate-pass/edit-gate-pass.component";
import { ViewGatePassComponent } from "./view-gate-pass/view-gate-pass.component";
import { AGatePassFormComponent } from "./a-gate-pass-form/a-gate-pass-form.component";
import { RouteGuard } from "src/app/core/guards/route.guard";
import { fPermissions } from "src/app/core/enums/system-enums/permission.enum";
import { RouterModule, Routes } from "@angular/router";
import { UIModule } from "src/app/shared/ui/ui.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgStepperModule } from "angular-ng-stepper";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { ViewPoComponent } from "./a-gate-pass-form/view-po/view-po.component";
import { WeighBridgeComponent } from "./weigh-bridge/weigh-bridge.component";
import { WeightRecordComponent } from './weigh-bridge/weight-record/weight-record.component';
import { ViewWeightComponent } from './weigh-bridge/view-weight/view-weight.component';

const routes: Routes = [
  //!--> Routes for users............................................|
  {
    path: "",
    component: GatePassComponent,
    canActivate: [RouteGuard],
    data: { permission: fPermissions.VIEW_USERS_LIST },
  },

  {
    path: "create",
    component: CreateGatePassComponent,
    canActivate: [RouteGuard],
    data: { permission: fPermissions.VIEW_USERS_LIST },
  },

  {
    path: "edit/:id",
    component: EditGatePassComponent,
    canActivate: [RouteGuard],
    data: { permission: fPermissions.EDIT_USER },
  },

  {
    path: "detail/:id",
    component: ViewGatePassComponent,
    canActivate: [RouteGuard],
    data: { permission: fPermissions.VIEW_USERS_LIST },
  },

  {
    path: "weigh-bridge",
    component: WeighBridgeComponent,
    canActivate: [RouteGuard],
    data: { permission: fPermissions.VIEW_USERS_LIST },
  },
];

@NgModule({
  declarations: [
    GatePassComponent,
    CreateGatePassComponent,
    EditGatePassComponent,
    ViewGatePassComponent,
    AGatePassFormComponent,
    ViewPoComponent,
    WeighBridgeComponent,
    WeightRecordComponent,
    ViewWeightComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UIModule,
    ReactiveFormsModule,
    FormsModule,
    NgStepperModule,
    CdkStepperModule,
  ],
})
export class GatePassModule {}

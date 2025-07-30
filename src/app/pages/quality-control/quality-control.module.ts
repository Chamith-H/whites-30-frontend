import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EligibleItemsComponent } from "./eligible-items/eligible-items.component";
import { EligibleWarehousesComponent } from "./eligible-warehouses/eligible-warehouses.component";
import { QcParametersComponent } from "./qc-parameters/qc-parameters.component";
import { StagesComponent } from "./stages/stages.component";
import { InspectionsComponent } from "./inspections/inspections.component";
import { ParametersFormComponent } from "./qc-parameters/parameters-form/parameters-form.component";
import { ParametersViewComponent } from "./qc-parameters/parameters-view/parameters-view.component";
import { UomComponent } from "./qc-parameters/uom/uom.component";
import { UomFormComponent } from "./qc-parameters/uom/uom-form/uom-form.component";
import { EquipmentComponent } from "./qc-parameters/equipment/equipment.component";
import { EquipmentFormComponent } from "./qc-parameters/equipment/equipment-form/equipment-form.component";
import { RouterModule, Routes } from "@angular/router";
import { RouteGuard } from "src/app/core/guards/route.guard";
import { fPermissions } from "src/app/core/enums/system-enums/permission.enum";
import { UIModule } from "src/app/shared/ui/ui.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RelationSetterComponent } from "./stages/relation-setter/relation-setter.component";
import { NgStepperModule } from "angular-ng-stepper";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { InspectionConfComponent } from "./inspections/inspection-conf/inspection-conf.component";
import { InspectionViewComponent } from "./inspections/inspection-view/inspection-view.component";
import { SampleGatherComponent } from "./inspections/inspection-conf/sample-gather/sample-gather.component";
import { GetActionComponent } from './inspections/inspection-conf/get-action/get-action.component';
import { EditStageComponent } from './stages/edit-stage/edit-stage.component';
import { ViewStageComponent } from './stages/view-stage/view-stage.component';
import { DocUploadComponent } from './inspections/inspection-conf/doc-upload/doc-upload.component';

const routes: Routes = [
  {
    path: "qc-parameters",
    component: QcParametersComponent,
    canActivate: [RouteGuard],
    data: { permission: fPermissions.VIEW_USERS_LIST },
  },
  {
    path: "stages",
    component: StagesComponent,
    canActivate: [RouteGuard],
    data: { permission: fPermissions.VIEW_USERS_LIST },
  },
  {
    path: "inspections",
    component: InspectionsComponent,
    canActivate: [RouteGuard],
    data: { permission: fPermissions.VIEW_USERS_LIST },
  },
  {
    path: "eligible-items",
    component: EligibleItemsComponent,
    canActivate: [RouteGuard],
    data: { permission: fPermissions.VIEW_USERS_LIST },
  },
  {
    path: "eligible-warehouses",
    component: EligibleWarehousesComponent,
    canActivate: [RouteGuard],
    data: { permission: fPermissions.VIEW_USERS_LIST },
  },
];

@NgModule({
  declarations: [
    EligibleItemsComponent,
    EligibleWarehousesComponent,
    QcParametersComponent,
    StagesComponent,
    InspectionsComponent,
    ParametersFormComponent,
    ParametersViewComponent,
    UomComponent,
    UomFormComponent,
    EquipmentComponent,
    EquipmentFormComponent,
    RelationSetterComponent,
    InspectionConfComponent,
    InspectionViewComponent,
    SampleGatherComponent,
    GetActionComponent,
    EditStageComponent,
    ViewStageComponent,
    DocUploadComponent,
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
export class QualityControlModule {}

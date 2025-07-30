import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ItemsComponent } from "./items/items.component";
import { ItemFormComponent } from "./items/item-form/item-form.component";
import { RouterModule, Routes } from "@angular/router";
import { RouteGuard } from "src/app/core/guards/route.guard";
import { fPermissions } from "src/app/core/enums/system-enums/permission.enum";
import { UIModule } from "src/app/shared/ui/ui.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ItemViewComponent } from './items/item-view/item-view.component';

const routes: Routes = [
  //!--> Routes for users............................................|
  {
    path: "items",
    component: ItemsComponent,
    canActivate: [RouteGuard],
    data: { permission: fPermissions.VIEW_USERS_LIST },
  },
];

@NgModule({
  declarations: [ItemsComponent, ItemFormComponent, ItemViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UIModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class MasterDataModule {}

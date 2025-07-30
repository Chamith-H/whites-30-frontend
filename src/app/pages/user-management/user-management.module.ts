import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersComponent } from "./users/users.component";
import { RolesComponent } from "./roles/roles.component";
import { PermissionsComponent } from "./permissions/permissions.component";
import { CreateUserComponent } from "./users/create-user/create-user.component";
import { EditUserComponent } from "./users/edit-user/edit-user.component";
import { ViewUserComponent } from "./users/view-user/view-user.component";
import { AUserFormComponent } from "./users/a-user-form/a-user-form.component";
import { ARoleFormComponent } from "./roles/a-role-form/a-role-form.component";
import { UIModule } from "src/app/shared/ui/ui.module";
import { RouterModule, Routes } from "@angular/router";
import { RouteGuard } from "src/app/core/guards/route.guard";
import { fPermissions } from "src/app/core/enums/system-enums/permission.enum";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ARoleViewComponent } from './roles/a-role-view/a-role-view.component';

const routes: Routes = [
  //!--> Routes for users............................................|
  {
    path: "users",
    component: UsersComponent,
    canActivate: [RouteGuard],
    data: { permission: fPermissions.VIEW_USERS_LIST },
  },
  {
    path: "users/add",
    component: CreateUserComponent,
    canActivate: [RouteGuard],
    data: { permission: fPermissions.ADD_USER },
  },
  {
    path: "users/edit/:id",
    component: EditUserComponent,
    canActivate: [RouteGuard],
    data: { permission: fPermissions.EDIT_USER },
  },
  {
    path: "users/detail/:id",
    component: ViewUserComponent,
    canActivate: [RouteGuard],
    data: { permission: fPermissions.DETAIL_USER },
  },

  //!--> Routes for user roles.......................................|
  {
    path: "roles",
    component: RolesComponent,
    canActivate: [RouteGuard],
    data: { permission: fPermissions.VIEW_ROLES_LIST },
  },

  //!--> Routes for permissions.....................................|
  {
    path: "permissions",
    component: PermissionsComponent,
    canActivate: [RouteGuard],
    data: { permission: fPermissions.VIEW_PERMISSION_LIST },
  },
];

@NgModule({
  declarations: [
    UsersComponent,
    RolesComponent,
    PermissionsComponent,
    CreateUserComponent,
    EditUserComponent,
    ViewUserComponent,
    AUserFormComponent,
    ARoleFormComponent,
    ARoleViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UIModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class UserManagementModule {}

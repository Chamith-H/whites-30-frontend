import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { Login2Component } from "./login2/login2.component";

import { Register2Component } from "./register2/register2.component";
import { Recoverpwd2Component } from "./recoverpwd2/recoverpwd2.component";

const routes: Routes = [
  {
    path: "login",
    component: Login2Component,
  },
  {
    path: "signup",
    component: Register2Component,
  },
  {
    path: "reset-password",
    component: Recoverpwd2Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

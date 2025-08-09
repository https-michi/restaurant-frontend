import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from './auth-components/signup/signup.component';
import {LoginComponent} from "./auth-components/login/login.component";

const routes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  // {path: 'admin', loadChildren: () => import("./modules/admin/admin.module").then(m => m.AdminModule)}
  {path: 'admin', loadChildren: () => import('./modules/admin/admin.module')},
  {path: 'customer', loadChildren: () => import('./modules/customer/customer.module')}
];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

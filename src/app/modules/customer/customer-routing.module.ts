import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./customer-components/dashboard/dashboard.component";
import {
  ViewProductsByCategoryComponent
} from "./customer-components/view-products-by-category/view-products-by-category.component";
import {PostReservationComponent} from "./customer-components/post-reservation/post-reservation.component";
import {GetAllReservationsComponent} from "./customer-components/get-all-reservations/get-all-reservations.component";

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: ':categoryId/products', component: ViewProductsByCategoryComponent},
  {path: 'reservation', component: PostReservationComponent},
  {path: 'reservations', component: GetAllReservationsComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}

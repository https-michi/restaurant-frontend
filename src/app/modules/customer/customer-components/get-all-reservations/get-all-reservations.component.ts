import {Component} from '@angular/core';
import {CustomerService} from "../../customer-services/customer.service";

@Component({
  selector: 'app-get-all-reservations',
  templateUrl: './get-all-reservations.component.html',
  styleUrls: ['./get-all-reservations.component.scss']
})
export class GetAllReservationsComponent {
  reservations: any;

  constructor(private service: CustomerService) {
  }

  ngOnInit() {
    this.getReservationsByUser();
  }

  getReservationsByUser() {
    this.service.getReservationsByUser().subscribe((res) => {
      console.log(res);
      this.reservations = res;
    })
  }

}

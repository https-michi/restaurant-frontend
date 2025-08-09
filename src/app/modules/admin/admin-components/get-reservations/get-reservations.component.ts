import {Component} from '@angular/core';
import {AdminService} from "../../admin-services/admin.service";

@Component({
  selector: 'app-get-reservations',
  templateUrl: './get-reservations.component.html',
  styleUrls: ['./get-reservations.component.scss']
})
export class GetReservationsComponent {
  reservations: any;
  alertVisible: boolean = false;
  alertType: string = '';
  alertMessage: string = '';

  constructor(private service: AdminService) {
  }

  ngOnInit() {
    this.getReservationsByUser();
  }

  getReservationsByUser() {
    this.service.getReservations().subscribe((res) => {
      console.log(res);
      this.reservations = res;
    })
  }

  changeReservationStatus(reservationId: number, status: string) {
    console.log(reservationId);
    console.log(status);
    this.service.changeReservationStatus(reservationId, status).subscribe((res) => {
      console.log(res);
      if (res.id != null) {
        this.getReservationsByUser();
        this.showAlert(`Reserva actualizada a ${status}`, 'success');
      } else {
        this.showAlert('No se pudo actualizar la reserva', 'danger');
      }
    })
  }

  private showAlert(message: string, type: string) {
    this.alertMessage = message;
    this.alertType = type;
    this.alertVisible = true;

    setTimeout(() => {
      this.alertVisible = false;
    }, 2000);
  }
}

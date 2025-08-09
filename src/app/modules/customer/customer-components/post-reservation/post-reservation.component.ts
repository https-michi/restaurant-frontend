import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../customer-services/customer.service";

@Component({
  selector: 'app-post-reservation',
  templateUrl: './post-reservation.component.html',
  styleUrls: ['./post-reservation.component.scss']
})
export class PostReservationComponent {
  validateForm: FormGroup;
  TableType: string[] = [
    "Mesa estándar",
    "Mesa con sofá",
    "Mesa comunitaria",
    "Mesa de bar",
    "Mesa al aire libre",
    "Mesa alta",
    "Asientos en la barra",
    "Mesa junto a la ventana",
    "Mesa VIP",
    "Mesa familiar"
  ];
  alertVisible: boolean = false;
  alertType: string = '';
  alertMessage: string = '';

  constructor(private fb: FormBuilder, private service: CustomerService) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      tableType: [null, Validators.required],
      dateTime: [null, Validators.required],
      description: [null, Validators.required],

    })
  }

  postReservation() {
    if (this.validateForm.invalid) {
      this.showAlert('Por favor complete todos los campos.', 'danger');
      return;
    }

    this.service.postReservation(this.validateForm.value).subscribe(
      (res) => {
        console.log(res);
        if (res.id != null) {
          this.showAlert('Reserva registrada exitosamente', 'success');
          this.validateForm.reset();
        } else {
          this.showAlert('Error al registrar la reserva', 'danger');
        }
      },
    );
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

import {Component} from '@angular/core';
import {AuthService} from 'src/app/auth-services/auth-serive/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  isSpinning: boolean;
  validateForm: FormGroup;
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return {confirm: true, error: true};
    }
    return {};
  }

  constructor(private service: AuthService, private fb: FormBuilder, private notification: NzNotificationService) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]]

    });
  }

  register() {
    if (this.validateForm.invalid) {
      for (const control in this.validateForm.controls) {
        this.validateForm.controls[control].markAsTouched();
      }
      this.notification.warning('Faltan campos', 'Por favor completa todos los campos requeridos.', {nzDuration: 5000});
      return;
    }
    console.log(this.validateForm.value)
    this.service.signup(this.validateForm.value).subscribe((res) => {
      console.log(res);
      if (res.id != null) {
        this.notification.success('Success', 'User registered successfully!', {nzDuration: 5000});
      } else {
        this.notification.success('Error', 'Something went wrong!', {nzDuration: 5000})
      }
    })
  }
}




import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '@ecoaching-on-pi/shared/service';

@Component({
  selector: 'ecoaching-on-pi-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(private authService: AuthService) {}
  onSubmit(form: NgForm): void {
    this.authService.Register(
      form.value.email,
      form.value.password,
    );
  }
}

import { Component } from '@angular/core';
import { AuthService } from '@ecoaching-on-pi/fitness/data';

@Component({
  selector: 'ecoaching-on-pi-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  onSubmit(form: { value: { email: string; password: string } }): void {
    this.authService.login({
      email: form.value.email,
      password: form.value.password,
    });
  }
}

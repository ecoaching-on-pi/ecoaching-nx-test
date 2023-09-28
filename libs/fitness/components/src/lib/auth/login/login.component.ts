import { Component } from '@angular/core';
import { AuthService } from '@ecoaching-on-pi/shared/service';
@Component({
  selector: 'ecoaching-on-pi-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  onSubmit(form: { value: { email: string; password: string } }): void {
    this.authService.Login(
      form.value.email,
      form.value.password,
    );
  }
}

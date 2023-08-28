import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '@ecoaching-on-pi/fitness/data';

@Component({
  selector: 'ecoaching-on-pi-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(private authService: AuthService) {}
  onSubmit(form: NgForm): void {
    console.log(form.value);
  }
}

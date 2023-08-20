import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ecoaching-on-pi-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  onSubmit(form: NgForm): void {
    console.log(form.value);
  }
}

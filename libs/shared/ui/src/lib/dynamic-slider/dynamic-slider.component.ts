import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { ControlType, FormField } from '@ecoaching-on-pi/shared/data';
import { FirstLetterUpperPipe } from '@ecoaching-on-pi/shared/utility';

@Component({
  selector: 'ecoaching-on-pi-dynamic-slider',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSliderModule, FirstLetterUpperPipe],
  templateUrl: './dynamic-slider.component.html',
  styleUrls: ['./dynamic-slider.component.scss']
})
export class DynamicSliderComponent {

  dynamicSliderForm!: FormGroup;
  // Example data array
@Input() dynamicSliderFormData: FormField[] = [{ key: 'name', value: 5, controlType: ControlType.Slider, options: {min: 1, max: 9, step: 1}}];

onSubmit(): void {
 console.log('Method not implemented.');
  }
}

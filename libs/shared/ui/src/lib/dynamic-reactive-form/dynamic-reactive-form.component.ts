import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ControlType} from '@ecoaching-on-pi/shared/data';
import { FormField } from '@ecoaching-on-pi/shared/data';

@Component({
  selector: 'ecoaching-on-pi-dynamic-reactive-form',
  templateUrl: './dynamic-reactive-form.component.html',
  styleUrls: ['./dynamic-reactive-form.component.scss']
})
export class DynamicReactiveFormComponent implements OnInit{
  dynamicReactiveForm!: FormGroup;
  // Example data array
@Input() dynamicReactiveFormData: FormField[] = [ { key: 'name', value: 'John Doe', controlType: ControlType.Input }, { key: 'age', value: 5, controlType: ControlType.Slider, options: {min: 1, max: 9, step: 1}}];
constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const controls = this.dynamicReactiveFormData.reduce((acc: {[key: string]: any}, item) => {
      acc[item.key] = [item.value]; // Initialize form control with the value
      return acc;
    }, {});

    this.dynamicReactiveForm = this.fb.group(controls);
  }

  onSubmit(): void {
    // Process form submission
    console.log(this.dynamicReactiveForm?.value);
  }
}

import { Component } from '@angular/core';
import { ControlType} from '@ecoaching-on-pi/shared/data';
import { FormField } from '@ecoaching-on-pi/shared/data';

@Component({
  selector: 'ecoaching-on-pi-dynamic-reactive-form',
  templateUrl: './dynamic-reactive-form.component.html',
  styleUrls: ['./dynamic-reactive-form.component.scss']
})
export class DynamicReactiveFormComponent {

  // Example data array
formData: FormField[] = [ { key: 'name', value: 'John Doe', controlType: ControlType.Input }, { key: 'age', value: 5, controlType: ControlType.Slider, options: {min: 1, max: 9, step: 1}}];

}

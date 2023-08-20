import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ecoaching-on-pi-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent {
  newTrainingForm: FormGroup;

  @Output() trainingStart = new EventEmitter<void>();
  @Output() selectedMinutesChange = new EventEmitter<number>();

  constructor(private fb: FormBuilder) {
    this.newTrainingForm = this.fb.group({
      favoriteSport: '',
      selectedMinutes: '',
    });
  }

  onStartTraining(): void {
    this.trainingStart.emit();
    this.selectedMinutesChange.emit(this.newTrainingForm.value.selectedMinutes);
  }
}

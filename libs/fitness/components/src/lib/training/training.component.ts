import { Component } from '@angular/core';

@Component({
  selector: 'ecoaching-on-pi-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent {
  ongoingTraining = false;
  selectedMinutes = 1;

  onTrainingStart(): void {
    this.ongoingTraining = true;
  }

  onSelectedMinutesChange(minutes: number): void {
    this.selectedMinutes = minutes;
  }
}

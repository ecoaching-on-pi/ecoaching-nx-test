import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ecoaching-on-pi-stop-training',
  template: ` <h1 mat-dialog-title>Do you really want to stop Training?</h1>
    <mat-dialog-content>
      <mat-card>
        <mat-card-header><h1>Exhausted?</h1></mat-card-header>
        <mat-card-content>
          <p>
            Time remaining {{ passedData['minutes'] }} minutes and
            {{ passedData['seconds'] }} seconds. You can do it!
          </p>
          <img
            mat-card-image
            [src]="'assets/images/women-tired1.png'"
            alt="Woman sitting tired on yoga mat" />
        </mat-card-content>
      </mat-card>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Yes</button>
      <button mat-button [mat-dialog-close]="false">No</button>
    </mat-dialog-actions>`,
})
export class StopTrainingComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData: Record<string, string>
  ) {}
}

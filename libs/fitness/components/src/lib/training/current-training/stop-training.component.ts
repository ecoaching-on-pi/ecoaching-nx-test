import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'ecoaching-on-pi-stop-training',
  template: ` <h1 mat-dialog-title>Do you really want to stop Training?</h1>
    <mat-dialog-content>
      <p>You already trained {{ passedData['minutes'] }} minutes and {{ passedData['seconds'] }} seconds</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Yes</button>
      <button mat-button [mat-dialog-close]="false">No</button>
    </mat-dialog-actions>`
})
export class StopTrainingComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public passedData: Record<string,string>) { }
}

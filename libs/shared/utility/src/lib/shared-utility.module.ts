import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondsToMinutesPipe } from './pipes/seconds-to-minutes.pipe';
import { DynamicPipe } from './pipes/dynamic.pipe';
import { FirestoreTimestampPipe } from './pipes/firestore-timestamp.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [SecondsToMinutesPipe, DynamicPipe, FirestoreTimestampPipe],
  exports: [SecondsToMinutesPipe, DynamicPipe,FirestoreTimestampPipe],
})
export class SharedUtilityModule {}

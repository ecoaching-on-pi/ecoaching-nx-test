import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondsToMinutesPipe } from './pipes/seconds-to-minutes.pipe';
import { DynamicPipe } from './pipes/dynamic.pipe';
import { FirestoreTimestampPipe } from './pipes/firestore-timestamp.pipe';
import { FirstLetterUpperCasePipe } from './pipes/first-letter-upper-case.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [SecondsToMinutesPipe, DynamicPipe, FirestoreTimestampPipe, FirstLetterUpperCasePipe],
  exports: [SecondsToMinutesPipe, DynamicPipe, FirstLetterUpperCasePipe, FirestoreTimestampPipe],
})
export class SharedUtilityModule {}

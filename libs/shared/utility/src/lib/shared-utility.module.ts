import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondsToMinutesPipe } from './pipes/seconds-to-minutes.pipe';
import { DynamicPipe } from './pipes/dynamic.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [SecondsToMinutesPipe, DynamicPipe],
  exports: [SecondsToMinutesPipe, DynamicPipe],
})
export class SharedUtilityModule {}

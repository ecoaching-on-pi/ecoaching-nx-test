/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';
import { SecondsToMinutesPipe } from './seconds-to-minutes.pipe';
import { FirestoreTimestampPipe } from './firestore-timestamp.pipe';
interface PipeMap {
  [key: string]: PipeTransform; // Or use the specific pipe type if available
}

@Pipe({
  name: 'dynamicPipe',
})
export class DynamicPipe implements PipeTransform {
  private pipes: PipeMap = {
    duration: new SecondsToMinutesPipe(),
    date: new FirestoreTimestampPipe(),
  };

  transform(value: any, pipeName: string, ...args: any[]): any {
    const selectedPipe = this.pipes[pipeName];
    if (!selectedPipe) {
      return value;
    }

    return selectedPipe.transform(value, ...args);
  }
}

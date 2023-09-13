import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firestoreTimestamp'
})
export class FirestoreTimestampPipe implements PipeTransform {

  transform(timestamp: { seconds: number, nanoseconds: number }): string {
    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
    return date.toLocaleString(); // Adjust the format as needed
  }

}

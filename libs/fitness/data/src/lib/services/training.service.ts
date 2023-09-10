import { Injectable } from '@angular/core';
import { Exercise } from '../interfaces/exercise.model';
import { Subject, catchError, finalize, of, take, timeout } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();
  exercise$: Observable<Exercise[]> = new Observable<Exercise[]>();

  private runningExercise: Exercise | null = null;
  private exercises: MatTableDataSource<Exercise> = new MatTableDataSource();

  constructor(private firestore: Firestore) {}

  getAvailableExercises(): Observable<Exercise[]> {
    const itemCollection = collection(this.firestore, 'availableExercises');
    this.exercise$ = collectionData(itemCollection) as Observable<Exercise[]>;

    return this.exercise$
  }

  startexercise(selectedId: string): void {
    this.exercise$.pipe(
        take(1),
        timeout(5000),  // If no value is emitted in 5 seconds, throw an error.
        catchError(err => {
            console.error('An error occurred in startexercise:', err);
            // Handle the error, maybe show a user-friendly message or retry the operation.
            // Here, I'm returning an empty array, but adapt this based on your needs.
            return of([]);
        }),
        finalize(() => {
            // Any cleanup or final operations can be placed here.
            // This block will execute after the observable completes or errors out.
        })
    ).subscribe((exercises) => {
        this.runningExercise = exercises.find((ex) => ex.id === selectedId)|| null;
        this.exerciseChanged.next({ ...this.runningExercise as Exercise });
    });
}

  completeExercise(secondsDone: number): void {
    this.exercises.data = [...this.exercises.data, {
      ...(this.runningExercise as Exercise),
      duration: secondsDone as number,
      date: new Date(),
      state: 'completed',
    }];
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(secondsDone: number): void {
    const newExercise: Exercise = {
      ...(this.runningExercise as Exercise),
      duration: secondsDone as number,
      date: new Date(),
      state: 'cancelled',
    };
    this.exercises.data = [...this.exercises.data, newExercise];
    this.exerciseChanged.next(null);
    this.runningExercise = null;
  }
  getRunningExercise(): Exercise | null {
    return { ...(this.runningExercise as Exercise) };
  }

  getCompletedOrCancelledExercises(): MatTableDataSource<Exercise> {
    return this.exercises;
  }
}

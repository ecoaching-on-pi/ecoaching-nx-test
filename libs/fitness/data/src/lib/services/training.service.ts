import { Injectable } from '@angular/core';
import { Exercise } from '../interfaces/exercise.model';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();

  exercise$: Observable<Exercise[]> = new Observable<Exercise[]>();
  firestore: Firestore = inject(Firestore);

  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise | null = null;
  private exercises: MatTableDataSource<Exercise> = new MatTableDataSource();
  getAvailableExercises(): Observable<Exercise[]> {
    const itemCollection = collection(this.firestore, 'availableExercises');
    this.exercise$ = collectionData(itemCollection) as Observable<Exercise[]>;
    this.exercise$.subscribe((exercises) => {
      this.availableExercises = exercises;
      }
    );
    return this.exercise$

  }

  startexercise(selectedId: string): void {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    ) as Exercise;
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise(secondsDone: number): void {
    this.exercises.data.push({
      ...(this.runningExercise as Exercise),
      duration: secondsDone as number,
      date: new Date(),
      state: 'completed',
    });
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
    this.exercises.data.push(newExercise);
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

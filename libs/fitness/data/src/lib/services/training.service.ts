import { Injectable } from '@angular/core';
import { Exercise } from '../interfaces/exercise.model';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', calories: 18 },
    { id: 'burpees', name: 'Burpees', calories: 8 },
  ];
  private runningExercise: Exercise | null = null;
  private exercises: MatTableDataSource<Exercise> = new MatTableDataSource();
  getAvailableExercises(): Exercise[] {
    return this.availableExercises.slice();
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

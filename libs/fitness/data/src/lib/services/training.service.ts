/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Firestore,  collection, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  exerciseChanged = new Subject<any | null>();
  exercise$: Observable<any[]> = new Observable<any[]>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: any[] = [];

  private runningExercise: any | null = null;
  private exercises: MatTableDataSource<any> = new MatTableDataSource();

  constructor(private firestore: Firestore) {}

 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 async getAvailableExercises(): Promise<any[]> {
  try {
      const itemCollection = collection(this.firestore, 'availableExercises');

      // Initialize this.query as an empty array
      this.query = [];

      const querySnapshot = await getDocs(itemCollection);

      querySnapshot.forEach(documentSnapshot => {
          this.query.push({ doc_id: documentSnapshot.id, ...documentSnapshot.data() });
      });

      return this.query;
  } catch (error) {
      console.error("Error fetching available exercises:", error);
      throw error;  // Re-throwing the error if you want to handle it upstream, or you can handle it here directly.
  }
}


  startexercise(selectedId: string): void {
    this.runningExercise = this.query.find(ex => ex.doc_id === selectedId) || null;
    if (this.runningExercise) {
        this.exerciseChanged.next({ ...this.runningExercise });
    }
}

  completeExercise(secondsDone: number): void {
    this.exercises.data = [...this.exercises.data, {
      ...(this.runningExercise as any),
      duration: secondsDone as number,
      date: new Date(),
      state: 'completed',
    }];
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(secondsDone: number): void {
    const newExercise: any = {
      ...(this.runningExercise as any),
      duration: secondsDone as number,
      date: new Date(),
      state: 'cancelled',
    };
    this.exercises.data = [...this.exercises.data, newExercise];
    this.exerciseChanged.next(null);
    this.runningExercise = null;
  }
  getRunningExercise(): any | null {
    return { ...(this.runningExercise as any) };
  }

  getCompletedOrCancelledExercises(): MatTableDataSource<any> {
    return this.exercises;
  }
}

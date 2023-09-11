/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Firestore,  collection, getDocs, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  exerciseChanged = new Subject<any | null>();
  // exercise$: Observable<any[]> = new Observable<any[]>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: any[] = [];

  private runningExercise: any | null = null;
  private exercises: MatTableDataSource<any> = new MatTableDataSource();

  private unsubscribe$ = new Subject<void>();


// setup a data listener to listen to changes in the collection. Use takeUntil to manage unsubscription
// use collectionData to get the data as an Observable
// use onSnapshot to listen to changes in the collection, and emit the updated data to the Observable
// use collection to get the collection reference
// use getDocs to get the data as a Promise
// for mapping data onSnapshot, use the forEach operator
  exercises2$: Observable<any[]> = new Observable<any[]>((observer) => {
    const itemCollection = collection(this.firestore, 'availableExercises');

    const unsubscribe = onSnapshot(itemCollection, (querySnapshot) => {
        this.query = [];
        querySnapshot.forEach(documentSnapshot => {
            this.query.push({ doc_id: documentSnapshot.id, ...documentSnapshot.data() });
        });
        observer.next(this.query);  // Emit the fetched data
    }, (error) => {
        observer.error(error);
    });

    // Returning the unsubscribe function to be called when the Observable is unsubscribed from
    return () => {
        unsubscribe();
    };
}).pipe(
    takeUntil(this.unsubscribe$)  // Use takeUntil to manage unsubscription
);

  constructor(private firestore: Firestore) {}



 // eslint-disable-next-line @typescript-eslint/no-explicit-any


 private unsubscribeFromExercises?: () => void;  // Store the unsubscribe function

 getAvailableExercises(): void {
     const itemCollection = collection(this.firestore, 'availableExercises');

     // Store the unsubscribe function returned by onSnapshot
     this.unsubscribeFromExercises = onSnapshot(itemCollection, (querySnapshot) => {
         // Reset the query array
         this.query = [];

         querySnapshot.forEach(documentSnapshot => {
             this.query.push({ doc_id: documentSnapshot.id, ...documentSnapshot.data() });
         });
     }, (error) => {
         console.error("Error fetching available exercises:", error);
     });
 }


// calls only once with getDocs. For updates use onSnapshot
 async getLatestExercises(): Promise<any[]> {
  try {
      const itemCollection = collection(this.firestore, 'availableExercises');
      const exercises: any[] = [];

      const querySnapshot = await getDocs(itemCollection);
      querySnapshot.forEach(documentSnapshot => {
          exercises.push({ doc_id: documentSnapshot.id, ...documentSnapshot.data() });
      });

      return exercises;
  } catch (error) {
      console.error("Error fetching available exercises:", error);
      throw error;
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
  //  // Call this method when you want to stop listening to updates
 stopListeningToExercises(): void {
  if (this.unsubscribeFromExercises) {
      this.unsubscribeFromExercises();
  }
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Firestore,  addDoc,  collection, doc, getDocs, onSnapshot, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  exerciseChanged = new Subject<any | null>();
  // exercise$: Observable<any[]> = new Observable<any[]>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: any[] = [];
  finishedExercisesChanged = new Subject<any[]>();

  private runningExercise: any | null = null;

  private unsubscribe$ = new Subject<void>();
  private unsubscribeFromAvailableExercises?: () => void;  // Store the unsubscribe function
  private unsubscribeFromCompletedExercises?: () => void;  // Store the unsubscribe function


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


 getAvailableExercises(): void {
     const itemCollection = collection(this.firestore, 'availableExercises');

     // Store the unsubscribe function returned by onSnapshot
     this.unsubscribeFromAvailableExercises = onSnapshot(itemCollection, (querySnapshot) => {
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

  completeExercise(secondsDone: number, trainingName: string): void {
    this.addDataToDatabase({
      ...(this.runningExercise as any),
      name: trainingName,
      duration: secondsDone as number,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(secondsDone: number, trainingName: string): void {
    const newExercise: any = {
      ...(this.runningExercise as any),
      name: trainingName,
      duration: secondsDone as number,
      date: new Date(),
      state: 'cancelled',
    };
    this.addDataToDatabase(newExercise);
    this.runningExercise = null;
    this.exerciseChanged.next(null);

  }
  getRunningExercise(): any | null {
    return { ...(this.runningExercise as any) };
  }

  getCompletedOrCancelledExercises(): Observable<any> {
    const finishedCollection = collection(this.firestore, 'finishedExercises');
    this.unsubscribeFromCompletedExercises = onSnapshot(finishedCollection, (querySnapshot) => {
      const finishedExercises: any[] = [];
      querySnapshot.forEach(documentSnapshot => {
          finishedExercises.push({ doc_id: documentSnapshot.id, ...documentSnapshot.data() });
      });
      this.finishedExercisesChanged.next(finishedExercises);
  }, (error) => {
      console.error("Error fetching finished exercises:", error);
  });

    return this.finishedExercisesChanged.asObservable();
  }

  private async addDataToDatabase(exercise: any): Promise<void> {
    const exercisesCollection = collection(this.firestore, 'finishedExercises');

    try {
      const docRef = await addDoc(exercisesCollection, exercise);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  private async addDataToDatabaseWithSpecificId(exercise: any, docId: string): Promise<void> {
    const specificDoc = doc(this.firestore, 'finishedExercises', docId);

    try {
      await setDoc(specificDoc, exercise);
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  }

  //  // Call this method when you want to stop listening to updates
 stopListeningToExercises(): void {
  if (this.unsubscribeFromAvailableExercises) {
    console.log('Unsubscribing from exercises this.unsubscribeFromAvailableExercises')
      this.unsubscribeFromAvailableExercises();
  }
  if(this.unsubscribeFromCompletedExercises) {
    console.log('Unsubscribing from exercises this.unsubscribeFromCompletedExercises')
  this.unsubscribeFromCompletedExercises();
  }
  if(this.unsubscribe$) {
    console.log('Unsubscribing from exercises this.unsubscribe$')
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
  }
 }

}

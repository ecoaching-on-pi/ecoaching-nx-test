import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Exercise, TrainingService } from '@ecoaching-on-pi/fitness/data';
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc,DocumentReference, DocumentData, Firestore  } from 'firebase/firestore'

const firebase = {
  projectId: 'nx-ecoaching-test',
  appId: '1:1077287644488:web:d62a5b93dcb6f625ae577d',
  databaseURL: 'https://nx-ecoaching-test-default-rtdb.europe-west1.firebasedatabase.app',
  storageBucket: 'nx-ecoaching-test.appspot.com',
  apiKey: 'AIzaSyAwFiGjK6qjCn_P21r2ShC2xavNXL9bV84',
  authDomain: 'nx-ecoaching-test.firebaseapp.com',
  messagingSenderId: '1077287644488',
  measurementId: 'G-YYW7CPNVTL',
}
@Component({
  selector: 'ecoaching-on-pi-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  firebaseApp;
  firestore: Firestore | undefined;
  firestoreIntroDb!: DocumentReference<DocumentData>;

  newTrainingForm: FormGroup;
  images: string[] = [
    'fat-african-running1.png',
    'fat-african-running2.png',
    'fat-asian-yoga1.png',
    'fat-asian-yoga2.png',
    'fat-asian-yoga3.png',
    'fat-european-workout1.png',
    'fat-european-workout2.png',
    'fat-european-workout2png',
    'fat-european-workout3.png',
    'workout-female-african-running.png',
    'workout-female-african-running2.png',
    'workout-female-african-running3.png',
    'workout-female-asian-yoga.png',
    'workout-female-european-pilates.png',
    'workout-female-latin-american-workout.png',
    'workout-female-latin-american-workout2.png',
    'workout-male-african.png',
    'workout-male-african2.png',
    'workout-male-african3.png',
    'workout-male.png',
    'workout-male2.png',
    'workout-male3.png',
    'workout.png',
    'workout2.png',
    'workout3.png',
    'workout4.png',
    'workout5.png',
    'fat-latin-american-running1.png',
    'fat-latin-american-running2.png',
    'fat-latin-american-situps1.png',
    'fat-latin-american-situps2.png',
    'fat-latin-american-situps3.png',
    'fat-latin-american-workout1.png',
    'fat-latin-american-workout2.png',
  ];
  currentImage = 'workout-female-asian-yoga.png';
  exercises: Exercise[] = [];

  @Output() selectedMinutesChange = new EventEmitter<number>();

  constructor(
    private fb: FormBuilder,
    private trainingService: TrainingService
  ) {
    this.newTrainingForm = this.fb.group({
      favoriteSport: '',
      selectedMinutes: '',
    });
    try {
      this.firebaseApp = initializeApp(firebase);
      this.firestore = getFirestore(this.firebaseApp);
      this.firestoreIntroDb = doc(this.firestore, 'firestoreDemo3/lab-demo-0003');


    } catch (error) {
      console.error('Error initializing Firebase: ', error);
    }
  }
  async ngOnInit(): Promise<void> {
    const docData = {
      title: 'Firebase Fundamentals Demo3',
      description: 'Getting started with Cloud Firestore3',
    };


    try {
      await setDoc(this.firestoreIntroDb, docData);
      console.log('Firebase app initialized', docData);
    } catch (error) {
      console.error('Error writing to Firestore: ', error);
    }

    const randomIndex = Math.floor(Math.random() * this.images.length);
    this.currentImage = 'assets/images/' + this.images[randomIndex];
    this.exercises = this.trainingService.getAvailableExercises();
  }

  onStartTraining(): void {
    this.trainingService.startexercise(
      this.newTrainingForm.value.favoriteSport
    );
    this.selectedMinutesChange.emit(this.newTrainingForm.value.selectedMinutes);
  }
}

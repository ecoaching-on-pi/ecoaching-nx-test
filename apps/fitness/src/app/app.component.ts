import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { environment } from '../environments/environment';

@Component({
  selector: 'ecoaching-on-pi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter', [animate('0.5s ease-in')]),
      transition(':leave', [animate('0.5s ease-out')]),
    ]),
  ],
})
export class AppComponent implements OnInit{
   firebaseApp = initializeApp(environment.firebase);
   firestore = getFirestore()
   firestoreIntroDb = doc(this.firestore, 'firestoreDemo2/lab-demo-0002')

   ngOnInit(): void {
    const docData = {
      title: 'Firebase Fundamentals Demo2',
      description: 'Getting started with Cloud Firestore2',
    }
      setDoc(this.firestoreIntroDb, docData)
      console.log('Firebase app initialized', docData)
   }
}

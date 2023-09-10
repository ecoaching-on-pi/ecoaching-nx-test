import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component} from '@angular/core';
// import { initializeApp } from 'firebase/app'
// import { getFirestore, doc, getDoc } from 'firebase/firestore'
// import { environment } from '../environments/environment';




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
export class AppComponent {
  //  firebaseApp = initializeApp(environment.firebase);
  //  firestore = getFirestore()
  //  firestoreIntroDb = doc(this.firestore, 'availableExercises/yoga-training')


}

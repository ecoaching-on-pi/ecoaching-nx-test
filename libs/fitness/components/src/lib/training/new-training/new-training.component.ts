/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Exercise, TrainingService } from '@ecoaching-on-pi/fitness/data';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'ecoaching-on-pi-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {

  exercises$!: Promise<any[]>;
  firestore: Firestore = inject(Firestore);

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

  }
 ngOnInit(): void {
  // const itemCollection = collection(this.firestore, 'availableExercises');
  //    this.exercise$ = collectionData(itemCollection) as Observable<Exercise[]>;
  //    this.exercise$.subscribe((data) => { console.log('New training',data); });


    const randomIndex = Math.floor(Math.random() * this.images.length);
    this.currentImage = 'assets/images/' + this.images[randomIndex];
    this.exercises$ = this.trainingService.getAvailableExercises();

    console.log('New training neu',this.exercises);
  }

  onStartTraining(): void {
    this.trainingService.startexercise(
      this.newTrainingForm.value.favoriteSport
    );
    this.selectedMinutesChange.emit(this.newTrainingForm.value.selectedMinutes);
  }
}

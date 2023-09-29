/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable,NgZone } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  User
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  UserData : any;
  isLoggedIn: Observable<boolean>;
  constructor(private auth: Auth,private router : Router, public ngZone: NgZone, private snackBar: MatSnackBar){
    this.isLoggedIn = new Observable<boolean>(observer => {
      onAuthStateChanged(this.auth, (user: any) => {
        if (user) {
          this.UserData = user;
          localStorage.setItem('user', JSON.stringify(this.UserData));
          observer.next(true); // Emit true for loggedIn
        } else {
          localStorage.setItem('user', 'null');
          observer.next(false); // Emit false for not loggedIn
        }
      });
    });
   }

  //get User
    //get Authenticated user from firebase
    getAuthFire(): User | null {
      return this.auth.currentUser;
    }


    //get Authenticated user from Local Storage
      getAuthLocal(): any {
        const token = localStorage.getItem('user')
        const user = JSON.parse(token as string);
        return user;
      }


      //Register Method
      Register(email : string, password : string): Promise<void> {
        return createUserWithEmailAndPassword(this.auth, email, password)
        .then((result) => {
          console.log(result);
          this.UserData = result.user;
          this.ngZone.run(() => {
             /* Call the SendVerificaitonMail() function when new user sign
          up and returns promise */
            this.sendEmailVerification()
            this.router.navigate(['']);
          });
        })
        .catch((error) => {
          this.snackBar.open(error.message, "", {
            duration: 5000,});
        });
      }


      //Login Method
      Login(email : string, password : string): Promise<void> {
        return signInWithEmailAndPassword(this.auth, email, password)
        .then((result: any) => {
          this.UserData = result.user;
          this.ngZone.run(() => {
            this.router.navigate(['']);
          });
        })
        .catch((error) => {
          this.snackBar.open(error.message, "", {
            duration: 5000,});
        });
      }


     //Logout
      Logout(): void {
        signOut(this.auth).then(()=>this.router.navigate(['']))
      }


    //login with Email or Facebook
      //Login with Google
      GoogleAuth(): Promise<void> {
        return this.loginWithPopup({ provider: new GoogleAuthProvider() });
      }



      //Login with Facebook
      //FacebookAuth() {
      //  return this.loginWithPopup(new FacebookAuthProvider());
      //}



      //Pop Up Provider
      loginWithPopup({ provider }: { provider: any; }): Promise<void> {
        return signInWithPopup(this.auth,provider).then(() => {
          this.router.navigate(['']);
        });
      }


      //Send Password Reset Email
      async sendPasswordResetEmails({ email }: { email: string; }): Promise<void> {
         sendPasswordResetEmail(this.auth,email)
         .then(() => {
             this.snackBar.open('Password reset email sent, check your inbox.');
         })
         .catch((error) => {
          this.snackBar.open(error.message, "", {
            duration: 5000,});
        });
      }

      //Send Email Verification
      sendEmailVerification(): Promise<void> {
        return sendEmailVerification(this.auth.currentUser as User );
      }
}

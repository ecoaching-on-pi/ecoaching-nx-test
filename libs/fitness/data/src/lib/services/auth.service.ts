import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.model';
import { AuthData } from '../interfaces/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null = null;
  authChange = new Subject<boolean>();

  constructor(private router: Router) {}
  getUser(): User | null {
    return { ...(this.user as User) };
  }
  isAuth(): boolean {
    return this.user != null;
  }
  registerUser(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authSuccessfully();
  }
  login(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authSuccessfully();
  }
  logout(): void {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/fitness/login']);
  }

  private authSuccessfully(): void {
    this.authChange.next(true);
    this.router.navigate(['/fitness/training']);
  }
}

import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from '@ecoaching-on-pi/shared/service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ecoaching-on-pi-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnDestroy, OnInit {
  @Output() closesidenav = new EventEmitter<void>();

  isAuth = false;
  authSubscription: Subscription | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedIn.subscribe((isLoggedIn: boolean) => {
      this.isAuth = isLoggedIn;
    });
  }

  onSidenavclose(): void {
    this.closesidenav.emit();
  }
  onLogout(): void {
    this.onSidenavclose();
    this.authService.Logout();
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}

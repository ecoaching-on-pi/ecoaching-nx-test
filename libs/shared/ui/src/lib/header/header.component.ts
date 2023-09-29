import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from '@ecoaching-on-pi/shared/service';
import { Subscription } from 'rxjs';
// import { countries} from 'countries-list'

@Component({
  selector: 'ecoaching-on-pi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit,  OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();

  isAuth = false;
  authSubscription: Subscription | undefined;

  constructor(private authService: AuthService) {}

ngOnInit(): void {
  this.authSubscription = this.authService.isLoggedIn.subscribe((isLoggedIn: boolean) => {
    this.isAuth = isLoggedIn;
  });

}

  onLogout(): void {
    this.authService.Logout();
  }

  onSidenavToggle(): void {
    this.sidenavToggle.emit();
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}

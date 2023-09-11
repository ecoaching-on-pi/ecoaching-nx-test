import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from '@ecoaching-on-pi/fitness/data';
import { Subscription } from 'rxjs';
// import { countries} from 'countries-list'

@Component({
  selector: 'ecoaching-on-pi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();

  isAuth = false;
  authSubscription: Subscription | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(
      authStatus => (this.isAuth = authStatus)
    );
    // console.log(Object.values(countries).map(country => country.emoji + ' '+country.name + ' ' + country.languages));
  }

  onLogout(): void {
    this.authService.logout();
  }

  onSidenavToggle(): void {
    this.sidenavToggle.emit();
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}

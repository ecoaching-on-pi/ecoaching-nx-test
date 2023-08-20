import { Injectable, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreakpointsService implements OnDestroy {
  private isSmallScreenSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  breakpointChanges$ = this.isSmallScreenSubject.asObservable();

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe(result => {
        this.isSmallScreenSubject.next(result.matches);
      });
  }
  ngOnDestroy(): void {
    this.isSmallScreenSubject.unsubscribe();
  }
}

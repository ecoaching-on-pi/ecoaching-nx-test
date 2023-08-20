import { Component, OnDestroy } from '@angular/core';
import { BreakpointsService } from '@ecoaching-on-pi/shared/service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ecoaching-on-pi-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnDestroy {
  isSmallScreen = false;

  private breakpointSubscription: Subscription;

  constructor(private breakpointsService: BreakpointsService) {
    this.breakpointSubscription =
      this.breakpointsService.breakpointChanges$.subscribe(isSmall => {
        this.isSmallScreen = isSmall;
        console.log(this.isSmallScreen);
      });
  }

  ngOnDestroy(): void {
    this.breakpointSubscription.unsubscribe();
  }
}

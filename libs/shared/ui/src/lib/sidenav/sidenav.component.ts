import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ecoaching-on-pi-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @Output() closesidenav = new EventEmitter<void>();

  onSidenavclose(): void {
    this.closesidenav.emit();
  }
}

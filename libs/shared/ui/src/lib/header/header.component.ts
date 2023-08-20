import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ecoaching-on-pi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() sidenavToggle = new EventEmitter<void>();

  onSidenavToggle(): void {
    this.sidenavToggle.emit();
  }
}

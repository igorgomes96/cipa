import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor() { }

  toggleNavigationEmitter = new EventEmitter<void>();
  leftNavLinkEmitter = new EventEmitter<void>();

  toggleNavigation() {
    this.toggleNavigationEmitter.emit();
  }

  updateLeftNavLinks() {
    this.leftNavLinkEmitter.emit();
  }


}

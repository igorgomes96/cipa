import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor() { }

  toggleNavigationEmitter = new EventEmitter<void>();

  toggleNavigation() {
    this.toggleNavigationEmitter.emit();
  }


}

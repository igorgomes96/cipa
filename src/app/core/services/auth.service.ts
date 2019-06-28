import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  onUserChanges: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  set token(token: string) {
    localStorage.setItem('token', JSON.stringify(token));
    this.onUserChanges.emit(token);
  }

  get token(): string {
    return JSON.parse(localStorage.getItem('token'));
  }

  logout() {
    localStorage.removeItem('token');
  }
}

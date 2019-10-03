import { Injectable } from '@angular/core';
import { Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthCanLoadGuard implements CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.tokenValido) {
      this.router.navigate(['/autenticacao/login'], {
        queryParams: { redirectTo: segments.join('/') }
      });
      return false;
    }
    return true;
  }

}

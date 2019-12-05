import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { Injectable, NgModule } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, EMPTY, throwError } from 'rxjs';
import { ToastsService } from '../services/toasts.service';
import { ToastType } from '../components/toasts/toasts.component';
import { isObject } from 'util';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toast: ToastsService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((event: HttpEvent<any>) => {
          if (event instanceof HttpErrorResponse) {
            if (event.status === 401) {
              this.router.navigate(['autenticacao/login'], { queryParams: { redirectTo: window.location.pathname } });
            } else if (event.status === 403) {
              this.router.navigate(['forbidden']);
            } else {
              if (isObject(event.error)) {
                this.toast.showMessage({
                  message: (event.error.errors && event.error.errors[Object.keys(event.error.errors)[0]][0]) || event.message,
                  title: 'Erro de Processamento!',
                  type: ToastType.error
                });
              } else {
                this.toast.showMessage({
                  message: event.error || event.message,
                  title: 'Erro de Processamento!',
                  type: ToastType.error
                });
              }

            }
          }
          return throwError(event);
        })
      );
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    }
  ]
})
export class InterceptorsModule { }

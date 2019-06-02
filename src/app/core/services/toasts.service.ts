import { Injectable, EventEmitter } from '@angular/core';

import { ToastMessage, ToastType } from 'src/app/shared/components/toasts/toasts.component';
import { from, Observable } from 'rxjs';

declare var swal: any;

@Injectable({
  providedIn: 'root'
})
export class ToastsService {

  private _messageEmitter: EventEmitter<ToastMessage> = new EventEmitter<ToastMessage>();
  constructor() { }

  get messageEmitter() {
    return this._messageEmitter;
  }

  showMessage(message: ToastMessage) {
    this._messageEmitter.emit(message);
  }

  confirm(message: string, title = 'Tem certeza?'): Observable<boolean> {
    return from(swal({
      title,
      text: message,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }));
  }

}

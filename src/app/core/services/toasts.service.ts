import { Injectable, EventEmitter } from '@angular/core';

import { from, Observable } from 'rxjs';
import { ToastMessage } from '../components/toasts/toasts.component';

declare var swal: any;

@Injectable({
  providedIn: 'root'
})
export class ToastsService {

  // tslint:disable-next-line: variable-name
  private _messageEmitter: EventEmitter<ToastMessage> = new EventEmitter<ToastMessage>();
  constructor() { }

  get messageEmitter() {
    return this._messageEmitter;
  }

  showMessage(message: ToastMessage) {
    this._messageEmitter.emit(message);
  }

  confirmModal(message: string, title = 'Tem certeza?'): Observable<any> {
    return from(swal({
      title,
      text: message,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }));
  }

  errorModal(message: string, title = 'Ação inválida!'): Observable<any> {
    return from(swal({
      title,
      text: message,
      icon: 'warning'
    }));
  }

}

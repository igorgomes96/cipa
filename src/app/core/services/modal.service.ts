import { Injectable, EventEmitter, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _showModalEmitter = new EventEmitter<any>();
  constructor() { }

  get showModalEmitter() {
    return this._showModalEmitter;
  }

  showModal(template: TemplateRef<any>) {
    this._showModalEmitter.emit(template);
  }

  closeModal() {
    this._showModalEmitter.emit(false);
  }


}

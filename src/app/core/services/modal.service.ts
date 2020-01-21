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

  showModal(template: TemplateRef<any>, titulo = null) {
    this._showModalEmitter.emit({ template, titulo });
  }

  closeModal() {
    this._showModalEmitter.emit(false);
  }



}

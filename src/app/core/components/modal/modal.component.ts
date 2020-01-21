import { Subscription } from 'rxjs';
import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
  showModal = false;
  template: TemplateRef<any>;
  titulo: string = null;
  subscription = new Subscription();
  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.subscription.add(this.modalService.showModalEmitter
      .subscribe((templateValue: any) => {
        if (!templateValue) {
          this.showModal = templateValue;
        } else {
          this.showModal = true;
          this.template = templateValue.template;
          this.titulo = templateValue.titulo;
        }
      }));
  }

  closeModal() {
    this.modalService.showModalEmitter.emit(false);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

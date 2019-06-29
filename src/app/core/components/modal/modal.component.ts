import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  showModal = false;
  template: TemplateRef<any>;
  titulo: string = null;
  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.modalService.showModalEmitter
      .subscribe((templateValue: any) => {
        if (!templateValue) {
          this.showModal = templateValue;
        } else {
          this.showModal = true;
          this.template = templateValue.template;
          this.titulo = templateValue.titulo;
        }
      });
  }

  closeModal() {
    this.showModal = false;
  }

}

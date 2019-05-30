import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { template } from '@angular/core/src/render3';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  showModal = false;
  template: TemplateRef<any>;
  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.modalService.showModalEmitter
      .subscribe((templateValue: any) => {
        if (!templateValue) {
          this.showModal = templateValue;
        } else {
          this.showModal = true;
          this.template = templateValue;
        }
      });
  }

  closeModal() {
    this.showModal = false;
  }

}

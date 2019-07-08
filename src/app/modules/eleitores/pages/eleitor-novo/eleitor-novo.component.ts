import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { EleitoresApiService } from 'src/app/core/api/eleitores-api.service';
import { Eleitor } from 'src/app/shared/models/eleitor';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/shared/components/toasts/toasts.component';

@Component({
  selector: 'app-eleitor-novo',
  templateUrl: './eleitor-novo.component.html',
  styleUrls: ['./eleitor-novo.component.css']
})
export class EleitorNovoComponent implements OnInit {

  constructor(private eleitoresApi: EleitoresApiService,
              private toasts: ToastsService,
              private location: Location) { }

  ngOnInit() {
  }

  salvar(eleitor: Eleitor) {
    this.eleitoresApi.post(eleitor).subscribe(_ => {
      this.toasts.showMessage({
        message: 'Eleitor salvo com sucesso!',
        title: 'Sucesso!',
        type: ToastType.success
      });
      this.location.back();
    });
  }

  cancelar() {
    this.location.back();
  }
}

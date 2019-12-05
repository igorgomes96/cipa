import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Eleitor } from '@shared/models/eleitor';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/core/components/toasts/toasts.component';
import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';

@Component({
  selector: 'app-eleitor-edicao',
  templateUrl: './eleitor-edicao.component.html',
  styleUrls: ['./eleitor-edicao.component.css']
})
export class EleitorEdicaoComponent implements OnInit {

  eleitor: Eleitor;
  constructor(
    private route: ActivatedRoute,
    private toasts: ToastsService,
    private eleicoesApi: EleicoesApiService,
    private location: Location) { }

  ngOnInit() {
    this.route.data.subscribe((routeData: any) => {
      if (routeData.hasOwnProperty('eleitor')) {
        this.eleitor = routeData.eleitor;
      }
    });
  }


  salvar(eleitor: Eleitor) {
    this.eleicoesApi.putEleitor(eleitor.eleicaoId, eleitor.id, eleitor).subscribe(_ => {
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

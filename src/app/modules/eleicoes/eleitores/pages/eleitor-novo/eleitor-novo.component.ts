import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Eleitor } from '@shared/models/eleitor';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/core/components/toasts/toasts.component';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Eleicao } from '@shared/models/eleicao';
import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';

@Component({
  selector: 'app-eleitor-novo',
  templateUrl: './eleitor-novo.component.html',
  styleUrls: ['./eleitor-novo.component.css']
})
export class EleitorNovoComponent implements OnInit {

  eleicao: Eleicao;
  constructor(
    private toasts: ToastsService,
    private location: Location,
    private eleicoesApi: EleicoesApiService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .pipe(
        filter(routeData => routeData.hasOwnProperty('eleicao')),
        map(routeData => (routeData as { eleicao: Eleicao }).eleicao)
      ).subscribe((eleicao: Eleicao) => {
        this.eleicao = eleicao;
      });
  }

  salvar(eleitor: Eleitor) {
    if (!eleitor.eleicaoId) {
      eleitor.eleicaoId = this.eleicao.id;
    }
    this.eleicoesApi.postEleitor(eleitor.eleicaoId, eleitor).subscribe(_ => {
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

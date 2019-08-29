import { EleicoesApiService } from './../../../../core/api/eleicoes-api.service';
import { Voto } from 'src/app/shared/models/voto';
import { Dimensionamento } from 'src/app/shared/models/dimensionamento';
import { Apuracao, ResultadoApuracao } from './../../../../shared/models/apuracao';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PagedResult } from 'src/app/shared/models/paged-result';
import { Eleicao } from 'src/app/shared/models/eleicao';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  eleicao: Eleicao;
  apuracao: Apuracao[];
  dimensionamento: Dimensionamento;
  ultimaAtualizacao: Date;
  resultado: ResultadoApuracao;

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((routeData: any) => {
      this.eleicao = routeData.eleicao;
      this.ultimaAtualizacao = new Date();
      this.dimensionamento = routeData.dimensionamento;
      if (this.dimensionamento.qtdaVotos) {
        this.eleicao = routeData.eleicao;
        this.resultado = routeData.resultado;
        this.apuracao = routeData.apuracao;
      }
    });
  }


}

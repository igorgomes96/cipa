import { EleicoesApiService } from '@core/api/eleicoes-api.service';
import { Apuracao, ResultadoApuracao } from '@shared/models/apuracao';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Eleicao } from '@shared/models/eleicao';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  eleicao: Eleicao;
  apuracao: Apuracao[];
  ultimaAtualizacao: Date;
  resultado: ResultadoApuracao;

  optionsEleitoresVotantes = [{ nome: 'download', icon: 'fa-download' }];
  optionsCandidatos = [{ nome: 'download', icon: 'fa-download' }];

  donwloadRelatorioCandidatos = new EventEmitter<{}>();

  constructor(
    private route: ActivatedRoute,
    private eleicoesApi: EleicoesApiService) { }

  ngOnInit() {
    this.route.data.subscribe((routeData: any) => {
      this.eleicao = routeData.eleicao;
      this.ultimaAtualizacao = new Date();
      if (routeData.eleicao.dimensionamento.qtdaVotos) {
        this.eleicao = routeData.eleicao;
        this.resultado = routeData.resultado;
        this.apuracao = routeData.apuracao;
      }
    });
  }

  onOptionsEleitoresVotantesClick() {
    this.eleicoesApi.downloadRelatorioVotos(this.eleicao.id, 'Eleitores.xlsx').subscribe();
  }

  onOptionsCandidatosClick() {
    this.donwloadRelatorioCandidatos.emit();
  }


}

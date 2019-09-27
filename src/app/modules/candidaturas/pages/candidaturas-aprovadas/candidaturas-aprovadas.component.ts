import { Component, OnInit } from '@angular/core';
import { CandidatosApiService } from 'src/app/core/api/candidatos-api.service';
import { Candidato, StatusAprovacao } from 'src/app/shared/models/candidato';
import { TipoCardEleitor } from 'src/app/shared/components/card-candidato/card-candidato.component';
import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { ActivatedRoute } from '@angular/router';
import { Eleicao } from 'src/app/shared/models/eleicao';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-candidaturas-aprovadas',
  templateUrl: './candidaturas-aprovadas.component.html',
  styleUrls: ['./candidaturas-aprovadas.component.css']
})
export class CandidaturasAprovadasComponent implements OnInit {

  TipoCardEleitor: typeof TipoCardEleitor = TipoCardEleitor;
  candidatos: Candidato[];
  eleicao: Eleicao;

  constructor(
    private candidatosApi: CandidatosApiService,
    private eleicoesApi: EleicoesApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data
      .pipe(
        filter(routeData => routeData.hasOwnProperty('eleicao')),
        switchMap(routeData => {
          this.eleicao = routeData.eleicao;
          return this.eleicoesApi.getCandidatos(routeData.eleicao.id, StatusAprovacao.Aprovada);
        })
      ).subscribe((candidatos: Candidato[]) => {
        this.candidatos = candidatos;
      });
  }

}

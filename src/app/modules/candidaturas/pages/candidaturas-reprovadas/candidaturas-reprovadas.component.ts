import { Component, OnInit } from '@angular/core';
import { TipoCardEleitor } from 'src/app/shared/components/card-candidato/card-candidato.component';
import { Candidato, StatusAprovacao } from 'src/app/shared/models/candidato';
import { CandidatosApiService } from 'src/app/core/api/candidatos-api.service';
import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { Eleicao } from 'src/app/shared/models/eleicao';

@Component({
  selector: 'app-candidaturas-reprovadas',
  templateUrl: './candidaturas-reprovadas.component.html',
  styleUrls: ['./candidaturas-reprovadas.component.css']
})
export class CandidaturasReprovadasComponent implements OnInit {

  TipoCardEleitor: typeof TipoCardEleitor = TipoCardEleitor;
  candidatos: Candidato[];
  eleicao: Eleicao;

  constructor(
    private candidatosApi: CandidatosApiService,
    private eleicoesApi: EleicoesApiService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .pipe(
        filter(routeData => routeData.hasOwnProperty('eleicao')),
        switchMap(routeData => {
          this.eleicao = routeData.eleicao;
          return this.eleicoesApi.getCandidatos(routeData.eleicao.id, StatusAprovacao.Reprovada);
        })
      ).subscribe((candidatos: Candidato[]) => {
        this.candidatos = candidatos;
      });
  }

}

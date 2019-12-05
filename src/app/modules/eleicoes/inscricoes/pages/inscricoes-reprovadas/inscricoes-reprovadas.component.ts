import { Component, OnInit } from '@angular/core';
import { TipoCardEleitor } from '@shared/components/card-inscricao/card-inscricao.component';
import { Inscricao, StatusAprovacao } from '@shared/models/inscricao';
import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { Eleicao } from '@shared/models/eleicao';

@Component({
  selector: 'app-inscricoes-reprovadas',
  templateUrl: './inscricoes-reprovadas.component.html',
  styleUrls: ['./inscricoes-reprovadas.component.css']
})
export class InscricoesReprovadasComponent implements OnInit {

  TipoCardEleitor: typeof TipoCardEleitor = TipoCardEleitor;
  candidatos: Inscricao[];
  eleicao: Eleicao;

  constructor(
    private eleicoesApi: EleicoesApiService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .pipe(
        filter(routeData => routeData.hasOwnProperty('eleicao')),
        switchMap(routeData => {
          this.eleicao = routeData.eleicao;
          return this.eleicoesApi.getInscricoes(routeData.eleicao.id, StatusAprovacao.Reprovada);
        })
      ).subscribe((candidatos: Inscricao[]) => {
        this.candidatos = candidatos;
      });
  }

}

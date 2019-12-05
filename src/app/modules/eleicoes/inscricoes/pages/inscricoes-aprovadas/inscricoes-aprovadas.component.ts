import { Component, OnInit } from '@angular/core';
import { Inscricao, StatusAprovacao } from '@shared/models/inscricao';
import { TipoCardEleitor } from '@shared/components/card-inscricao/card-inscricao.component';
import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { ActivatedRoute } from '@angular/router';
import { Eleicao } from '@shared/models/eleicao';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-inscricoes-aprovadas',
  templateUrl: './inscricoes-aprovadas.component.html',
  styleUrls: ['./inscricoes-aprovadas.component.css']
})
export class InscricoesAprovadasComponent implements OnInit {

  TipoCardEleitor: typeof TipoCardEleitor = TipoCardEleitor;
  candidatos: Inscricao[];
  eleicao: Eleicao;

  constructor(
    private eleicoesApi: EleicoesApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data
      .pipe(
        filter(routeData => routeData.hasOwnProperty('eleicao')),
        switchMap(routeData => {
          this.eleicao = routeData.eleicao;
          return this.eleicoesApi.getInscricoes(routeData.eleicao.id, StatusAprovacao.Aprovada);
        })
      ).subscribe((candidatos: Inscricao[]) => {
        this.candidatos = candidatos;
      });
  }

}

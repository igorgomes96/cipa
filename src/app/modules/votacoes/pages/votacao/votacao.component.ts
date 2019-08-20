import { Component, OnInit } from '@angular/core';
import { TipoCardEleitor } from 'src/app/shared/components/card-candidato/card-candidato.component';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { Eleicao } from 'src/app/shared/models/eleicao';
import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { StatusAprovacao, Candidato } from 'src/app/shared/models/candidato';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-votacao',
  templateUrl: './votacao.component.html',
  styleUrls: ['./votacao.component.css']
})
export class VotacaoComponent implements OnInit {

  TipoCardEleitor = TipoCardEleitor;
  eleicao: Eleicao;
  candidatos: Candidato[];
  form: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private eleicoesApi: EleicoesApiService,
    private formBuilder: FormBuilder
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

    this.form = this.formBuilder.group({
      filtro: []
    });
  }

  votar(candidato: Candidato) {
    console.log(candidato);
  }

}

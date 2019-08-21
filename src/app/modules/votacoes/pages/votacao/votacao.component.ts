import { Component, OnInit } from '@angular/core';
import { TipoCardEleitor } from 'src/app/shared/components/card-candidato/card-candidato.component';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { Eleicao } from 'src/app/shared/models/eleicao';
import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { StatusAprovacao, Candidato } from 'src/app/shared/models/candidato';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { CandidatosApiService } from 'src/app/core/api/candidatos-api.service';
import { ToastType } from 'src/app/shared/components/toasts/toasts.component';

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
    private router: Router,
    private eleicoesApi: EleicoesApiService,
    private formBuilder: FormBuilder,
    private toasts: ToastsService,
    private candidatosApi: CandidatosApiService
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
    this.toasts.confirm(`Tem certeza que deseja votar para ${candidato.eleitor.nome}? Seu voto não poderá ser revertido.`)
      .pipe(
        filter(confirmacao => confirmacao),
        switchMap(_ => this.candidatosApi.postVotar(candidato.id))
      ).subscribe(voto => {
        this.toasts.showMessage({
          message: 'Voto registrado com sucesso',
          title: 'Sucesso',
          type: ToastType.success
        });
        this.router.navigate(['/home']);
      });
  }

}

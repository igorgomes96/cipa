import { Component, OnInit } from '@angular/core';
import { TipoCardEleitor } from '@shared/components/card-inscricao/card-inscricao.component';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, distinctUntilChanged, debounceTime, map, tap, finalize } from 'rxjs/operators';
import { Eleicao } from '@shared/models/eleicao';
import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { StatusAprovacao, Inscricao } from '@shared/models/inscricao';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/core/components/toasts/toasts.component';
import { inputPesquisa } from '@shared/rxjs-operators';

@Component({
  selector: 'app-votacao',
  templateUrl: './votacao.component.html',
  styleUrls: ['./votacao.component.css']
})
export class VotacaoComponent implements OnInit {

  private seedOrder;

  TipoCardEleitor = TipoCardEleitor;
  eleicao: Eleicao;
  candidatos: Inscricao[];
  form: FormGroup;
  pesquisando = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eleicoesApi: EleicoesApiService,
    private formBuilder: FormBuilder,
    private toasts: ToastsService
  ) { }

  ngOnInit() {
    this.seedOrder = Math.floor(Math.random() * 100) + 1;
    this.route.data
      .pipe(
        filter(routeData => routeData.hasOwnProperty('eleicao')),
        switchMap(routeData => {
          this.eleicao = routeData.eleicao;
          return this.eleicoesApi.getInscricoes(routeData.eleicao.id, StatusAprovacao.Aprovada, '', this.seedOrder);
        })
      ).subscribe((candidatos: Inscricao[]) => {
        this.candidatos = candidatos;
      });

    this.form = this.formBuilder.group({
      filtro: []
    });

    this.form.get('filtro').valueChanges
      .pipe(
        tap(_ => this.pesquisando = true),
        inputPesquisa(),
        switchMap(value => this.eleicoesApi.getInscricoes(this.eleicao.id, StatusAprovacao.Aprovada, value, this.seedOrder)),
        tap(_ => this.pesquisando = false),
      ).subscribe(candidatos => this.candidatos = candidatos);
  }

  votar(candidato: Inscricao) {
    this.toasts.confirmModal(`Tem certeza que deseja votar para ${candidato.eleitor.nome}? Seu voto não poderá ser revertido.`)
      .pipe(
        filter(confirmacao => confirmacao),
        switchMap(_ => this.eleicoesApi.postVotar(this.eleicao.id, candidato.id))
      ).subscribe(_ => this.mostrarMensagemSair());
  }

  votoBranco() {
    this.toasts.confirmModal(`Tem certeza que deseja votar em branco? Seu voto não poderá ser revertido.`)
      .pipe(
        filter(confirmacao => confirmacao),
        switchMap(_ => this.eleicoesApi.postVotoBranco(this.eleicao.id))
      ).subscribe(_ => this.mostrarMensagemSair());
  }

  private mostrarMensagemSair() {
    {
      this.toasts.showMessage({
        message: 'Voto registrado com sucesso',
        title: 'Sucesso',
        type: ToastType.success
      });
      this.router.navigate(['/eleicoes']);
    }
  }

}

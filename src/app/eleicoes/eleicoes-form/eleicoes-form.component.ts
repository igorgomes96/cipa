import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Eleicao } from 'src/app/core/models/eleicao';
import { Empresa } from 'src/app/core/models/empresa';
import { EmpresasApiService } from 'src/app/core/api/empresas-api.service';
import { Estabelecimento } from 'src/app/core/models/estabelecimento';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap, filter, switchMap } from 'rxjs/operators';
import { EstabelecimentosApiService } from 'src/app/core/api/estabelecimentos-api.service';
import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { EtapaCronograma, PosicaoEtapa } from 'src/app/core/models/cronograma';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/shared/components/toasts/toasts.component';

@Component({
  selector: 'app-eleicoes-form',
  templateUrl: './eleicoes-form.component.html',
  styleUrls: ['./eleicoes-form.component.css']
})
export class EleicoesFormComponent implements OnInit {

  steps = ['Gestão', 'Empresa', 'Estabelecimento', 'Cronograma'];
  currentStepIndex = 1;
  formListaEmpresa: FormGroup;
  formListaEstabelecimentos: FormGroup;
  formGestao: FormGroup;
  cronograma: EtapaCronograma[];
  estabelecimentos: Estabelecimento[] = [];
  empresas: Empresa[] = [];
  eleicao: Eleicao;
  novaEmpresa = false;
  novoEstabelecimento = false;
  PosicaoEtapa: typeof PosicaoEtapa = PosicaoEtapa;

  constructor(private route: ActivatedRoute,
    private empresasApi: EmpresasApiService,
    private estabelecimentosApi: EstabelecimentosApiService,
    private formBuilder: FormBuilder,
    private eleicoesApi: EleicoesApiService,
    private router: Router,
    private toasts: ToastsService) { }

  ngOnInit() {
    this.route.data
      .subscribe((routeData: any) => {
        if (routeData.hasOwnProperty('eleicao')) {
          this.eleicao = routeData.eleicao;
        }
      });

    this.empresasApi.getAll()
      .subscribe((empresas: Empresa[]) => {
        this.empresas = empresas;
      });

    this.formListaEmpresa = this.formBuilder.group({
      empresa: ['', Validators.required]
    });

    // Carrega os estabelecimentos de acordo com a empresa selecionada
    this.formListaEmpresa.get('empresa').valueChanges
      .pipe(tap((value: any) => {
        if (!value) {
          this.estabelecimentos = [];
        }
      }),
        filter((value: any) => value),
        switchMap((value: any) => this.estabelecimentosApi.getAll({ empresaId: value }))
      ).subscribe((estabelecimentos: Estabelecimento[]) => {
        this.estabelecimentos = estabelecimentos.map(est => {
          return new Estabelecimento(est);
        });
        if (this.estabelecimentos.length === 1) {
          this.formListaEstabelecimentos.get('estabelecimento').setValue(this.estabelecimentos[0].id);
        }
      });

    this.formListaEstabelecimentos = this.formBuilder.group({
      estabelecimento: ['', Validators.required]
    });

    this.eleicoesApi.getCronograma(1).subscribe(cronograma => {
      this.cronograma = cronograma;
    });

    this.formGestao = this.formBuilder.group({
      dataInicio: [new Date(), Validators.required],
      duracaoGestao: [2, Validators.required]
    });
  }

  get validNext() {
    switch (this.currentStepIndex) {
      case 1:
        return this.formGestao.valid;
      case 2:
        return this.formListaEmpresa.valid;
      case 3:
        return this.formListaEstabelecimentos.valid;
      case 4:
        return true;
      default:
        return false;
    }
  }

  get exibeGestao() {
    return this.formGestao.get('duracao').value;
  }

  get empresaSelecionada(): Empresa {
    // tslint:disable-next-line: triple-equals
    const empresa = this.empresas.find(emp => emp.id == this.formListaEmpresa.get('empresa').value);
    return empresa;
  }

  changeStep(step: number) {
    this.currentStepIndex = step;
  }

  empresaForm() {
    this.novaEmpresa = true;
  }

  salvarEmpresa(empresa: Empresa) {
    this.empresasApi.post(empresa)
      .subscribe((novaEmpresa: Empresa) => {
        this.novaEmpresa = false;
        this.empresas.push(novaEmpresa);
        this.formListaEmpresa.get('empresa').setValue(novaEmpresa.id);
      });
  }

  cancelarEmpresa() {
    this.novaEmpresa = false;
  }

  estabelecimentoForm() {
    this.novoEstabelecimento = true;
  }

  salvarEstabelecimento(estabelecimento: Estabelecimento) {
    this.estabelecimentosApi.post(estabelecimento)
      .subscribe((novoEstabelecimento: Estabelecimento) => {
        this.novoEstabelecimento = false;
        this.estabelecimentos.push(new Estabelecimento(novoEstabelecimento));
        this.formListaEstabelecimentos.get('estabelecimento').setValue(novoEstabelecimento.id);
      });
  }

  cancelarEstabelecimento() {
    this.novoEstabelecimento = false;
  }

  atualizarEtapa(etapaAtualizada: EtapaCronograma) {

    console.log('Teste');
    console.log(etapaAtualizada);
  }

  salvarEleicao() {
    const eleicao = {
      gestao: (this.formGestao.get('dataInicio').value as Date).getFullYear(),
      dataInicio: this.formGestao.get('dataInicio').value as Date,
      duracaoGestao: this.formGestao.get('duracaoGestao').value as number,
      estabelecimentoId: this.formListaEstabelecimentos.get('estabelecimento').value as number
    } as any;

    /* Retirar após implementação do back-end */
    eleicao.estabelecimento = this.estabelecimentos.find(e => e.id === eleicao.estabelecimentoId);
    eleicao.estabelecimento.empresa = this.empresas.find(e => e.id === eleicao.estabelecimento.empresaId);
    eleicao.cronograma = this.cronograma;
    /* Retirar após implementação do back-end */

    this.eleicoesApi.post(eleicao)
      .subscribe((novaEleicao: Eleicao) => {
        this.toasts.showMessage({
          message: 'Eleição aberta com sucesso!',
          title: 'Sucesso!',
          type: ToastType.success
        });
        this.router.navigate([`/eleicoes/${novaEleicao.id}/cronograma`]);
      });
  }

}

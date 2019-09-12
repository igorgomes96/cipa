import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Eleicao } from 'src/app/shared/models/eleicao';
import { Empresa } from 'src/app/shared/models/empresa';
import { EmpresasApiService } from 'src/app/core/api/empresas-api.service';
import { Estabelecimento } from 'src/app/shared/models/estabelecimento';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap, filter, switchMap } from 'rxjs/operators';
import { EstabelecimentosApiService } from 'src/app/core/api/estabelecimentos-api.service';
import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { EtapaCronograma, PosicaoEtapa } from 'src/app/shared/models/cronograma';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/shared/components/toasts/toasts.component';
import { Grupo } from 'src/app/shared/models/grupo';
import { GruposApiService } from 'src/app/core/api/grupos-api.service';
import { NavigationService } from 'src/app/core/services/navigation.service';

@Component({
  selector: 'app-eleicao-nova',
  templateUrl: './eleicao-nova.component.html',
  styleUrls: ['./eleicao-nova.component.css']
})
export class EleicaoNovaComponent implements OnInit {

  steps = ['Gestão', 'Empresa', 'Estabelecimento']; // 'Cronograma'
  currentStepIndex = 1;
  formListaEmpresa: FormGroup;
  formListaEstabelecimentos: FormGroup;
  gestao = { dataInicio: new Date(), duracaoGestao: 2 };
  formGestaoValid: boolean;
  estabelecimentos: Estabelecimento[] = [];
  estabelecimento = new Estabelecimento();
  grupos: Grupo[];
  empresas: Empresa[] = [];
  eleicao: Eleicao;
  novaEmpresa = false;
  novoEstabelecimento = false;

  constructor(
    private route: ActivatedRoute,
    private empresasApi: EmpresasApiService,
    private estabelecimentosApi: EstabelecimentosApiService,
    private formBuilder: FormBuilder,
    private eleicoesApi: EleicoesApiService,
    private router: Router,
    private toasts: ToastsService,
    private gruposApi: GruposApiService,
    private navigationService: NavigationService) { }

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
        if (!this.empresas.length) {
          this.novaEmpresa = true;
        }
        if (this.empresas.length === 1) {
          this.formListaEmpresa.get('empresa').setValue(this.empresas[0].id);
        }
      });

    this.formListaEmpresa = this.formBuilder.group({
      empresa: ['', Validators.required]
    });

    // Carrega os estabelecimentos de acordo com a empresa selecionada
    this.formListaEmpresa.get('empresa').valueChanges
      .pipe(tap((value: any) => {
        this.estabelecimento.empresaId = value;
        if (!value) {
          this.estabelecimentos = [];
        }
      }),
        filter((value: any) => value),
        switchMap((value: any) => this.estabelecimentosApi.getAll({ empresaId: value }))
      ).subscribe((estabelecimentos: Estabelecimento[]) => {
        this.estabelecimentos = estabelecimentos;
        if (!this.estabelecimentos.length) {
          this.novoEstabelecimento = true;
        } else if (this.estabelecimentos.length === 1) {
          this.formListaEstabelecimentos.get('estabelecimento').setValue(this.estabelecimentos[0].id);
        }
      });

    this.formListaEstabelecimentos = this.formBuilder.group({
      estabelecimento: ['', Validators.required],
      // grupo: ['', Validators.required]
    });

    this.gruposApi.getAll()
    .subscribe((grupos: Grupo[]) => {
      this.grupos = grupos;
    });
  }

  formGestaoStatusChange(status: boolean) {
    this.formGestaoValid  = status;
  }

  get validNext() {
    switch (this.currentStepIndex) {
      case 1:
        return this.formGestaoValid;
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

  get empresaSelecionada(): Empresa {
    const empresa = this.empresas.find(emp => emp.id === +this.formListaEmpresa.get('empresa').value);
    return empresa;
  }

  get estabelecimentoSelecionado() {
    const value = this.formListaEstabelecimentos.get('estabelecimento').value;
    if (!value) {
      return null;
    }
    const id = +value;
    const estabelecimento = this.estabelecimentos.find(e => e.id === id);
    return estabelecimento;
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
        this.estabelecimentos.push(novoEstabelecimento);
        this.formListaEstabelecimentos.get('estabelecimento').setValue(novoEstabelecimento.id);
      });
  }

  cancelarEstabelecimento() {
    this.novoEstabelecimento = false;
  }

  salvarEleicao() {
    const eleicao = {
      ...this.gestao,
      gestao: this.gestao.dataInicio.getFullYear(),
      estabelecimentoId: this.formListaEstabelecimentos.get('estabelecimento').value as number
    } as any;

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

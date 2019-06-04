import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Eleicao } from 'src/app/core/models/eleicao';
import { Empresa } from 'src/app/core/models/empresa';
import { EmpresasApiService } from 'src/app/core/api/empresas-api.service';
import { Estabelecimento } from 'src/app/core/models/estabelecimento';
import { FormGroup, FormBuilder } from '@angular/forms';
import { tap, filter, switchMap } from 'rxjs/operators';
import { EstabelecimentosApiService } from 'src/app/core/api/estabelecimentos-api.service';
import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { EtapaCronograma, PosicaoEtapa } from 'src/app/core/models/cronograma';

@Component({
  selector: 'app-eleicoes-form',
  templateUrl: './eleicoes-form.component.html',
  styleUrls: ['./eleicoes-form.component.css']
})
export class EleicoesFormComponent implements OnInit {

  formListaEmpresa: FormGroup;
  formListaEstabelecimentos: FormGroup;
  formGestao: FormGroup;
  cronograma: EtapaCronograma[];
  estabelecimentos: Estabelecimento[] = [];
  empresas: Empresa[] = [];
  eleicao: Eleicao;
  PosicaoEtapa: typeof PosicaoEtapa = PosicaoEtapa;

  constructor(private route: ActivatedRoute,
    private empresasApi: EmpresasApiService,
    private estabelecimentosApi: EstabelecimentosApiService,
    private formBuilder: FormBuilder,
    private eleicoesApi: EleicoesApiService) { }

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
      empresa: ['']
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
      estabelecimento: ['']
    });

    this.eleicoesApi.getCronograma(1).subscribe(cronograma => {
      this.cronograma = cronograma;
    });

    this.formGestao = this.formBuilder.group({
      gestao: [new Date().getFullYear()],
      duracao: [2]
    });
  }

  get exibeGestao() {
    return this.formGestao.get('gestao').value && this.formGestao.get('duracao').value;
  }

}

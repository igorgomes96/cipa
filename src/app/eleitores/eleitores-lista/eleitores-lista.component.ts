import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Eleitor } from 'src/app/core/models/eleitor';
import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap, distinctUntilChanged, debounce, debounceTime } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EleitoresApiService } from 'src/app/core/api/eleitores-api.service';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/shared/components/toasts/toasts.component';
import { Eleicao } from 'src/app/core/models/eleicao';

declare var $: any;

@Component({
  selector: 'app-eleitores-lista',
  templateUrl: './eleitores-lista.component.html',
  styleUrls: ['./eleitores-lista.component.css']
})
export class EleitoresListaComponent implements OnInit {

  eleitores: Eleitor[];
  eleicao: Eleicao;
  form: FormGroup;
  constructor(private eleicoesApi: EleicoesApiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private eleitoresApi: EleitoresApiService,
    private toasts: ToastsService) { }

  ngOnInit() {
    this.route.data
      .pipe(
        filter(routeData => routeData.hasOwnProperty('eleicao')),
        switchMap(routeData => {
          this.eleicao = routeData.eleicao;
          return this.eleicoesApi.getEleitores(this.eleicao.id);
        })
      ).subscribe(eleitores => {
        this.eleitores = eleitores;
      });

    this.form = this.formBuilder.group({
      filtro: ['']
    });
    this.form.get('filtro').valueChanges
      .pipe(distinctUntilChanged(), debounceTime(500))
      .subscribe((value: any) => {
        //console.log(value);
      });
  }

  carregaEleitores() {
    return this.eleicoesApi.getEleitores(this.eleicao.id)
      .subscribe(eleitores => {
        this.eleitores = eleitores;
      });
  }

  excluir(id: number) {
    this.toasts.confirm('Deseja mesmo excluir esse eleitor?')
      .subscribe((confirmacao: boolean) => {
        if (confirmacao) {
          this.eleitoresApi.delete(id)
            .subscribe(_ => {
              this.toasts.showMessage({
                message: 'Eleitor excluído com sucesso!',
                title: 'Sucesso!',
                type: ToastType.success
              });
              this.carregaEleitores();
            });
        }
      });
  }


}

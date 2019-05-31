import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Eleitor } from 'src/app/core/models/eleitor';
import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap, distinctUntilChanged, debounce, debounceTime } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EleitoresApiService } from 'src/app/core/api/eleitores-api.service';
import { ToastsService } from 'src/app/core/services/toasts.service';

declare var $: any;

@Component({
  selector: 'app-eleitores-lista',
  templateUrl: './eleitores-lista.component.html',
  styleUrls: ['./eleitores-lista.component.css']
})
export class EleitoresListaComponent implements OnInit {

  eleitores: Eleitor[];
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
          return this.eleicoesApi.getEleitores(routeData.eleicao.id);
        })
      ).subscribe(eleitores => {
        this.eleitores = eleitores;
        // $('.footable').footable();
      });

    this.form = this.formBuilder.group({
      filtro: ['']
    });
    this.form.get('filtro').valueChanges
    .pipe(distinctUntilChanged(), debounceTime(500))
    .subscribe((value: any) => {
      console.log(value);
    });
  }

  excluir() {
    this.toasts.confirm('Deseja mesmo excluir esse eleitor?')
    .subscribe((confirmacao: boolean) => {
      console.log(confirmacao);
    });
  }


}

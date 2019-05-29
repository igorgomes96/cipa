import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Eleitor } from 'src/app/core/models/eleitor';
import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-eleitores-lista',
  templateUrl: './eleitores-lista.component.html',
  styleUrls: ['./eleitores-lista.component.css']
})
export class EleitoresListaComponent implements OnInit, AfterViewInit {

  eleitores: Eleitor[];
  constructor(private eleicoesApi: EleicoesApiService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .pipe(
        filter(routeData => routeData.hasOwnProperty('eleicao')),
        switchMap(routeData => {
          return this.eleicoesApi.getEleitores(routeData.eleicao.id);
        })
      ).subscribe(eleitores => {
        this.eleitores = eleitores;
        $('.footable').footable();
      });

  }

  ngAfterViewInit() {
  }


}

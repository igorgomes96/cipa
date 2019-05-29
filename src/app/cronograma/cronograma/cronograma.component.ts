import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EtapaCronograma, PosicaoEtapa } from 'src/app/core/models/cronograma';
import { Eleicao } from 'src/app/core/models/eleicao';
import { filter, switchMap } from 'rxjs/operators';
import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { Arquivo } from 'src/app/core/models/arquivo';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css']
})
export class CronogramaComponent implements OnInit {

  PosicaoEtapa: typeof PosicaoEtapa = PosicaoEtapa;
  eleicao: Eleicao;
  arquivos: Arquivo[];
  constructor(private route: ActivatedRoute,
              private api: EleicoesApiService) { }

  ngOnInit() {
    this.route.data
    .pipe(
      filter(routeData => routeData.hasOwnProperty('eleicao')),
      switchMap(routeData => {
        this.eleicao = routeData.eleicao;
        return this.api.getCronograma(routeData.eleicao.id);
      })
    ).subscribe(cronograma => {
      this.eleicao.cronograma = cronograma;
    });

    this.arquivos = [
      {
        content: null,
        contentType: null,
        dataCriacao: new Date(),
        dataUpload: new Date(),
        extensao: '.xls',
        id: '1',
        nome: 'Teste.xls',
        path: '/teste/teste.xls'
      }
    ]
  }

}

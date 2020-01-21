import { Component, OnInit, Input } from '@angular/core';
import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { PagedResult } from '@shared/models/paged-result';
import { Voto } from '@shared/models/voto';
import { Eleicao } from '@shared/models/eleicao';

@Component({
  selector: 'app-relatorio-eleitores',
  templateUrl: './relatorio-eleitores.component.html',
  styleUrls: ['./relatorio-eleitores.component.css']
})
export class RelatorioEleitoresComponent implements OnInit {

  @Input() eleicao: Eleicao;

  votos: PagedResult<Voto> = {
    currentPage: 1,
    pageCount: 0,
    pageSize: 10,
    result: [],
    totalRecords: 0
  };
  constructor(private eleicoesApi: EleicoesApiService) { }

  ngOnInit() {
    this.carregaVotos();
  }

  alteraPagina(pagina: number) {
    this.votos.currentPage = pagina;
    this.carregaVotos();
  }

  alteraTamanhoPagina(tamanhoPagina: number) {
    this.votos.pageSize = tamanhoPagina;
    this.carregaVotos();
  }

  carregaVotos() {
    this.eleicoesApi.getVotos(this.eleicao.id, this.pageParams)
      .subscribe((votos: PagedResult<Voto>) => {
        this.votos = votos;
      });
  }

  get pageParams(): any {
    return { pageSize: this.votos.pageSize, pageNumber: this.votos.currentPage };
  }

}

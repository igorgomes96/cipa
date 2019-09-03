import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PagedResult } from '../../models/paged-result';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  pages: number[] = [];

  // tslint:disable-next-line:variable-name
  private _paginationInfo: PagedResult<any>;

  @Input() showRegistrosPorPagina = true;
  @Input() quantidadePages = 5;
  @Input() tamanhosDisponiveis = [5, 10, 25, 50, 100, 200];
  @Input()
  set paginationInfo(pageResult: PagedResult<any>) {
    if (pageResult && !pageResult.currentPage) {
      this._paginationInfo.currentPage = 1;
      return;
    }
    this._paginationInfo = pageResult;
    this.pages = [];
    if (pageResult && pageResult.pageCount > 1) {
      for (let i = 1; i <= pageResult.pageCount; i++) {
        this.pages.push(i);
      }
    }

    if (pageResult && pageResult.pageCount && pageResult.currentPage > pageResult.pageCount) {
      // Se a página corrente for maior que a quantidade de páginas
      this._paginationInfo.currentPage = pageResult.pageCount;
      this.alteraPagina.emit(this._paginationInfo.currentPage);
    }

  }

  get paginationInfo(): PagedResult<any> {
    if (!this._paginationInfo) {
      return {
        currentPage: 1,
        pageCount: 0,
        pageSize: 5,
        result: [],
        totalRecords: 0
      };
    }
    return this._paginationInfo;
  }

  @Output() alteraPagina = new EventEmitter<number>();
  @Output() alteraTamanhoPagina = new EventEmitter<number>();


  constructor() { }

  ngOnInit() {

  }

  anterior() {
    if (this.paginationInfo.currentPage > 1) {
      this.paginationInfo.currentPage--;
      this.alteraPagina.emit(this.paginationInfo.currentPage);
    }
  }

  proximo() {
    if (this.paginationInfo.currentPage < this.paginationInfo.pageCount) {
      this.paginationInfo.currentPage++;
      this.alteraPagina.emit(this.paginationInfo.currentPage);
    }
  }

  primeiro() {
    this.paginationInfo.currentPage = 1;
    this.alteraPagina.emit(this.paginationInfo.currentPage);
  }

  ultimo() {
    this.paginationInfo.currentPage = this.paginationInfo.pageCount;
    this.alteraPagina.emit(this.paginationInfo.currentPage);
  }

  mudaPagina(page: number) {
    if (this.paginationInfo.currentPage !== page) {
      this.paginationInfo.currentPage = page;
      this.alteraPagina.emit(page);
    }
  }

  get startPage(): number {
    const tamanhoPages = this.quantidadePages % 2 ? this.quantidadePages + 1 : this.quantidadePages;
    let startPage = this._paginationInfo.currentPage - (tamanhoPages / 2);
    if (startPage < 0) { return 0; }
    if ((startPage + this.quantidadePages) > this._paginationInfo.pageCount) {
      startPage = this._paginationInfo.pageCount - this.quantidadePages;
    }
    if (startPage < 0) { return 0; }
    return startPage;
  }

  get endPage(): number {
    return this.startPage + this.quantidadePages;
  }

  isPageActive(page: number) {
    return this.paginationInfo.currentPage === page;
  }

  mudaTamanhoPagina(tamanhoPagina: number) {
    this.alteraTamanhoPagina.emit(tamanhoPagina);
  }

}

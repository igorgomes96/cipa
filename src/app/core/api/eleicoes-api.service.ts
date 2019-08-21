import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GenericApi } from './generic-api';
import { Eleicao } from '../../shared/models/eleicao';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/environments/endpoints';
import { EtapaCronograma } from '../../shared/models/cronograma';
import { Observable } from 'rxjs';
import { Eleitor } from '../../shared/models/eleitor';
import { PagedResult } from 'src/app/shared/models/paged-result';
import { Candidato, StatusAprovacao } from 'src/app/shared/models/candidato';
import { Importacao } from 'src/app/shared/models/importacao';
import { ArquivosApiService } from './arquivos-api.service';
import { filterResponse } from 'src/app/shared/components/rxjs-operators';
import { Voto } from 'src/app/shared/models/voto';

@Injectable({
  providedIn: 'root'
})
export class EleicoesApiService extends GenericApi<Eleicao> {

  constructor(
    private http: HttpClient,
    private arquivosApiService: ArquivosApiService) {
    super(http, environment.api + endpoints.eleicoes);
  }

  getEleitor(idEleicao: number): Observable<Eleitor> {
    return this.http.get<Eleitor>(`${this.url}${idEleicao}/eleitor`);
  }

  getCandidato(idEleicao: number): Observable<Candidato> {
    return this.http.get<Candidato>(`${this.url}${idEleicao}/candidato`);
  }

  getCandidatos(idEleicao: number, status: StatusAprovacao): Observable<Candidato[]> {
    return this.http.get<Candidato[]>(`${this.url}${idEleicao}/candidatos`, { params: { status: StatusAprovacao[status] } });
  }

  getCronograma(idEleicao: number): Observable<EtapaCronograma[]> {
    return this.http.get<EtapaCronograma[]>(`${this.url}${idEleicao}/cronograma`);
  }

  getEleitores(idEleicao: number, params: any): Observable<Eleitor[] | PagedResult<Eleitor>> {
    const validParams = this.validParams(params);
    return this.http.get<Eleitor[] | PagedResult<Eleitor>>(`${this.url}${idEleicao}/eleitores`, { params: validParams });
  }

  deleteEleitores(idEleicao: number): Observable<{}> {
    return this.http.delete(`${this.url}${idEleicao}/eleitores`);
  }

  postProximaEtapa(idEleicao: number): Observable<EtapaCronograma[]> {
    return this.http.post<EtapaCronograma[]>(`${this.url}${idEleicao}/proximaetapa`, null);
  }

  postImportacao(idEleicao: number, arquivo: FileList): Observable<any> {
    return this.arquivosApiService.uploadFiles(`${this.url}${idEleicao}/importacao`, arquivo)
      .pipe(filterResponse());
  }

  getVotos(idEleicao: number): Observable<Voto[]> {
    return this.http.get<Voto[]>(`${this.url}${idEleicao}/votos`);
  }

  getVotoEleitor(idEleicao: number, idEleitor: number): Observable<Voto[]> {
    const params: any = {
      eleitorId: idEleitor
    };
    return this.http.get<Voto[]>(`${this.url}${idEleicao}/voto`, { params });
  }

  getVotoUsuario(idEleicao: number): Observable<Voto[]> {
    return this.http.get<Voto[]>(`${this.url}${idEleicao}/voto`);
  }

}

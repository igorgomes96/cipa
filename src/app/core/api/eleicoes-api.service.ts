import { Eleicao } from '@shared/models/eleicao';
import { ResultadoApuracao } from '@shared/models/apuracao';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';

import { GenericApi } from './generic-api';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/environments/endpoints';
import { EtapaCronograma } from '@shared/models/cronograma';
import { Observable } from 'rxjs';
import { Eleitor } from '@shared/models/eleitor';
import { PagedResult } from '@shared/models/paged-result';
import { Inscricao, StatusAprovacao, Reprovacao } from '@shared/models/inscricao';
import { Importacao } from '@shared/models/importacao';
import { ArquivosApiService } from './arquivos-api.service';
import { filterResponse } from '@shared/components/rxjs-operators';
import { Voto } from '@shared/models/voto';
import { Dimensionamento } from '@shared/models/dimensionamento';
import { Apuracao } from '@shared/models/apuracao';
import { downloadArquivo } from '@shared/rxjs-operators';
import { switchMap } from 'rxjs/operators';
import { Arquivo } from '@shared/models/arquivo';
import { Inconsistencia } from '@shared/models/inconsistencias';

@Injectable({
  providedIn: 'root'
})
export class EleicoesApiService extends GenericApi<Eleicao> {

  constructor(
    private http: HttpClient,
    private arquivosApiService: ArquivosApiService) {
    super(http, environment.api + endpoints.eleicoes);
  }

  // Eleitores
  getEleitores(idEleicao: number, params: any): Observable<Eleitor[] | PagedResult<Eleitor>> {
    const validParams = this.validParams(params);
    return this.http.get<Eleitor[] | PagedResult<Eleitor>>(`${this.url}${idEleicao}/eleitores`, { params: validParams });
  }

  getEleitorUsuario(idEleicao: number): Observable<Eleitor> {
    return this.http.get<Eleitor>(`${this.url}${idEleicao}/eleitor`);
  }

  getEleitor(idEleicao: number, idEleitor: number): Observable<Eleitor> {
    return this.http.get<Eleitor>(`${this.url}${idEleicao}/eleitores/${idEleitor}`);
  }

  postEleitor(idEleicao: number, eleitor: Eleitor): Observable<Eleitor> {
    return this.http.post<Eleitor>(`${this.url}${idEleicao}/eleitores`, eleitor);
  }

  putEleitor(idEleicao: number, idEleitor: number, eleitor: Eleitor): Observable<Eleitor> {
    return this.http.put<Eleitor>(`${this.url}${idEleicao}/eleitores/${idEleitor}`, eleitor);
  }

  deleteEleitores(idEleicao: number): Observable<{}> {
    return this.http.delete(`${this.url}${idEleicao}/eleitores`);
  }

  deleteEleitor(idEleicao: number, idEleitor: number): Observable<{}> {
    return this.http.delete(`${this.url}${idEleicao}/eleitores/${idEleitor}`);
  }

  getUsuarioEhEleitor(idEleicao: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}${idEleicao}/usuarioeleitor`);
  }

  // Inscrições
  postInscricao(idEleicao: number, inscricao: Inscricao): Observable<Inscricao> {
    return this.http.post<Inscricao>(`${this.url}${idEleicao}/inscricoes`, inscricao);
  }

  putInscricao(idEleicao: number, inscricao: Inscricao): Observable<Inscricao> {
    return this.http.put<Inscricao>(`${this.url}${idEleicao}/inscricoes`, inscricao);
  }

  getInscricaoUsuario(idEleicao: number): Observable<Inscricao> {
    return this.http.get<Inscricao>(`${this.url}${idEleicao}/inscricao`);
  }

  getInscricoes(idEleicao: number, status: StatusAprovacao, pesquisa: string = ''): Observable<Inscricao[]> {
    return this.http.get<Inscricao[]>(`${this.url}${idEleicao}/inscricoes`,
      { params: { status: StatusAprovacao[status], eleitorNome: pesquisa || '' } });
  }

  postFotoInscricao(idEleicao: number, foto: FileList): Observable<HttpEvent<{}>> {
    return this.arquivosApiService.uploadFiles(`${this.url}${idEleicao}/inscricoes/foto`, foto);
  }

  getFotoInscrito(idEleicao: number, id: number): Observable<any> {
    const readFoto = (foto: Blob) => {
      return new Promise(resolve => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(foto);
        fileReader.onload = ($loaded) => {
          resolve(($loaded.target as any).result);
        };
      });
    };

    return this.http.get(`${this.url}${idEleicao}/inscricoes/${id}/foto`,
      { headers: { 'Content-Type': 'image/jpeg' }, responseType: 'blob' })
      .pipe(switchMap((foto) => readFoto(foto)));
  }

  putAprovarInscricao(idEleicao: number, idInscricao: number): Observable<Inscricao> {
    return this.http.put<Inscricao>(`${this.url}${idEleicao}/inscricoes/${idInscricao}/aprovar`, null);
  }

  putReprovarInscricao(idEleicao: number, idInscricao: number, reprovacao: Reprovacao): Observable<Inscricao> {
    return this.http.put<Inscricao>(`${this.url}${idEleicao}/inscricoes/${idInscricao}/reprovar`, reprovacao);
  }


  // Cronograma
  getCronograma(idEleicao: number): Observable<EtapaCronograma[]> {
    return this.http.get<EtapaCronograma[]>(`${this.url}${idEleicao}/cronograma`);
  }

  putAtualizaEtapaCronograma(idEleicao: number, etapaCronograma: EtapaCronograma): Observable<EtapaCronograma[]> {
    return this.http.put<EtapaCronograma[]>(`${this.url}${idEleicao}/cronograma`, etapaCronograma);
  }

  postProximaEtapa(idEleicao: number): Observable<EtapaCronograma[]> {
    return this.http.post<EtapaCronograma[]>(`${this.url}${idEleicao}/proximaetapa`, null);
  }


  // Importação
  postImportacao(idEleicao: number, arquivo: FileList): Observable<any> {
    return this.arquivosApiService.uploadFiles(`${this.url}${idEleicao}/importacoes`, arquivo)
      .pipe(filterResponse());
  }

  getUltimaImportacao(idEleicao: number): Observable<Importacao> {
    return this.http.get<Importacao>(`${this.url}${idEleicao}/importacoes/ultima`);
  }

  public getInconsistencias(idEleicao: number, id: number): Observable<Inconsistencia> {
    return this.http.get<Inconsistencia>(`${this.url}${idEleicao}/importacoes/${id}/inconsistencias`);
  }


  // Votos
  postVotar(idEleicao: number, idInscricao: number): Observable<Voto> {
    return this.http.post<Voto>(`${this.url}${idEleicao}/inscricoes/${idInscricao}/votar`, null);
  }

  getVotos(idEleicao: number, params: any = {}): Observable<Voto[] | PagedResult<Voto>> {
    const validParams = this.validParams(params);
    return this.http.get<Voto[]>(`${this.url}${idEleicao}/votos`, { params: validParams });
  }

  postVotoBranco(idEleicao: number): Observable<Voto> {
    return this.http.post<Voto>(`${this.url}${idEleicao}/votarbranco`, null);
  }

  getVotoEleitor(idEleicao: number, idEleitor: number): Observable<Voto[]> {
    const params: any = {
      eleitorId: idEleitor
    };
    return this.http.get<Voto[]>(`${this.url}${idEleicao}/voto`, { params });
  }

  getVotoUsuario(idEleicao: number): Observable<Voto> {
    return this.http.get<Voto>(`${this.url}${idEleicao}/votousuario`);
  }

  getDimensionamento(idEleicao: number): Observable<Dimensionamento> {
    return this.http.get<Dimensionamento>(`${this.url}${idEleicao}/dimensionamento`);
  }

  getApuracao(idEleicao: number): Observable<Apuracao[]> {
    return this.http.get<Apuracao[]>(`${this.url}${idEleicao}/apuracao`);
  }

  getResultado(idEleicao: number): Observable<ResultadoApuracao> {
    return this.http.get<ResultadoApuracao>(`${this.url}${idEleicao}/resultado`);
  }

  downloadRelatorioVotos(idEleicao: number, arquivo: string) {
    return this.http.get(`${this.url}${idEleicao}/relatorios/votos`, { responseType: 'arraybuffer' })
      .pipe(downloadArquivo('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', arquivo));
  }

  downloadRelatorioInscricoes(idEleicao: number, arquivo: string) {
    return this.http.get(`${this.url}${idEleicao}/relatorios/inscricoes`, { responseType: 'arraybuffer' })
      .pipe(downloadArquivo('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', arquivo));
  }

  // Arquivos
  getArquivos(idEleicao: number, idEtapa: number): Observable<Arquivo[]> {
    return this.http.get<Arquivo[]>(`${this.url}${idEleicao}/cronograma/${idEtapa}/arquivos`);
  }

  uploadArquivos(idEleicao: number, idEtapa: number, files: FileList): Observable<HttpEvent<{}>> {
    const formData: FormData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append(`file${i}`, files[i]);
    }

    const req = new HttpRequest('POST', `${this.url}${idEleicao}/cronograma/${idEtapa}/arquivos`, formData);
    return this.http.request(req);
  }

}

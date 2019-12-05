import { Injectable } from '@angular/core';
import { GenericApi } from './generic-api';
import { Importacao, ProgressoImportacao } from '@shared/models/importacao';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/environments/endpoints';
import { HttpClient } from '@angular/common/http';
import { SignalRService } from '../services/signalr.service';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { debounceTime, map } from 'rxjs/operators';
import { Inconsistencia } from '@shared/models/inconsistencias';

@Injectable({
  providedIn: 'root'
})
export class ImportacoesApiService extends GenericApi<Importacao>  {

  constructor(
    private http: HttpClient,
    private signalRService: SignalRService,
    private authService: AuthService) {
    super(http, environment.api + endpoints.importacoes);
    this.signalRService.startConnection(environment.api + endpoints.signalr, this.authService.token);
  }

  public getUltimaImportacao(idEleicao: number): Observable<Importacao> {
    return this.http.get<Importacao>(`${this.url}${idEleicao}/ultima`);
  }

  public getInconsistencias(id: number): Observable<Inconsistencia> {
    return this.http.get<Inconsistencia>(`${this.url}${id}/inconsistencias`);
  }

  public progressoImportacao(): Observable<ProgressoImportacao> {
    return this.signalRService.on('progressoimportacao').pipe(map(progress => {
      progress.progresso *= 100;
      return progress;
    }));
  }
}

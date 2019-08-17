import { Injectable } from '@angular/core';
import { GenericApi } from './generic-api';
import { Importacao, ProgressoImportacao } from 'src/app/shared/models/importacao';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/environments/endpoints';
import { HttpClient } from '@angular/common/http';
import { SignalRService } from '../services/signalr.service';
import { Subject, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

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

  public progressoImportacao(): Observable<ProgressoImportacao> {
    return this.signalRService.on('progressoimportacao');
  }
}

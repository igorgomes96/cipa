import { Injectable } from '@angular/core';
import { GenericApi } from './generic-api';
import { EtapaCronograma } from '../../shared/models/cronograma';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/environments/endpoints';
import { Observable } from 'rxjs';
import { Arquivo } from '../../shared/models/arquivo';

@Injectable({
  providedIn: 'root'
})
export class CronogramaApiService extends GenericApi<EtapaCronograma> {

  constructor(private http: HttpClient) {
    super(http, environment.api + endpoints.arquivos);
  }

  getTemplates(idEtapa: number): Observable<Arquivo[]> {
    return this.http.get<Arquivo[]>(`${this.url}`);
    // return this.http.get<Arquivo[]>(`${this.url}/${idEtapa}/templates`);
  }
}

import { Injectable } from '@angular/core';
import { GenericApi } from './generic-api';
import { EtapaObrigatoria } from '@shared/models/cronograma';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/environments/endpoints';
import { Observable } from 'rxjs';
import { Arquivo } from '@shared/models/arquivo';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EtapasObrigatoriasApiService extends GenericApi<EtapaObrigatoria> {

  constructor(private http: HttpClient) {
    super(http, environment.api + endpoints.etapasObrigatorias);
  }

  getTemplates(idEtapa: number): Observable<Arquivo[]> {
    return this.http.get<Arquivo[]>(`${this.url}${idEtapa}/templates`).pipe(take(1));
  }

}

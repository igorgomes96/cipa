import { Injectable } from '@angular/core';
import { GenericApi } from './generic-api';
import { EtapaCronograma } from '../../shared/models/cronograma';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/environments/endpoints';
import { Observable } from 'rxjs';
import { Arquivo } from '../../shared/models/arquivo';

@Injectable({
  providedIn: 'root'
})
export class CronogramaApiService extends GenericApi<EtapaCronograma> {

  constructor(private http: HttpClient) {
    super(http, environment.api + endpoints.cronograma);
  }

  getTemplates(idEtapa: number): Observable<Arquivo[]> {
    return this.http.get<Arquivo[]>(`${this.url}`);
    // return this.http.get<Arquivo[]>(`${this.url}${idEtapa}/templates`);
  }

  getArquivos(idEtapa: number): Observable<Arquivo[]> {
    return this.http.get<Arquivo[]>(`${this.url}${idEtapa}/arquivos`);
  }

  uploadArquivos(idEtapa: number, files: FileList): Observable<HttpEvent<{}>> {
    const formData: FormData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append(`file${i}`, files[i]);
    }

    const req = new HttpRequest('POST', `${this.url}${idEtapa}/arquivos`, formData);
    return this.http.request(req);
  }

}

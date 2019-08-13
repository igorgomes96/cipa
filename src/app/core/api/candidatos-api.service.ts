import { ArquivosApiService } from './arquivos-api.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';

import { GenericApi } from './generic-api';
import { environment } from 'src/environments/environment';
import { Candidato, Reprovacao } from '../../shared/models/candidato';
import { endpoints } from 'src/environments/endpoints';
import { Observable, of, bindCallback } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CandidatosApiService extends GenericApi<Candidato> {

  constructor(private http: HttpClient,
    private arquivosApiService: ArquivosApiService) {
    super(http, environment.api + endpoints.candidatos);
  }

  postAprovar(id: number): Observable<Candidato> {
    return this.get(id);
    // return this.http.post<Candidato>(`${this.url}${id}/aprovar`, null);
  }

  postReprovar(id: number, reprovacao: Reprovacao): Observable<Reprovacao> {
    return of(reprovacao);
    // return this.http.post<Reprovacao>(`${this.url}${id}/reprovar`, reprovacao);
  }

  getFoto(id: number): Observable<any> {
    const readFoto = (foto: Blob) => {
      return new Promise(resolve => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(foto);
        fileReader.onload = ($loaded) => {
          resolve($loaded.target['result']);
        };
      });
    };

    return this.http.get(`${this.url}${id}/foto`, { headers: { 'Content-Type': 'image/jpeg' }, responseType: 'blob' })
      .pipe(switchMap((foto) => readFoto(foto)));
  }

  postFoto(id: number, foto: FileList): Observable<HttpEvent<{}>> {
    return this.arquivosApiService.uploadFiles(`${this.url}${id}/foto`, foto);
  }

}

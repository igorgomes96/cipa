import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GenericApi } from './generic-api';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/environments/endpoints';
import { Grupo } from 'src/app/shared/models/grupo';

@Injectable({
  providedIn: 'root'
})
export class GruposApiService extends GenericApi<Grupo> {

  constructor(private http: HttpClient) {
    super(http, environment.api + endpoints.grupos);
    }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GenericApi } from './generic-api';
import { Eleicao } from '../models/eleicao';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/environments/endpoints';
import { Eleitor } from '../models/eleitor';

@Injectable({
  providedIn: 'root'
})
export class EleitoresApiService extends GenericApi<Eleitor> {

  constructor(private http: HttpClient) {
    super(http, environment.api + endpoints.eleitores);
  }


}

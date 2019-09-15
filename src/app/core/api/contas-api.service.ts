import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GenericApi } from './generic-api';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/environments/endpoints';
import { Empresa } from '../../shared/models/empresa';
import { AuthInfo } from 'src/app/shared/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ContasApiService extends GenericApi<AuthInfo> {

  constructor(private http: HttpClient) {
    super(http, environment.api + endpoints.contas);
    }

}

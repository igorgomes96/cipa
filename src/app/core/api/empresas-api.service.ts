import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GenericApi } from './generic-api';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/environments/endpoints';
import { Empresa } from '@shared/models/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresasApiService extends GenericApi<Empresa> {

  constructor(private http: HttpClient) {
    super(http, environment.api + endpoints.empresas);
    }

}

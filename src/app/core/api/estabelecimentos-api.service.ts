import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GenericApi } from './generic-api';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/environments/endpoints';
import { Estabelecimento } from '../models/estabelecimento';

@Injectable({
    providedIn: 'root'
})
export class EstabelecimentosApiService extends GenericApi<Estabelecimento> {

    constructor(private http: HttpClient) {
        super(http, environment.api + endpoints.estabelecimentos);
    }

}

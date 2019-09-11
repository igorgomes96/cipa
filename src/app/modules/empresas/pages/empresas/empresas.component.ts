import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/shared/models/empresa';
import { EmpresasApiService } from 'src/app/core/api/empresas-api.service';
import { filter, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  empresas: Empresa[];
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .pipe(
        filter(routeData => routeData.hasOwnProperty('empresas')),
        map(routeData => routeData.empresas)
      ).subscribe(empresas => {
        this.empresas = empresas;
      });
  }

}

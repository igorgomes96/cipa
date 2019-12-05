import { Component, OnInit } from '@angular/core';
import { Inconsistencia } from '@shared/models/inconsistencias';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-inconsistencias',
  templateUrl: './inconsistencias.component.html',
  styleUrls: ['./inconsistencias.component.css']
})
export class InconsistenciasComponent implements OnInit {

  inconsistencias: Inconsistencia[];
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data
      .pipe(
        filter(routeData => routeData.hasOwnProperty('inconsistencias')),
        map(routeData => routeData.inconsistencias)
      ).subscribe((inconsistencias: Inconsistencia[]) => {
        this.inconsistencias = inconsistencias;
      });
  }

}

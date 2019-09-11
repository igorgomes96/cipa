import { Component, OnInit } from '@angular/core';
import { Estabelecimento } from 'src/app/shared/models/estabelecimento';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-estabelecimentos',
  templateUrl: './estabelecimentos.component.html',
  styleUrls: ['./estabelecimentos.component.css']
})
export class EstabelecimentosComponent implements OnInit {

  estabelecimentos: Estabelecimento[];
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .pipe(
        filter(routeData => routeData.hasOwnProperty('estabelecimentos')),
        map(routeData => routeData.estabelecimentos)
      ).subscribe(estabelecimentos => {
        this.estabelecimentos = estabelecimentos;
      });
  }

}

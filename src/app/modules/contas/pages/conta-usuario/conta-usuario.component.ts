import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Conta } from 'src/app/shared/models/usuario';

@Component({
  selector: 'app-conta-usuario',
  templateUrl: './conta-usuario.component.html',
  styleUrls: ['./conta-usuario.component.css']
})
export class ContaUsuarioComponent implements OnInit {

  conta: Conta;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .pipe(
        filter(routeData => routeData.hasOwnProperty('conta')),
        map(routeData => routeData.conta)
      ).subscribe(conta => {
        this.conta = conta;
      });
  }


}

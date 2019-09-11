import { Estabelecimento } from 'src/app/shared/models/estabelecimento';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-estabelecimentos-lista',
  templateUrl: './estabelecimentos-lista.component.html',
  styleUrls: ['./estabelecimentos-lista.component.css']
})
export class EstabelecimentosListaComponent implements OnInit {

  @Input() estabelecimentos: Estabelecimento[];
  constructor() { }

  ngOnInit() {
  }

}

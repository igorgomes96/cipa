import { Component, OnInit, Input } from '@angular/core';
import { Empresa } from 'src/app/shared/models/empresa';

@Component({
  selector: 'app-empresas-lista',
  templateUrl: './empresas-lista.component.html',
  styleUrls: ['./empresas-lista.component.css']
})
export class EmpresasListaComponent implements OnInit {

  @Input() empresas: Empresa[];
  constructor() { }

  ngOnInit() {
  }

}

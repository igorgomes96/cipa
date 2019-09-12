import { Component, OnInit, Input } from '@angular/core';
import { Reprovacao } from 'src/app/shared/models/candidato';

@Component({
  selector: 'app-reprovacoes-lista',
  templateUrl: './reprovacoes-lista.component.html',
  styleUrls: ['./reprovacoes-lista.component.css']
})
export class ReprovacoesListaComponent implements OnInit {

  @Input() reprovacoes: Reprovacao[];
  constructor() { }

  ngOnInit() {
  }

}

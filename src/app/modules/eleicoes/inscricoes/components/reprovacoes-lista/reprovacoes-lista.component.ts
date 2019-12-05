import { Component, OnInit, Input } from '@angular/core';
import { Reprovacao } from '@shared/models/inscricao';

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

import { Component, OnInit, Input } from '@angular/core';
import { ResultadoApuracao, Apuracao, Resultado } from 'src/app/shared/models/apuracao';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-relacao-candidatos',
  templateUrl: './relacao-candidatos.component.html',
  styleUrls: ['./relacao-candidatos.component.css']
})
export class RelacaoCandidatosComponent implements OnInit {

  @Input() resultado: ResultadoApuracao;
  constructor() { }

  ngOnInit() {
  }

  get candidatos(): Apuracao[] {
    return !this.resultado ? [] : this.resultado.efetivos.concat(this.resultado.suplentes).concat(this.resultado.naoEleitos);
  }

  resultadoClass(candidato: Apuracao): string {
    switch (candidato.resultadoApuracao) {
      case Resultado.Efetivo:
        return 'label-primary';
      case Resultado.Suplente:
        return 'label-success';
      case Resultado.NaoEleito:
        return 'label-danger';
      default:
        return '';
    }
  }

}

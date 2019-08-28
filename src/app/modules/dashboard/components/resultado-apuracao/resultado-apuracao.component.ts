import { CandidatosApiService } from './../../../../core/api/candidatos-api.service';
import { Apuracao } from './../../../../shared/models/apuracao';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-resultado-apuracao',
  templateUrl: './resultado-apuracao.component.html',
  styleUrls: ['./resultado-apuracao.component.css']
})
export class ResultadoApuracaoComponent implements OnInit {

  @Input() apuracao: Apuracao[];

  constructor(private candidatosApi: CandidatosApiService) { }

  ngOnInit() {
    this.apuracao.filter(a => a.candidatoId).forEach(a => {
      this.candidatosApi.getFoto(a.candidatoId)
        .subscribe(foto => a.foto = foto);
    });
  }

}

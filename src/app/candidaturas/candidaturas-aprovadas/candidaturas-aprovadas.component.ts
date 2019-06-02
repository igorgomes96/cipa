import { Component, OnInit } from '@angular/core';
import { CandidatosApiService } from 'src/app/core/api/candidatos-api.service';
import { Candidato } from 'src/app/core/models/candidato';
import { TipoCardEleitor } from 'src/app/shared/components/card-candidato/card-candidato.component';

@Component({
  selector: 'app-candidaturas-aprovadas',
  templateUrl: './candidaturas-aprovadas.component.html',
  styleUrls: ['./candidaturas-aprovadas.component.css']
})
export class CandidaturasAprovadasComponent implements OnInit {

  TipoCardEleitor: typeof TipoCardEleitor = TipoCardEleitor;
  candidatos: Candidato[];
  constructor(private candidatosApi: CandidatosApiService) { }

  ngOnInit() {
    this.candidatosApi.getAll()
    .subscribe((candidatos: Candidato[]) => {
      this.candidatos = candidatos;
    });
  }

}

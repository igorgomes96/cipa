import { Component, OnInit } from '@angular/core';
import { TipoCardEleitor } from 'src/app/shared/components/card-candidato/card-candidato.component';
import { Candidato } from 'src/app/shared/models/candidato';
import { CandidatosApiService } from 'src/app/core/api/candidatos-api.service';

@Component({
  selector: 'app-candidaturas-reprovadas',
  templateUrl: './candidaturas-reprovadas.component.html',
  styleUrls: ['./candidaturas-reprovadas.component.css']
})
export class CandidaturasReprovadasComponent implements OnInit {

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

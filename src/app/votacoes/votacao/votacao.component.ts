import { Component, OnInit } from '@angular/core';
import { TipoCardEleitor } from 'src/app/shared/components/card-candidato/card-candidato.component';
import { CandidatosApiService } from 'src/app/core/api/candidatos-api.service';
import { Candidato } from 'src/app/core/models/candidato';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-votacao',
  templateUrl: './votacao.component.html',
  styleUrls: ['./votacao.component.css']
})
export class VotacaoComponent implements OnInit {

  formPesquisa: FormGroup;
  TipoCardEleitor: typeof TipoCardEleitor = TipoCardEleitor;
  candidatos: Candidato[];
  constructor(private candidatosApi: CandidatosApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.candidatosApi.getAll()
    .subscribe((candidatos: Candidato[]) => {
      this.candidatos = candidatos;
    });

    this.formPesquisa = this.formBuilder.group({
      pesquisa: ['']
    });
  }

}

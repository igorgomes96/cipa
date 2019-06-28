import { Component, OnInit } from '@angular/core';
import { Candidato } from 'src/app/shared/models/candidato';
import { Eleitor } from 'src/app/shared/models/eleitor';

@Component({
  selector: 'app-candidaturas-form',
  templateUrl: './candidaturas-form.component.html',
  styleUrls: ['./candidaturas-form.component.css']
})
export class CandidaturasFormComponent implements OnInit {

  candidato: Candidato;
  horario = new Date();
  constructor() { }

  ngOnInit() {
    this.candidato = new Candidato();
    this.candidato.objetivos = 'Auxiliar a prevenir acidentes na empresa.';
    this.candidato.eleitor = new Eleitor();
    this.candidato.eleitor.nome = 'Igor Aparecido Gomes de Oliveira';
    this.candidato.eleitor.matricula = '43434';
    this.candidato.eleitor.email = 'igorgomes96@hotmail.com';
    this.candidato.eleitor.area = 'Fábrica de Software';
    this.candidato.eleitor.cargo = 'Desenvolvedor de Software';
    this.candidato.eleitor.dataAdmissao = new Date(2018, 1, 1);
    this.candidato.eleitor.dataNascimento = new Date(1996, 2, 19);
  }

}

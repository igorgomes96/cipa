import { Component, OnInit, Input } from '@angular/core';
import { Conta } from 'src/app/shared/models/usuario';

@Component({
  selector: 'app-conta-info',
  templateUrl: './conta-info.component.html',
  styleUrls: ['./conta-info.component.css']
})
export class ContaInfoComponent implements OnInit {

  @Input() conta: Conta;
  constructor() { }

  ngOnInit() {
  }

  get statusContaClass(): string {
    return this.conta.ativa ? 'label-primary' : 'label-danger';
  }

  get statusConta(): string {
    return this.conta.ativa ? 'Ativa' : 'Inativa';
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Conta } from '@shared/models/usuario';

@Component({
  selector: 'app-card-conta',
  templateUrl: './card-conta.component.html',
  styleUrls: ['./card-conta.component.css']
})
export class CardContaComponent implements OnInit {

  @Input() conta: Conta;
  @Output() acessar = new EventEmitter<Conta>();
  constructor() { }

  ngOnInit() {
  }

  onAcessar() {
    this.acessar.emit(this.conta);
  }

}

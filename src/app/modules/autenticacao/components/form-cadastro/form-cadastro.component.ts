import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/shared/models/usuario';

@Component({
  selector: 'app-form-cadastro',
  templateUrl: './form-cadastro.component.html',
  styleUrls: ['./form-cadastro.component.css']
})
export class FormCadastroComponent implements OnInit {

  @Input() titulo = '';
  @Input() descricao = '';
  @Input() botaoSalvar = '';
  @Input() usuario: Usuario;
  @Output() enviar = new EventEmitter<Usuario>();

  constructor() { }

  ngOnInit() {
    if (!this.usuario) {
      this.usuario = new Usuario();
    }
  }

  enviarUsuario() {
    this.enviar.emit(this.usuario);
  }

}

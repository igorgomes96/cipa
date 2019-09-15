import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/shared/models/usuario';

@Component({
  selector: 'app-usuario-edicao',
  templateUrl: './usuario-edicao.component.html',
  styleUrls: ['./usuario-edicao.component.css']
})
export class UsuarioEdicaoComponent implements OnInit {

  usuario: Usuario;
  constructor() { }

  ngOnInit() {
    this.usuario = new Usuario();
    this.usuario.id = 1;
    this.usuario.email = 'Testando';
    this.usuario.nome = 'Igor';

  }

}

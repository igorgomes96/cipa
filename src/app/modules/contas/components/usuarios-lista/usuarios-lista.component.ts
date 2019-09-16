import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Usuario } from 'src/app/shared/models/usuario';

@Component({
  selector: 'app-usuarios-lista',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.css']
})
export class UsuariosListaComponent implements OnInit {

  @Input() usuarios: Usuario[];
  @Output() excluir = new EventEmitter<Usuario>();

  constructor() { }

  ngOnInit() {
  }

  exclui(usuario: Usuario) {
    this.excluir.emit(usuario);
  }

}

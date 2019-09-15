import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from 'src/app/shared/models/usuario';

@Component({
  selector: 'app-usuarios-lista',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.css']
})
export class UsuariosListaComponent implements OnInit {

  @Input() usuarios: Usuario[];
  constructor() { }

  ngOnInit() {
  }

  exclui(usuario: Usuario) {

  }

}

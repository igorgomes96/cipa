import { Component, OnInit } from '@angular/core';
import { UsuariosApiService } from '@core/api/usuarios-api.service';
import { Usuario } from '@shared/models/usuario';
import { Router } from '@angular/router';

@Component({
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.css']
})
export class AdministradoresComponent implements OnInit {

  usuarios: Usuario[];
  constructor(
    private usuariosApi: UsuariosApiService,
    private router: Router) { }

  ngOnInit() {
    this.usuariosApi.getUsuariosAdministradores()
      .subscribe(usuarios => this.usuarios = usuarios);
  }

  editar(usuario: Usuario) {
    this.router.navigate(['contas', 'administradores', 'usuarios', usuario.id]);
  }

}

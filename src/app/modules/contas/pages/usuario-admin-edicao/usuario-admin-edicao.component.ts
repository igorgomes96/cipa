import { Component, OnInit } from '@angular/core';
import { Usuario } from '@shared/models/usuario';
import { ActivatedRoute } from '@angular/router';
import { UsuariosApiService } from '@core/api/usuarios-api.service';
import { ToastsService } from '@core/services/toasts.service';
import { filter, map } from 'rxjs/operators';
import { ToastType } from '@core/components/toasts/toasts.component';
import { Location } from '@angular/common';

@Component({
  templateUrl: './usuario-admin-edicao.component.html',
  styleUrls: ['./usuario-admin-edicao.component.css']
})
export class UsuarioAdminEdicaoComponent implements OnInit {

  usuario: Usuario;
  constructor(
    private route: ActivatedRoute,
    private usuariosApi: UsuariosApiService,
    private toast: ToastsService,
    private location: Location) { }

  ngOnInit() {
    this.route.data
      .pipe(
        filter(routeData => routeData.hasOwnProperty('usuario')),
        map(routeData => routeData.usuario)
      ).subscribe(usuario => {
        this.usuario = usuario;
      });
  }

  salvar(usuario: Usuario) {
    this.usuariosApi.putUsuarioAdministrador(usuario.id, usuario)
      .subscribe(_ => {
        this.toast.showMessage({
          message: 'Usuário atualizado com sucesso!',
          title: 'Sucesso!',
          type: ToastType.success
        });
        this.location.back();
      });
  }
}

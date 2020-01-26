import { Component, OnInit } from '@angular/core';
import { UsuariosApiService } from '@core/api/usuarios-api.service';
import { ToastsService } from '@core/services/toasts.service';
import { Usuario } from '@shared/models/usuario';
import { ToastType } from '@core/components/toasts/toasts.component';
import { Location } from '@angular/common';

@Component({
  templateUrl: './usuario-admin-novo.component.html',
  styleUrls: ['./usuario-admin-novo.component.css']
})
export class UsuarioAdminNovoComponent implements OnInit {

  constructor(
    private usuariosApi: UsuariosApiService,
    private toast: ToastsService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  salvar(usuario: Usuario) {
    this.usuariosApi.postUsuarioAdministrador(usuario)
      .subscribe(_ => {
        this.toast.showMessage({
          message: 'Usuário criado com sucesso!',
          title: 'Sucesso!',
          type: ToastType.success
        });
        this.location.back();
      });
  }

}

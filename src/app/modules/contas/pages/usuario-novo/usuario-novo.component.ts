import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/shared/models/usuario';
import { UsuariosApiService } from 'src/app/core/api/usuarios-api.service';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/core/components/toasts/toasts.component';

@Component({
  selector: 'app-usuario-novo',
  templateUrl: './usuario-novo.component.html',
  styleUrls: ['./usuario-novo.component.css']
})
export class UsuarioNovoComponent implements OnInit {

  constructor(
    private usuariosApi: UsuariosApiService,
    private toast: ToastsService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  salvar(usuario: Usuario) {
    this.usuariosApi.post(usuario)
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

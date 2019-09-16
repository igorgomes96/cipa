import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/shared/models/usuario';
import { filter, map, tap } from 'rxjs/operators';
import { UsuariosApiService } from 'src/app/core/api/usuarios-api.service';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/shared/components/toasts/toasts.component';

@Component({
  selector: 'app-usuario-edicao',
  templateUrl: './usuario-edicao.component.html',
  styleUrls: ['./usuario-edicao.component.css']
})
export class UsuarioEdicaoComponent implements OnInit {

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
    this.usuariosApi.put(usuario.id, usuario)
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

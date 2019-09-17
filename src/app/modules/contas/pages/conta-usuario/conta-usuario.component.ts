import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { filter, map, switchMap } from 'rxjs/operators';
import { Conta, Usuario } from 'src/app/shared/models/usuario';
import { UsuariosApiService } from 'src/app/core/api/usuarios-api.service';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/shared/components/toasts/toasts.component';

@Component({
  selector: 'app-conta-usuario',
  templateUrl: './conta-usuario.component.html',
  styleUrls: ['./conta-usuario.component.css']
})
export class ContaUsuarioComponent implements OnInit {

  conta: Conta;
  constructor(
    private route: ActivatedRoute,
    private usuariosApi: UsuariosApiService,
    private toast: ToastsService) { }

  ngOnInit() {
    this.route.data
      .pipe(
        filter(routeData => routeData.hasOwnProperty('conta')),
        map(routeData => routeData.conta)
      ).subscribe(conta => {
        this.conta = conta;
      });
  }

  excluir(usuario: Usuario) {
    this.usuariosApi.delete(usuario.id)
      .pipe(
        switchMap(_ => this.usuariosApi.getAll())
      ).subscribe((usuarios: Usuario[]) => {
        this.toast.showMessage({
          message: 'Usuário excluído com sucesso!',
          title: 'Sucesso',
          type: ToastType.success
        });
        this.conta.usuarios = usuarios;
      });
  }


}

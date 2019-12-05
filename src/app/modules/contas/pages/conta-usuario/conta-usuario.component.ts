import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Conta, Usuario } from '@shared/models/usuario';
import { UsuariosApiService } from 'src/app/core/api/usuarios-api.service';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/core/components/toasts/toasts.component';
import { ContasApiService } from 'src/app/core/api/contas-api.service';
import { EtapaPadraoConta } from '@shared/models/cronograma';

@Component({
  selector: 'app-conta-usuario',
  templateUrl: './conta-usuario.component.html',
  styleUrls: ['./conta-usuario.component.css']
})
export class ContaUsuarioComponent implements OnInit {

  conta: Conta;
  cronograma: EtapaPadraoConta[];

  constructor(
    private route: ActivatedRoute,
    private usuariosApi: UsuariosApiService,
    private toast: ToastsService,
    private contasApi: ContasApiService) { }

  ngOnInit() {
    this.route.data
      .pipe(
        filter(routeData => routeData.hasOwnProperty('conta')),
        map(routeData => routeData.conta),
        tap(conta => this.conta = conta),
        switchMap(conta => this.contasApi.getCronogramaPadrao(conta.id))
      ).subscribe(cronograma => {
        this.cronograma = cronograma;
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

  recarregaCronograma() {
    this.contasApi.getCronogramaPadrao(this.conta.id)
      .subscribe(cronograma => {
        this.cronograma = cronograma;
      });
  }


}

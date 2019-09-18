import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/shared/models/usuario';
import { LoginApiService } from 'src/app/core/api/login-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { filter, map } from 'rxjs/operators';
import { ToastType } from 'src/app/core/components/toasts/toasts.component';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  usuario: Usuario;
  redirectTo = '/';
  codigoRecuperacao = '';

  constructor(
    private route: ActivatedRoute,
    private loginApi: LoginApiService,
    private authService: AuthService,
    private toast: ToastsService,
    private router: Router) { }

  ngOnInit() {
    this.route.data
      .pipe(
        filter(routeData => routeData.hasOwnProperty('usuario')),
        map(routeData => routeData.usuario)
      ).subscribe(usuario => {
        this.usuario = usuario;
      });

    this.route.params.subscribe(params => this.codigoRecuperacao = params.codigo);

    this.route.queryParamMap
      .pipe(
        filter(params => params.has('redirectTo'))
      ).subscribe(params => this.redirectTo = params.get('redirectTo'));
  }

  cadastrar(usuario: Usuario) {
    usuario.codigoRecuperacao = this.codigoRecuperacao;
    this.loginApi.resetSenha(usuario)
      .subscribe((conta: any) => {
        this.authService.token = conta.accessToken;
        this.toast.showMessage({
          message: 'Senha cadastrada com sucesso!',
          title: 'Sucesso!',
          type: ToastType.success
        });
        this.router.navigate([this.redirectTo]);
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Usuario } from 'src/app/shared/models/usuario';
import { LoginApiService } from 'src/app/core/api/login-api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/shared/components/toasts/toasts.component';

@Component({
  selector: 'app-reset-senha',
  templateUrl: './reset-senha.component.html',
  styleUrls: ['./reset-senha.component.css']
})
export class ResetSenhaComponent implements OnInit {

  usuario: Usuario;
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
  }

  resetar(usuario: Usuario) {
    this.loginApi.resetSenha(usuario)
      .subscribe((authInfo: any) => {
        this.authService.token = authInfo.accessToken;
        this.toast.showMessage({
          message: 'Senha alterada com Sucesso!',
          title: 'Sucesso!',
          type: ToastType.success
        });
        this.router.navigate(['/']);
      });
  }

}
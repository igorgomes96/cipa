import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Conta } from '@shared/models/usuario';
import { map, tap } from 'rxjs/operators';
import { LoginApiService } from '@core/api/login-api.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  templateUrl: './contas-lista.component.html',
  styleUrls: ['./contas-lista.component.css']
})
export class ContasListaComponent implements OnInit {

  contas: Conta[];
  constructor(
    private route: ActivatedRoute,
    private loginApi: LoginApiService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.pipe(map(data => data.contas)).subscribe(contas => this.contas = contas);
  }

  acessarConta(conta: Conta) {
    this.loginApi.postAlterarContaTokenAdministrador(conta.id)
      .subscribe((auth: any) => {
        this.authService.token = auth.accessToken;
        this.router.navigate(['/eleicoes']);
      });
  }

}

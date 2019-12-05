import { Component, OnInit } from '@angular/core';
import { Usuario } from '@shared/models/usuario';
import { LoginApiService } from 'src/app/core/api/login-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/core/components/toasts/toasts.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { finalize, filter } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loggingOn = false;
  redirectTo = '/';

  constructor(
    private loginService: LoginApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastsService,
    private authService: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
    this.route.queryParamMap
      .pipe(
        filter(params => params.has('redirectTo'))
      ).subscribe(params => this.redirectTo = params.get('redirectTo'));
  }

  login() {
    this.loggingOn = true;
    const usuario = this.form.value as Usuario;
    this.loginService.login(usuario)
      .pipe(finalize(() => this.loggingOn = false))
      .subscribe((conta: any) => {
        this.authService.token = conta.accessToken;
        this.toast.showMessage({
          message: 'Login realizado com Sucesso!',
          title: 'Sucesso!',
          type: ToastType.success
        });
        this.router.navigate([this.redirectTo]);
      });
  }

}

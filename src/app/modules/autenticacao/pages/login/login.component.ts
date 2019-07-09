import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/shared/models/usuario';
import { LoginApiService } from 'src/app/core/api/login-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/shared/components/toasts/toasts.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loggingOn = false;

  constructor(private loginService: LoginApiService,
              private formBuilder: FormBuilder,
              private router: Router,
              private toast: ToastsService,
              private authService: AuthService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  login() {
    this.loggingOn = true;
    const usuario = this.form.value as Usuario;
    this.loginService.login(usuario)
    .pipe(finalize(() => this.loggingOn = false))
    .subscribe((authInfo: any) => {
      this.authService.token = authInfo.accessToken;
      this.toast.showMessage({
        message: 'Login realizado com Sucesso!',
        title: 'Sucesso!',
        type: ToastType.success
      });
      this.router.navigate(['/eleicoes']);
    });
  }

}

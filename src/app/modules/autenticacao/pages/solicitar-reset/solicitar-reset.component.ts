import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginApiService } from 'src/app/core/api/login-api.service';
import { Router } from '@angular/router';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/core/components/toasts/toasts.component';

@Component({
  selector: 'app-solicitar-reset',
  templateUrl: './solicitar-reset.component.html',
  styleUrls: ['./solicitar-reset.component.css']
})
export class SolicitarResetComponent implements OnInit {

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private loginApi: LoginApiService,
    private router: Router,
    private toast: ToastsService) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, [Validators.email, Validators.required]]
    });
  }

  solicitarReset() {
    this.loginApi.resetarSenha(this.form.get('email').value)
    .subscribe(_ => {
      this.toast.showMessage({
        message: 'Enviamos para seu e-mail um link para reset da senha.',
        title: 'Sucesso',
        type: ToastType.success
      });
      this.router.navigate(['/autenticacao/login']);
    });
  }

}

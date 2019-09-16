import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/shared/models/usuario';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  @Input() usuario = new Usuario();
  @Output() salvar = new EventEmitter<Usuario>();
  @Output() cancelar = new EventEmitter<void>();

  form: FormGroup;
  constructor(private fb: FormBuilder, private location: Location) { }

  ngOnInit() {
    this.form = this.fb.group({
      id: [{ value: this.usuario.id, disabled: true }],
      nome: [this.usuario.nome, [Validators.required, Validators.maxLength(255)]],
      email: [this.usuario.email, [Validators.required, Validators.email, Validators.maxLength(100)]]
    });
  }

  cancelarEdicao() {
    this.location.back();
    this.cancelar.emit();
  }

  salvarUsuario() {
    this.salvar.emit(this.form.getRawValue());
  }

}

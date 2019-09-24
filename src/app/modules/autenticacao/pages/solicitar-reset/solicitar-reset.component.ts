import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-solicitar-reset',
  templateUrl: './solicitar-reset.component.html',
  styleUrls: ['./solicitar-reset.component.css']
})
export class SolicitarResetComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, [Validators.email, Validators.required]]
    });
  }

  solicitarReset() {

  }

}

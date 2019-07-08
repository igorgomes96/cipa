import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

import { Observable } from 'rxjs';

import { Eleitor } from 'src/app/shared/models/eleitor';
import { EleitoresApiService } from 'src/app/core/api/eleitores-api.service';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/shared/components/toasts/toasts.component';

@Component({
  selector: 'app-eleitores-form',
  templateUrl: './eleitores-form.component.html',
  styleUrls: ['./eleitores-form.component.css']
})
export class EleitoresFormComponent implements OnInit {

  @Input() eleitor: Eleitor;
  @Output() salvar = new EventEmitter<Eleitor>();
  @Output() cancelar = new EventEmitter<void>();

  constructor(private route: ActivatedRoute,
              private eleitoresApi: EleitoresApiService,
              private toasts: ToastsService,
              private location: Location) { }

  ngOnInit() {
    this.eleitor = new Eleitor();
  }

  reset() {
    this.cancelar.emit();
  }

  submit() {
    this.salvar.emit(this.eleitor);
  }


}

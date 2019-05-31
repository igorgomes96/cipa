import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

import { Observable } from 'rxjs';

import { Eleitor } from 'src/app/core/models/eleitor';
import { EleitoresApiService } from 'src/app/core/api/eleitores-api.service';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/shared/components/toasts/toasts.component';

@Component({
  selector: 'app-eleitores-form',
  templateUrl: './eleitores-form.component.html',
  styleUrls: ['./eleitores-form.component.css']
})
export class EleitoresFormComponent implements OnInit {

  eleitor: Eleitor;
  constructor(private route: ActivatedRoute,
    private eleitoresApi: EleitoresApiService,
    private toasts: ToastsService,
    private location: Location) { }

  ngOnInit() {
    this.eleitor = new Eleitor();
    this.route.data
      .subscribe((routeData: any) => {
        if (routeData.hasOwnProperty('eleitor')) {
          this.eleitor = routeData.eleitor;
        }
      });
  }

  salvar() {
    let call: Observable<Eleitor | void>;
    if (this.eleitor.id) {
      call = this.eleitoresApi.put(this.eleitor.id, this.eleitor);
    } else {
      call = this.eleitoresApi.post(this.eleitor);
    }

    call.subscribe(_ => {
      this.toasts.showMessage({
        message: 'Eleitor salvo com sucesso!',
        title: 'Sucesso!',
        type: ToastType.success
      });
      this.location.back();
    });
  }


}

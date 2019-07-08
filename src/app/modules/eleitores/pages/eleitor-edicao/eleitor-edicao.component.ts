import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Eleitor } from 'src/app/shared/models/eleitor';
import { EleitoresApiService } from 'src/app/core/api/eleitores-api.service';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/shared/components/toasts/toasts.component';

@Component({
  selector: 'app-eleitor-edicao',
  templateUrl: './eleitor-edicao.component.html',
  styleUrls: ['./eleitor-edicao.component.css']
})
export class EleitorEdicaoComponent implements OnInit {

  eleitor: Eleitor;
  constructor(private route: ActivatedRoute,
              private eleitoresApi: EleitoresApiService,
              private toasts: ToastsService,
              private location: Location) { }

  ngOnInit() {
    this.route.data.subscribe((routeData: any) => {
      if (routeData.hasOwnProperty('eleitor')) {
        this.eleitor = routeData.eleitor;
      }
    });
  }


  salvar(eleitor: Eleitor) {
    this.eleitoresApi.put(eleitor.id, eleitor).subscribe(_ => {
      this.toasts.showMessage({
        message: 'Eleitor salvo com sucesso!',
        title: 'Sucesso!',
        type: ToastType.success
      });
      this.location.back();
    });
  }

  cancelar() {
    this.location.back();
  }

}

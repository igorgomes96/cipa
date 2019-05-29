import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Eleicao } from 'src/app/core/models/eleicao';

@Component({
  selector: 'app-eleicoes-form',
  templateUrl: './eleicoes-form.component.html',
  styleUrls: ['./eleicoes-form.component.css']
})
export class EleicoesFormComponent implements OnInit {

  eleicao: Eleicao;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .subscribe((routeData: any) => {
        if (routeData.hasOwnProperty('eleicao')) {
          this.eleicao = routeData.eleicao;
        }
      });
  }

}

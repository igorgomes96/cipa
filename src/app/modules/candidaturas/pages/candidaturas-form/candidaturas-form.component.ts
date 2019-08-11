import { EleicoesApiService } from './../../../../core/api/eleicoes-api.service';
import { element } from 'protractor';
import { ActivatedRoute } from '@angular/router';
import { CandidatosApiService } from 'src/app/core/api/candidatos-api.service';
import { Component, OnInit } from '@angular/core';
import { Candidato } from 'src/app/shared/models/candidato';
import { Eleitor } from 'src/app/shared/models/eleitor';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/shared/components/toasts/toasts.component';
import { uploadProgress, filterResponse } from 'src/app/shared/components/rxjs-operators';
import { switchMap, filter } from 'rxjs/operators';
import { Eleicao } from 'src/app/shared/models/eleicao';

@Component({
  selector: 'app-candidaturas-form',
  templateUrl: './candidaturas-form.component.html',
  styleUrls: ['./candidaturas-form.component.css']
})
export class CandidaturasFormComponent implements OnInit {

  candidato: Candidato;
  horario = new Date();
  fileList: FileList = null;
  foto: string;
  eleicao: Eleicao;
  constructor(private toasts: ToastsService,
    private candidatosApi: CandidatosApiService,
    private route: ActivatedRoute,
    private eleicoesApi: EleicoesApiService) { }

  ngOnInit() {
    this.candidato = new Candidato();
    this.route.data
      .pipe(
        filter(routeData => routeData.hasOwnProperty('eleicao')),
        switchMap(routeData => {
          this.eleicao = routeData.eleicao;
          return this.eleicoesApi.getCandidato(routeData.eleicao.id);
        })
      ).subscribe(candidato => {
        if (candidato) {
          this.candidato = candidato;
          this.candidatosApi.getFoto(this.candidato.id)
            .subscribe(foto => {
              this.foto = "data:image;base64," + foto;
              // const fileReader = new FileReader();
              // fileReader.readAsDataURL(foto);
              // fileReader.onload = ($loaded) => {
              //   this.foto = $loaded.target['result'];
              // };
            });
        } else {
          this.eleicoesApi.getEleitor(this.eleicao.id)
            .subscribe((eleitor) => {
              this.candidato.eleitor = eleitor;
              this.candidato.eleitorId = eleitor.id;
            });
        }
      });
    // this.candidato = new Candidato();
    // this.candidato.eleitorId = 1;
    // this.candidato.objetivos = 'Auxiliar a prevenir acidentes na empresa.';
    // this.candidato.eleitor = new Eleitor();
    // this.candidato.eleitor.nome = 'Igor Aparecido Gomes de Oliveira';
    // this.candidato.eleitor.matricula = '43434';
    // this.candidato.eleitor.email = 'igorgomes96@hotmail.com';
    // this.candidato.eleitor.area = 'Fábrica de Software';
    // this.candidato.eleitor.cargo = 'Desenvolvedor de Software';
    // this.candidato.eleitor.dataAdmissao = new Date(2018, 1, 1);
    // this.candidato.eleitor.dataNascimento = new Date(1996, 2, 19);
  }

  // tslint:disable: no-string-literal
  onUploadImage($event: Event) {
    const files = $event.target['files'];
    if (!files || !files.length) {
      return;
    }
    if (files.length > 1) {
      this.toasts.showMessage({
        message: 'Você só pode carregar uma foto!',
        title: 'Inválido!',
        type: ToastType.error
      });
      return;
    }
    this.fileList = files;
    const file = $event.target['files'][0];
    this.readFoto(file);
  }

  readFoto(file) {
    const fileReader = new FileReader();
    if (/^image\/\w+$/.test(file.type)) {
      fileReader.readAsDataURL(file);
      fileReader.onload = ($loaded) => {
        this.foto = $loaded.target['result'];
      };
    } else {
      this.toasts.showMessage({
        message: 'Imagem em formato inválido!',
        title: 'Inválido!',
        type: ToastType.error
      });
    }
  }

  confirmaCandidatura() {
    if (!this.fileList) {
      this.toasts.showMessage({
        message: 'Escolha uma foto para se candidatar!',
        title: 'Inválido!',
        type: ToastType.error
      });
      return;
    }
    this.candidatosApi.post(this.candidato)
      .pipe(
        switchMap((candidato: Candidato) => {
          return this.candidatosApi.postFoto(candidato.id, this.fileList);
        }),
        filterResponse()
      ).subscribe(_ => {
        this.toasts.showMessage({
          message: 'Inscrição realizada com sucesso!',
          title: 'Sucesso!',
          type: ToastType.success
        });
      });
  }

}

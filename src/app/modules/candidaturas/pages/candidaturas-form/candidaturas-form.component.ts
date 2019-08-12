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
import { runInThisContext } from 'vm';

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
  jaInscrito = false;
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
          this.jaInscrito = true;
          this.candidato = candidato;
          this.candidatosApi.getFoto(this.candidato.id)
            .subscribe((foto: Blob) => {
              const fileReader = new FileReader();
              fileReader.readAsDataURL(foto);
              fileReader.onload = ($loaded) => {
                this.foto = $loaded.target['result'];
              };
            });
        } else {
          this.eleicoesApi.getEleitor(this.eleicao.id)
            .subscribe((eleitor) => {
              this.candidato.eleitor = eleitor;
              this.candidato.eleitorId = eleitor.id;
            });
        }
      });
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
    try {
      this.readFoto(file);
      if (this.jaInscrito) {
        this.candidatosApi.postFoto(this.candidato.id, this.fileList)
          .pipe(filterResponse())
          .subscribe(_ => {
            this.toasts.showMessage({
              message: 'Foto atualizada com sucesso!',
              title: 'Sucesso!',
              type: ToastType.success
            });
          });
      }
    } catch (err) {
      console.error(err);
    }
  }

  readFoto(file: Blob) {
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
      throw new Error('Erro ao ler imagem');
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
        this.jaInscrito = true;
        this.toasts.showMessage({
          message: 'Inscrição realizada com sucesso!',
          title: 'Sucesso!',
          type: ToastType.success
        });
      });
  }

}

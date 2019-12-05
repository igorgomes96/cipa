import { EleicoesApiService } from '@core/api/eleicoes-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Inscricao, StatusAprovacao, Reprovacao } from '@shared/models/inscricao';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/core/components/toasts/toasts.component';
import { filterResponse } from '@shared/components/rxjs-operators';
import { switchMap, filter } from 'rxjs/operators';
import { Eleicao } from '@shared/models/eleicao';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-inscricoes-form',
  templateUrl: './inscricoes-form.component.html',
  styleUrls: ['./inscricoes-form.component.css']
})
export class InscricoesFormComponent implements OnInit {

  StatusAprovacao = StatusAprovacao;
  candidato: Inscricao;
  horario = new Date();
  fileList: FileList = null;
  foto: string;
  eleicao: Eleicao;
  jaInscrito = false;

  @ViewChild('reprovacoes', { static: false }) modalReprovacoes: TemplateRef<any>;

  constructor(
    private toasts: ToastsService,
    private route: ActivatedRoute,
    private eleicoesApi: EleicoesApiService,
    private modalService: ModalService,
    private router: Router) { }

  ngOnInit() {
    this.candidato = new Inscricao();
    this.route.data
      .pipe(
        filter(routeData => routeData.hasOwnProperty('eleicao')),
        switchMap(routeData => {
          this.eleicao = routeData.eleicao;
          return this.eleicoesApi.getInscricaoUsuario(routeData.eleicao.id);
        })
      ).subscribe(candidato => {
        if (candidato) {
          this.jaInscrito = true;
          this.candidato = candidato;
          // this.candidatosApi.getFoto(this.candidato.id)
          //   .subscribe((foto: string) => {
          //     this.foto = foto;
          //   });
        } else {
          this.eleicoesApi.getEleitorUsuario(this.eleicao.id)
            .subscribe((eleitor) => {
              this.candidato.eleitor = eleitor;
              this.candidato.eleitorId = eleitor.id;
            });
        }
      });
  }

  get confirmacaoButtonText(): string {
    if (!this.jaInscrito) {
      return 'Confirmar Inscrição';
    }
    if (this.candidato.statusAprovacao === StatusAprovacao.Pendente) {
      return 'Atualizar Inscrição';
    }
    if (this.candidato.statusAprovacao === StatusAprovacao.Reprovada) {
      return 'Submeter a Nova Aprovação';
    }
    return '';
  }

  get ultimaReprovacao(): Reprovacao {
    if (!this.candidato || !this.candidato.reprovacoes || !this.candidato.reprovacoes.length) {
      return null;
    }
    this.candidato.reprovacoes.sort((a, b) => {
      if (a.horario < b.horario) {
        return 1;
      }
      if (a.horario > b.horario) {
        return -1;
      }
      return 0;
    });
    return this.candidato.reprovacoes[0];
  }

  get statusAprovacaoClass(): string {
    if (!this.jaInscrito || !this.candidato) {
      return '';
    }
    const status = StatusAprovacao[this.candidato.statusAprovacao];
    switch (status) {
      case StatusAprovacao.Aprovada:
        return 'label-primary';
      case StatusAprovacao.Pendente:
        return 'label-warning';
      case StatusAprovacao.Reprovada:
        return 'label-danger';
      default:
        return '';
    }
  }

  get statusAprovacao(): string {
    if (!this.jaInscrito || !this.candidato) {
      return '';
    }
    const status = StatusAprovacao[this.candidato.statusAprovacao];
    switch (status) {
      case StatusAprovacao.Aprovada:
        return 'Aprovada';
      case StatusAprovacao.Pendente:
        return 'Pendente';
      case StatusAprovacao.Reprovada:
        return 'Reprovada';
      default:
        return '';
    }
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
    } catch (err) {
      console.error(err);
    }
  }

  readFoto(file: Blob) {
    const fileReader = new FileReader();
    if (/^image\/\w+$/.test(file.type)) {
      fileReader.readAsDataURL(file);
      fileReader.onload = ($loaded) => {
        this.foto = $loaded.target['result'] as string;
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
    // if (!this.foto && !this.fileList) {
    //   this.toasts.showMessage({
    //     message: 'Escolha uma foto para se candidatar!',
    //     title: 'Inválido!',
    //     type: ToastType.error
    //   });
    //   return;
    // }
    // let chamada: Observable<{}>;
    // if (this.jaInscrito) {
    //   chamada = this.candidatosApi.put(this.candidato.id, this.candidato) as Observable<Inscricao>;
    // } else {
    //   chamada = this.candidatosApi.post(this.candidato);
    // }
    // if (this.fileList) { // Alterou a foto
    //   chamada = chamada.pipe(
    //     switchMap((candidato: Inscricao) => {
    //       this.candidato = candidato;
    //       return this.candidatosApi.postFoto(candidato.id, this.fileList);
    //     }),
    //     filterResponse());
    // }

    // chamada.pipe(
    //   // switchMap(_ => {
    //   //   return this.candidatosApi.getFoto(this.candidato.id);
    //   // })
    // ).subscribe((foto: string) => {
    //   this.foto = foto;
    //   this.jaInscrito = true;
    //   if (this.jaInscrito) {
    //     this.toasts.showMessage({
    //       message: 'Inscrição atualizada com sucesso!',
    //       title: 'Sucesso!',
    //       type: ToastType.success
    //     });
    //   } else {
    //     this.toasts.showMessage({
    //       message: 'Inscrição realizada com sucesso!',
    //       title: 'Sucesso!',
    //       type: ToastType.success
    //     });
    //   }
    //   this.router.navigate(['/eleicoes']);
    // });
  }

  exibirReprovacoes() {
    this.modalService.showModal(this.modalReprovacoes, 'Histórico de reprovações');
  }

}

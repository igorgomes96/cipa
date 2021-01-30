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
  inscricao: Inscricao;
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
    this.inscricao = new Inscricao();
    this.route.data
      .pipe(
        filter(routeData => routeData.hasOwnProperty('eleicao')),
        switchMap(routeData => {
          this.eleicao = routeData.eleicao;
          return this.eleicoesApi.getInscricaoUsuario(routeData.eleicao.id);
        })
      ).subscribe(inscricao => {
        if (inscricao) {
          this.jaInscrito = true;
          this.inscricao = inscricao;
          this.foto = this.inscricao.foto;
          // this.eleicoesApi.getFotoInscrito(this.eleicao.id, this.inscricao.id)
          //   .subscribe((foto: string) => {
          //     this.foto = foto;
          //   });
        } else {
          this.eleicoesApi.getEleitorUsuario(this.eleicao.id)
            .subscribe((eleitor) => {
              this.inscricao.eleitor = eleitor;
              this.inscricao.eleitorId = eleitor.id;
            });
        }
      });
  }

  get confirmacaoButtonText(): string {
    if (!this.jaInscrito) {
      return 'Confirmar Inscrição';
    }
    if (this.inscricao.statusAprovacao === StatusAprovacao.Pendente) {
      return 'Atualizar Inscrição';
    }
    if (this.inscricao.statusAprovacao === StatusAprovacao.Reprovada) {
      return 'Submeter a Nova Aprovação';
    }
    return '';
  }

  get ultimaReprovacao(): Reprovacao {
    if (!this.inscricao || !this.inscricao.reprovacoes || !this.inscricao.reprovacoes.length) {
      return null;
    }
    this.inscricao.reprovacoes.sort((a, b) => {
      if (a.horario < b.horario) {
        return 1;
      }
      if (a.horario > b.horario) {
        return -1;
      }
      return 0;
    });
    return this.inscricao.reprovacoes[0];
  }

  get statusAprovacao(): { label: string, class: string } {
    if (!this.jaInscrito || !this.inscricao) {
      return { label: '', class: '' };
    }
    const status = StatusAprovacao[this.inscricao.statusAprovacao];
    switch (status) {
      case StatusAprovacao.Aprovada:
        return { label: 'Aprovada', class: 'label-primary' };
      case StatusAprovacao.Pendente:
        return { label: 'Pendente', class: 'label-warning' };
      case StatusAprovacao.Reprovada:
        return { label: 'Reprovada', class: 'label-danger' };
      default:
        return { label: '', class: '' };
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
    if (!this.foto && !this.fileList) {
      this.toasts.showMessage({
        message: 'Escolha uma foto para se candidatar!',
        title: 'Inválido!',
        type: ToastType.error
      });
      return;
    }
    let chamada: Observable<{}>;
    if (this.jaInscrito) {
      chamada = this.eleicoesApi.putInscricao(this.eleicao.id, this.inscricao);
    } else {
      chamada = this.eleicoesApi.postInscricao(this.eleicao.id, this.inscricao);
    }
    if (this.fileList) { // Alterou a foto
      chamada = chamada.pipe(
        switchMap((candidato: Inscricao) => {
          this.inscricao = candidato;
          return this.eleicoesApi.postFotoInscricao(this.eleicao.id, this.fileList);
        }), filterResponse());
    }

    chamada.subscribe((inscricao: Inscricao) => {
      this.foto = inscricao.foto;
      this.jaInscrito = true;
      if (this.jaInscrito) {
        this.toasts.showMessage({
          message: 'Inscrição atualizada com sucesso!',
          title: 'Sucesso!',
          type: ToastType.success
        });
      } else {
        this.toasts.showMessage({
          message: 'Inscrição realizada com sucesso!',
          title: 'Sucesso!',
          type: ToastType.success
        });
      }
      this.router.navigate(['/eleicoes']);
    });
  }

  exibirReprovacoes() {
    this.modalService.showModal(this.modalReprovacoes, 'Histórico de reprovações');
  }

}

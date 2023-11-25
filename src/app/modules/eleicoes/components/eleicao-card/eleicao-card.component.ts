import { Eleicao } from '@shared/models/eleicao';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { filter, finalize, tap, switchMap } from 'rxjs/operators';
import { StatusAprovacao } from '@shared/models/inscricao';
import { CodigoEtapaObrigatoria } from '@shared/models/cronograma';
import { AuthService } from 'src/app/core/services/auth.service';
import { Perfil } from '@shared/models/usuario';
import { Grupo } from '@shared/models/grupo';
import { ModalService } from 'src/app/core/services/modal.service';
import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { ToastType } from 'src/app/core/components/toasts/toasts.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-eleicao-card',
  templateUrl: './eleicao-card.component.html',
  styleUrls: ['./eleicao-card.component.css']
})
export class EleicaoCardComponent implements OnInit {

  @Input() eleicao: Eleicao;
  @Output() excluir = new EventEmitter<Eleicao>();

  @ViewChild('modalAlteracaoGrupo', { static: false }) modalAlteracaoGrupo: TemplateRef<any>;

  StatusAprovacao = StatusAprovacao;
  CodigoEtapaObrigatoria = CodigoEtapaObrigatoria;
  salvandoGrupo = false;

  constructor(
    private toast: ToastsService,
    private authService: AuthService,
    private modalService: ModalService,
    private eleicoesApi: EleicoesApiService
  ) { }

  ngOnInit() {
    if (this.eleicao && !this.eleicao.dataFinalizacao && this.eleicao.usuarioEleitor && this.eleicaoJaPassouDasInscricoes) {
      forkJoin({
        candidato: this.eleicoesApi.getInscricaoUsuario(this.eleicao.id),
        voto: this.eleicoesApi.getVotoUsuario(this.eleicao.id)
      }).subscribe(dados => {
        this.eleicao.candidato = dados.candidato;
        this.eleicao.voto = dados.voto;
      });
    }
  }

  get perfilComAcesso() {
    return this.authService.tokenValido &&
      (this.authService.authInfo.perfil === Perfil.SESMT || this.authService.authInfo.perfil === Perfil.Administrador);
  }

  excluirEleicao() {
    this.toast.confirmModal('Tem certeza que deseja excluir essa eleição? Essa ação não poderá ser desfeita', 'Confirmação')
      .pipe(filter(confirmacao => confirmacao)).subscribe(_ => this.excluir.emit(this.eleicao));
  }

  get labelStatusClass() {
    if (!this.eleicao || !this.eleicao.candidato) { return ''; }
    switch (this.eleicao.candidato.statusAprovacao) {
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

  alterarGrupo() {
    this.modalService.showModal(this.modalAlteracaoGrupo, 'Alterar Grupo da Eleição');
  }

  salvarGrupo(grupo: Grupo) {
    this.salvandoGrupo = true;
    this.eleicao.grupoId = grupo.id;
    this.eleicoesApi.put(this.eleicao.id, this.eleicao)
      .pipe(finalize(() => this.salvandoGrupo = false))
      .subscribe(_ => {
        this.eleicao.grupoId = grupo.id;
        this.eleicao.grupo = grupo.codigoGrupo;
        this.toast.showMessage({
          message: 'Grupo alterado com sucesso!',
          title: 'Sucesso',
          type: ToastType.success
        });
        this.modalService.closeModal();
      });
  }

  private get eleicaoJaPassouDasInscricoes() {
    return this.eleicao.inscricoesFinalizadas ||
      (this.eleicao.etapaAtual && this.eleicao.etapaAtual.etapaObrigatoriaId === CodigoEtapaObrigatoria.Inscricao);
  }

}

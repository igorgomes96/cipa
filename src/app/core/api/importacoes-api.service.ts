import { Injectable } from '@angular/core';
import { GenericApi } from './generic-api';
import { Importacao, ProgressoImportacao, FinalizacaoImportacaoStatus, StatusImportacao } from '@shared/models/importacao';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/environments/endpoints';
import { HttpClient } from '@angular/common/http';
import { SignalRService } from '../services/signalr.service';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { Inconsistencia } from '@shared/models/inconsistencias';
import { EleicoesApiService } from './eleicoes-api.service';
import { ToastsService } from '@core/services/toasts.service';
import { ToastType, ToastMessage } from '@core/components/toasts/toasts.component';

@Injectable({
  providedIn: 'root'
})
export class ImportacoesApiService extends GenericApi<Importacao>  {

  constructor(
    http: HttpClient,
    private signalRService: SignalRService,
    private authService: AuthService,
    private toast: ToastsService) {
    super(http, environment.api + endpoints.importacoes);
    this.signalRService.startConnection(environment.api + endpoints.signalr, this.authService.token);
  }

  progressoImportacao(): Observable<ProgressoImportacao> {
    return this.signalRService.on<ProgressoImportacao>('progressoimportacao').pipe(map(progress => {
      progress.progresso *= 100;
      return progress;
    }));
  }

  importacaoFinalizada(): Observable<FinalizacaoImportacaoStatus> {
    return this.signalRService.on<FinalizacaoImportacaoStatus>('importacaofinalizada')
      .pipe(tap(status => this.toast.showMessage(this.mensagemFinalizacaoImportacao(status))));
  }

  private mensagemFinalizacaoImportacao(status: FinalizacaoImportacaoStatus): ToastMessage {
    if (status.status === StatusImportacao.FinalizadoComSucesso) {
      return {
        title: 'Importação de funcionários finalizada com Sucesso!',
        message: 'Todos funcionário foram salvos em nosso banco de dados!',
        type: ToastType.success
      };
    } else {
      return {
        title: 'Importação de funcionários finalizada com Erros!',
        message: `Foram encontrados ${status.qtdaErros} erros no arquivo. Veja os detalhes na página de eleitores.`,
        type: ToastType.error
      };
    }
  }
}

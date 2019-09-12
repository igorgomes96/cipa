import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { ProgressoImportacao } from 'src/app/shared/models/importacao';
import { Observable, Subject } from 'rxjs';
import { IHttpConnectionOptions } from '@aspnet/signalr';
import { auditTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection: signalR.HubConnection;

  private _startConnection(url: string, token: string) {
    const options: IHttpConnectionOptions = {
      accessTokenFactory: () => {
        return token;
      }
    };
    Object.defineProperty(WebSocket, 'OPEN', { value: 1 });
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(url, options)
      .configureLogging(signalR.LogLevel.Error)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Conexão SignalR iniciada.'))
      .catch(err => console.log('Erro ao iniciar conexão SignalR: ' + err));
  }

  startConnection(url: string, token: string) {
    if (!this.hubConnection || this.hubConnection.state !== signalR.HubConnectionState.Connected) {
      this._startConnection(url, token);
    }
  }

  stopConnection() {
    if (this.hubConnection && this.hubConnection.state === signalR.HubConnectionState.Connected) {
      this.hubConnection.stop()
        .then(() => console.log('Conexão SignalR interrompida com sucesso.'))
        .catch(err => console.log('Erro ao interromper conexão SignalR: ' + err));
    }
  }

  on(event: string): Observable<ProgressoImportacao> {
    const subject = new Subject<ProgressoImportacao>();
    this.hubConnection.on(event, (data) => {
      subject.next(data);
    });
    return subject.asObservable()
      .pipe(auditTime(1000));

  }
}

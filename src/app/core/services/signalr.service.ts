import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { ProgressoImportacao } from 'src/app/shared/models/importacao';
import { Observable, Subject } from 'rxjs';
import { IHttpConnectionOptions } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection: signalR.HubConnection;

  startConnection(url: string, token: string) {
    const options: IHttpConnectionOptions = {
      accessTokenFactory: () => {
        return token;
      }
    };
    Object.defineProperty(WebSocket, 'OPEN', { value: 1, });
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(url, options)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Conexão SignalR iniciada.'))
      .catch(err => console.log('Erro ao iniciar conexão SignalR: ' + err));
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
    return subject.asObservable();
  }
}

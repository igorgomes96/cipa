import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { ProgressoImportacao } from '@shared/models/importacao';
import { Observable, Subject, Scheduler, SchedulerLike, asyncScheduler } from 'rxjs';
import { IHttpConnectionOptions } from '@aspnet/signalr';
import { auditTime, throttleTime, tap } from 'rxjs/operators';

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

  on<T>(event: string): Observable<T> {
    const subject = new Subject<any>();
    this.hubConnection.on(event, (data) => {
      subject.next(data);
    });

    return subject.asObservable();

  }
}

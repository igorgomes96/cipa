import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpRequest, HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { endpoints } from '@env/endpoints';
import { downloadArquivo } from '@shared/rxjs-operators';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArquivosApiService {

  constructor(private http: HttpClient) { }

  private url = environment.api + endpoints.arquivos;

  uploadFiles(url: string, files: FileList): Observable<HttpEvent<{}>> {
    const formData: FormData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append(`file${i}`, files[i]);
    }

    return this.http.post(url, formData, {
      observe: 'events',
      reportProgress: true
    });
  }

  downloadTemplateImportacao(arquivo: string) {
    return this.http.get(`${this.url}templateimportacao`, { responseType: 'arraybuffer' })
      .pipe(downloadArquivo('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', arquivo), take(1));
  }

  downloadNR5() {
    return this.http.get(`${this.url}nr5`, { responseType: 'arraybuffer' })
      .pipe(downloadArquivo('application/pdf', 'NR-5.pdf'), take(1));
  }

  download(id: string, arquivo: string, contentType: string) {
    return this.http.get(`${this.url}${id}/download`, { responseType: 'arraybuffer' })
      .pipe(downloadArquivo(contentType, arquivo), take(1));
  }

  delete(id: string) {
    return this.http.delete(`${this.url}${id}`).pipe(take(1));
  }

}

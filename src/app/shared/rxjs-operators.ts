import { pipe } from 'rxjs';
import { filter, map, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

export function filterResponse<T>() {
  return pipe(
    filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
    map((res: HttpResponse<T>) => res.body)
  );
}

export function uploadProgress<T>(cb: (progress: number) => void) {
  return tap((event: HttpEvent<T>) => {
    if (event.type === HttpEventType.UploadProgress) {
      cb(Math.round((event.loaded * 100) / event.total));
    }
  });
}

export function downloadArquivo(contentType: string, fileName: string) {
  return tap((res) => {
    const a = document.createElement('a');
    const binaryData = [];
    binaryData.push(res);
    a.href = window.URL.createObjectURL(new Blob(binaryData,
      {
        type: contentType
      }));
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(a.href);
    a.remove(); // remove the element
  });
}

export function inputPesquisa() {
  return pipe(
    debounceTime(300),
    map(value => (value as string).trim()),
    distinctUntilChanged());
}

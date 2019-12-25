import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ToastsService } from 'src/app/core/services/toasts.service';
import { Arquivo } from '@shared/models/arquivo';
import { ArquivosApiService } from 'src/app/core/api/arquivos-api.service';
import { ToastType } from 'src/app/core/components/toasts/toasts.component';

@Component({
  selector: 'app-arquivos',
  templateUrl: './arquivos.component.html',
  styleUrls: ['./arquivos.component.css']
})
export class ArquivosComponent implements OnInit {

  @Input() arquivos: Arquivo[];
  @Output() upload = new EventEmitter<FileList>();
  @Output() delete = new EventEmitter<number>();
  @Input() spinner = false;

  constructor(private service: ArquivosApiService, private toast: ToastsService) { }

  ngOnInit() {
  }

  download(arquivo: Arquivo) {
    this.service.download(arquivo.id, arquivo.nome, arquivo.contentType).subscribe();

  }

  deleteFile(id: string) {
    this.toast.confirmModal('Essa ação não poderá ser desfeita!', 'Confirma exlusão?')
      .subscribe((confirmacao: boolean) => {
        if (confirmacao) {
          this.service.delete(id).subscribe(_ => {
            this.delete.emit();
            this.toast.showMessage({
              message: 'Arquivo excluído com sucesso!',
              title: 'Sucesso!',
              type: ToastType.success
            });
          });
        }
      });
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.upload.emit(event.dataTransfer.files);
  }

  onInputChange(event: any) {
    this.upload.emit(event.target.files);
  }

  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }

}

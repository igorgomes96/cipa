import { Component, OnInit, Input } from '@angular/core';
import { Arquivo } from '@shared/models/arquivo';
import { ArquivosApiService } from 'src/app/core/api/arquivos-api.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  @Input() templates: Arquivo[];
  constructor(private arquivosApi: ArquivosApiService) { }

  ngOnInit() {
  }

  download(arquivo: Arquivo) {
    this.arquivosApi.download(arquivo.id, arquivo.nome, arquivo.contentType).subscribe();
  }

}

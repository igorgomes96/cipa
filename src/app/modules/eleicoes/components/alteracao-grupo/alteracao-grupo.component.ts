import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Grupo } from '@shared/models/grupo';
import { GruposApiService } from 'src/app/core/api/grupos-api.service';

@Component({
  selector: 'app-alteracao-grupo',
  templateUrl: './alteracao-grupo.component.html',
  styleUrls: ['./alteracao-grupo.component.css']
})
export class AlteracaoGrupoComponent implements OnInit {

  @Input() codigoGrupo: string;
  @Input() salvandoGrupo = false;
  @Output() selecionarGrupo = new EventEmitter<Grupo>();

  grupos: Grupo[];
  grupoId: number;
  constructor(private gruposApi: GruposApiService) { }

  ngOnInit() {
    this.gruposApi.getAll()
      .subscribe((grupos: Grupo[]) => {
        this.grupos = grupos;
        if (this.codigoGrupo) {
          this.grupoId = this.grupos.find(g => g.codigoGrupo === this.codigoGrupo).id;
        }
      });
  }

  salvar() {
    this.selecionarGrupo.emit(this.grupos.find(g => g.id === +this.grupoId));
  }
}

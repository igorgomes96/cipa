import { Eleicao } from 'src/app/shared/models/eleicao';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { Perfil } from 'src/app/shared/models/usuario';

@Component({
  selector: 'app-eleicao-card',
  templateUrl: './eleicao-card.component.html',
  styleUrls: ['./eleicao-card.component.css']
})
export class EleicaoCardComponent implements OnInit {

  @Input() eleicao: Eleicao;
  @Input() perfilSESMT = false;
  @Output() excluir = new EventEmitter<Eleicao>();


  constructor(
    private toast: ToastsService
  ) { }

  ngOnInit() {
  }

  excluirEleicao() {
    this.toast.confirm('Tem certeza que deseja excluir essa eleição? Essa ação não poderá ser desfeita', 'Confirmação')
    .pipe(filter(confirmacao => confirmacao)).subscribe(_ => this.excluir.emit(this.eleicao));
  }
}

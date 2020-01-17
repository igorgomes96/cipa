import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EtapaCronograma, PosicaoEtapa, CodigoEtapaObrigatoria } from '@shared/models/cronograma';
import { Arquivo } from '@shared/models/arquivo';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Dimensionamento } from '@shared/models/dimensionamento';
import { EleicoesApiService } from '@core/api/eleicoes-api.service';
import { switchMap, finalize } from 'rxjs/operators';

declare var $: any;

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[etapa-cronograma]',
  templateUrl: './etapa-cronograma.component.html',
  styleUrls: ['./etapa-cronograma.component.css']
})
export class EtapaCronogramaComponent implements OnInit {

  @Input() etapa: EtapaCronograma;
  @Input() layout = 'Visualização';
  @Input() carregandoProximaEtapa = false;
  @Input() dimensionamento: Dimensionamento;
  @Input() codigoGrupo: string;
  @Output() proximaEtapa: EventEmitter<EtapaCronograma> = new EventEmitter<EtapaCronograma>();
  @Output() exibirTemplates: EventEmitter<EtapaCronograma> = new EventEmitter<EtapaCronograma>();
  @Output() atualizarEtapa: EventEmitter<EtapaCronograma> = new EventEmitter<EtapaCronograma>();
  @Output() edicaoCancelada: EventEmitter<void> = new EventEmitter<void>();
  @Output() atualizarDimensionamento = new EventEmitter<void>();

  PosicaoEtapa = PosicaoEtapa;
  carregandoArquivos = false;
  arquivos: Arquivo[] = [];
  form: FormGroup;
  CodigoEtapaObrigatoria = CodigoEtapaObrigatoria;
  ultimaAtualizacao: Date;
  editando = false;

  constructor(
    private formBuilder: FormBuilder,
    private eleicoesApi: EleicoesApiService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      data: [{ value: this.etapa.dataRealizada || this.etapa.dataPrevista, disabled: this.isDateDisabled }]
    });
    this.form.get('data').valueChanges.subscribe((v) => {
      this.etapa.dataPrevista = v;
      this.onAtualizarEtapa();
    });
    this.eleicoesApi.getArquivos(this.etapa.eleicaoId, this.etapa.id)
      .subscribe((arquivos: Arquivo[]) => {
        this.arquivos = arquivos;
      });
    this.ultimaAtualizacao = new Date();
  }

  get isDateDisabled() {
    return this.layout === 'Visualização' && this.etapa.posicaoEtapa !== PosicaoEtapa.Futura;
  }

  get calendarStyle(): { icon: string, class: string } {
    if (this.layout === 'Cadastro') {
      return { icon: 'fa-calendar', class: 'blue-bg' };
    }

    switch (this.etapa.posicaoEtapa) {
      case PosicaoEtapa.Atual:
        if (this.etapa.erroMudancaEtapa) {
          return { icon: 'fa-calendar-times-o', class: 'bg-danger' };
        }
        return { icon: 'fa-calendar', class: 'blue-bg' };
      case PosicaoEtapa.Passada:
        return { icon: 'fa-calendar-check-o', class: 'navy-bg' };
      case PosicaoEtapa.Futura:
        return { icon: 'fa-calendar-o', class: 'bg-muted' };
      default:
        return { icon: '', class: '' };
    }
  }

  get tamanhoDescricao(): string {
    if (this.layout === 'Cadastro' || this.etapa.posicaoEtapa === PosicaoEtapa.Futura) {
      return 'col-md-12';
    } else {
      return 'col-lg-8 col-md-6';
    }
  }

  get diasAtrasos(): number {
    let date1 = new Date(this.etapa.dataPrevista);
    date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    let date2 = new Date();
    date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

    // To calculate the time difference of two dates
    const diffTime = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    return diffTime / (1000 * 3600 * 24);
  }

  onCancelarEdicao() {
    this.edicaoCancelada.emit();
    this.editando = false;
  }


  upload(files: FileList) {
    this.carregandoArquivos = true;
    this.eleicoesApi.uploadArquivos(this.etapa.eleicaoId, this.etapa.id, files)
      .pipe(
        switchMap(_ => this.eleicoesApi.getArquivos(this.etapa.eleicaoId, this.etapa.id)),
        finalize(() => this.carregandoArquivos = false)
      ).subscribe((arquivos: Arquivo[]) => {
        this.arquivos = arquivos;
      });
  }

  deleteArquivo() {
    this.eleicoesApi.getArquivos(this.etapa.eleicaoId, this.etapa.id)
      .subscribe((arquivos: Arquivo[]) => {
        this.arquivos = arquivos;
      });
  }

  onProximaEtapa() {
    this.proximaEtapa.emit(this.etapa);
  }

  onExibirTemplates() {
    this.exibirTemplates.emit(this.etapa);
  }

  onAtualizarEtapa() {
    this.atualizarEtapa.emit(this.etapa);
  }

  onAtualizarDimensionamento() {
    this.atualizarDimensionamento.emit();
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EtapaCronograma, PosicaoEtapa, CodigoEtapaObrigatoria } from 'src/app/shared/models/cronograma';
import { Arquivo } from 'src/app/shared/models/arquivo';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CronogramaApiService } from 'src/app/core/api/cronograma-api.service';
import { finalize, switchMap } from 'rxjs/operators';
import { Dimensionamento } from '../../models/dimensionamento';

declare var $: any;

@Component({
  selector: '[etapa-cronograma]',
  templateUrl: './etapa-cronograma.component.html',
  styleUrls: ['./etapa-cronograma.component.css']
})
export class EtapaCronogramaComponent implements OnInit {

  @Input() etapa: EtapaCronograma;
  @Input() layout = 'Visualização';
  @Input() carregandoProximaEtapa = false;
  @Input() dimensionamento: Dimensionamento;
  @Output() proximaEtapa: EventEmitter<EtapaCronograma> = new EventEmitter<EtapaCronograma>();
  @Output() exibirTemplates: EventEmitter<EtapaCronograma> = new EventEmitter<EtapaCronograma>();
  @Output() atualizarEtapa: EventEmitter<EtapaCronograma> = new EventEmitter<EtapaCronograma>();

  PosicaoEtapa = PosicaoEtapa;
  carregandoArquivos = false;
  arquivos: Arquivo[] = [];
  form: FormGroup;
  CodigoEtapaObrigatoria = CodigoEtapaObrigatoria;
  ultimaAtualizacao: Date;
  editando = false;

  constructor(
    private formBuilder: FormBuilder,
    private cronogramaApi: CronogramaApiService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      data: [{ value: this.etapa.dataRealizada || this.etapa.dataPrevista, disabled: this.isDateDisabled }]
    });
    this.form.get('data').valueChanges.subscribe((v) => {
      this.etapa.dataPrevista = v;
      this.onAtualizarEtapa();
    });
    this.cronogramaApi.getArquivos(this.etapa.id)
      .subscribe((arquivos: Arquivo[]) => {
        this.arquivos = arquivos;
      });
    this.ultimaAtualizacao = new Date();
  }

  get isDateDisabled() {
    return this.layout === 'Visualização' && this.etapa.posicaoEtapa !== PosicaoEtapa.Futura;
  }

  get calendarIcon(): string {
    if (this.layout === 'Cadastro') {
      return 'fa-calendar';
    }

    switch (this.etapa.posicaoEtapa) {
      case PosicaoEtapa.Atual:
        if (this.etapa.erroMudancaEtapa) {
          return 'fa-calendar-times-o';
        }
        return 'fa-calendar';
      case PosicaoEtapa.Passada:
        return 'fa-calendar-check-o';
      case PosicaoEtapa.Futura:
        return 'fa-calendar-o';
      default:
        return '';
    }
  }

  get calendarClass(): string {

    if (this.layout === 'Cadastro') {
      return 'blue-bg';
    }

    switch (this.etapa.posicaoEtapa) {
      case PosicaoEtapa.Atual:
        if (this.etapa.erroMudancaEtapa) {
          return 'bg-danger';
        }
        return 'blue-bg';
      case PosicaoEtapa.Passada:
        return 'navy-bg';
      case PosicaoEtapa.Futura:
        return 'bg-muted';
      default:
        return '';
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


  upload(files: FileList) {
    this.carregandoArquivos = true;
    this.cronogramaApi.uploadArquivos(this.etapa.id, files)
      .pipe(
        switchMap(_ => this.cronogramaApi.getArquivos(this.etapa.id)),
        finalize(() => this.carregandoArquivos = false)
      ).subscribe((arquivos: Arquivo[]) => {
        this.arquivos = arquivos;
      });
  }

  deleteArquivo() {
    this.cronogramaApi.getArquivos(this.etapa.id)
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

}

import { Arquivo } from './arquivo';

export enum StatusImportacao {
    Aguardando = 'Pendente',
    Processando = 'Em processamento',
    FinalizadoComSucesso = 'Processado',
    FinalizadoComFalha = 'Falha'
}

export class ProgressoImportacao {
    totalLinhas: number;
    linhasProcessadas: number;
    totalEtapas: number;
    etapaAtual: number;
    progresso: number;
}

export class FinalizacaoImportacaoStatus {
  status: StatusImportacao;
  qtdaErros: number;
}

export class Importacao {
    id: number;
    horario: Date;
    status: StatusImportacao;
    arquivo: Arquivo;
    progresso: ProgressoImportacao;
}

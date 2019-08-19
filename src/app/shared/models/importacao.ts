import { Arquivo } from './arquivo';

export enum StatusImportacao {
    Aguardando = 'Pendente',
    Processando = 'Em processamento',
    FinalizadoComSucesso = 'Processado',
    FinalizadoComFalha = 'Falha'
}

export class ProgressoImportacao {
    etapa: string;
    etapaAtual: number;
    totalEtapas: number;
    progresso: number;
}

export class Importacao {
    id: number;
    horario: Date;
    status: StatusImportacao;
    arquivo: Arquivo;
    progresso: ProgressoImportacao;
}

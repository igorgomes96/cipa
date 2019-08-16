import { Arquivo } from './arquivo';

export enum StatusImportacao {
    Aguardando = 'Aguardando',
    Processando = 'Processando',
    FinalizadoComSucesso = 'FinalizadoComSucesso',
    FinalizadoComFalha = 'FinalizadoComFalha'
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
}

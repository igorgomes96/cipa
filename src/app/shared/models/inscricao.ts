import { Eleitor } from './eleitor';

export enum StatusAprovacao {
    Pendente = 'Pendente',
    Aprovada = 'Aprovada',
    Reprovada = 'Reprovada'
}

export class Reprovacao {
    id: number;
    inscricaoId: number;
    motivoReprovacao: string;
    horario: Date;
    emailAprovador: string;
    nomeAprovador: string;
}

export class Inscricao {
    id: number;
    statusAprovacao: StatusAprovacao;
    eleitorId: number;
    objetivos: string;
    // votos: number;
    emailAprovador: string;
    nomeAprovador: string;
    horarioAprovacao: Date;
    horarioInscricao: Date;
    foto: string;

    eleitor: Eleitor;
    reprovacoes: Reprovacao[];
}

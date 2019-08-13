import { Eleitor } from './eleitor';

export enum StatusAprovacao {
    Pendente = 'Pendente',
    Aprovada = 'Aprovada',
    Reprovada = 'Reprovada'
}

export class Reprovacao {
    id: number;
    candidatoId: number;
    motivoReprovacao: string;
    horario: Date;
    usuarioNome: string;
    usuarioEmail: string;
}

export class Candidato {
    id: number;
    votos: number;
    statusAprovacao: StatusAprovacao;
    objetivos: string;
    eleitorId: number;

    eleitor: Eleitor;
    reprovacoes: Reprovacao[];
}

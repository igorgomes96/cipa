import { Eleitor } from './eleitor';

export enum StatusAprovacao {
    Pendente,
    Aprovada,
    Reprovada
}

export class Reprovacao {
    id: number;
    candidatoId: number;
    motivoReprovacao: string;
    horario: Date;
}

export class Candidato {
    id: number;
    votos: number;
    statusAprovacao: StatusAprovacao;
    objetivos: string;

    eleitor: Eleitor;
    reprovacoes: Reprovacao[];
}

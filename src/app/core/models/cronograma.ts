import { Arquivo } from './arquivo';

export enum PosicaoEtapa {
    Passada,
    Atual,
    Futura
}

export class EtapaCronograma {
    id: number;
    eleicaoId: number;
    etapaId: number;
    nomeEtapa: string;
    descricaoEtapa: string;
    dataPrevista: Date;
    dataRealizada: Date;
    etapaObrigatoriaId: number;
    posicaoEtapa: PosicaoEtapa;
    templates: Arquivo[];

    etapaObrigatoria: EtapaObrigatoria;
}

export class EtapaObrigatoria {
    id: number;
    nome: string;
    descricao: string;
    ordem: number;
}

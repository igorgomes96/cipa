import { Arquivo } from './arquivo';

export enum PosicaoEtapa {
    Passada = 'Passada',
    Atual = 'Atual',
    Futura = 'Futura'
}

export enum CodigoEtapaObrigatoria {
    Convocacao = 1,
    FormacaoComissao = 2,
    EditalInscricao = 3,
    Inscricao = 4,
    Votacao = 5,
    Apuracao = 6,
    Ata = 7
}

export class EtapaCronograma {
    id: number;
    eleicaoId: number;
    nomeEtapa: string;
    descricaoEtapa: string;
    dataPrevista: Date;
    dataRealizada: Date;
    etapaObrigatoriaId: number;
    posicaoEtapa: PosicaoEtapa;
    templates: Arquivo[];
    possuiTemplates: boolean;
    etapaObrigatoria: EtapaObrigatoria;
    ordem: number;
    erroMudancaEtapa: string;
}

export class EtapaObrigatoria {
    id: number;
    nome: string;
    descricao: string;
    duracaoMinima: number;
    ordem: number;
}
